// Copyright IBM Corp. 2020, 2025
// SPDX-License-Identifier: MPL-2.0

package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/hashicorp/go-multierror"
	"github.com/mitchellh/cli"
	"github.com/spf13/viper"
)

type BuildCommand struct {
	Ui cli.Ui
}

func (c *BuildCommand) Help() string {
	helpText := `Usage: syntax build

` + c.Synopsis()
	return strings.TrimSpace(helpText)
}

func (c *BuildCommand) Synopsis() string {
	return "Builds syntax files"
}

func (c *BuildCommand) Run(args []string) int {
	// This currently uses the cwd to find all the files used here
	// This can be improved in the future to accept User input or use some kind of
	// convention for where things are located
	wd, err := os.Getwd()
	if err != nil {
		return 1
	}

	syntaxSourcePath := filepath.Join(wd, "src")
	syntaxDeployPath := filepath.Join(wd, "syntaxes")

	// The _main.yml file is where all rules in the Patterns and the Repository are defined
	// Each product file provides specific overrides for rules defined in _main.yml
	mainFile := filepath.Join(syntaxSourcePath, "_main.yml")

	var result *multierror.Error
	// For each product defined, read the yml and merge into the main Viper instance
	products := []string{"hcl", "terraform"}
	for _, product := range products {
		c.Ui.Info(fmt.Sprintf("Evaluating %s", product))

		// Here we build a main Viper instance to store the config we will merge in product specific maps.
		// Note that the main viper configuration needs to be re-read for each product and errors here
		// are terminal
		mainViper, err := c.newViper(mainFile)
		if err != nil {
			c.Ui.Error(fmt.Sprintf("Error reading %v: %v", mainViper.ConfigFileUsed(), err.Error()))
			return 1
		}

		productFile := filepath.Join(syntaxSourcePath, fmt.Sprintf("%s.yml", product))
		c.Ui.Info(fmt.Sprintf("Processing: %s", productFile))

		// Create a product Viper instance that reads each product yml for rules
		productV, err := c.newViper(productFile)
		if err != nil {
			c.Ui.Error(fmt.Sprintf("Error reading %v: %v", productV.ConfigFileUsed(), err.Error()))
			result = multierror.Append(result, err)
			continue
		}

		c.Ui.Info(fmt.Sprintf("Merging config file: %v", productV.ConfigFileUsed()))
		if err := mainViper.MergeConfigMap(productV.AllSettings()); err != nil {
			c.Ui.Error(fmt.Sprintf("Unable to merge values from %v: %v", productV.ConfigFileUsed(), err.Error()))
			result = multierror.Append(result, err)
			continue
		}

		// Export the merged map to a struct so we can write to file
		c.Ui.Info(fmt.Sprintf("Building %s", product))
		var config TextMateGrammar
		err = mainViper.Unmarshal(&config)
		if err != nil {
			c.Ui.Error(fmt.Sprintf("Unable to merge values from %s: %s", productV.ConfigFileUsed(), err.Error()))
			result = multierror.Append(result, err)
			continue
		}

		// Write the struct to JSON. We can modify this to include writing to other formats in the future
		productGrammarFile := filepath.Join(syntaxDeployPath, fmt.Sprintf("%s.tmGrammar.json", product))
		c.Ui.Info(fmt.Sprintf("Writing %s", productGrammarFile))
		err = writeJSON(config, productGrammarFile)
		if err != nil {
			c.Ui.Error(fmt.Sprintf("Error writing grammar file: %v", err))
			result = multierror.Append(result, err)
		}
	}

	if result.ErrorOrNil() != nil {
		return 1
	} else {
		return 0
	}
}

func (c *BuildCommand) newViper(filepath string) (*viper.Viper, error) {
	v := viper.New()
	v.SetConfigFile(filepath)
	err := v.ReadInConfig()
	return v, err
}
