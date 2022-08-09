// Copyright (c) HashiCorp, Inc.
// SPDX-License-Identifier: MPL-2.0

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	"github.com/hashicorp/go-multierror"
	"github.com/mitchellh/cli"
	"github.com/spf13/viper"
)

func main() {
	c := &cli.CLI{
		Name:       "builder",
		Version:    "",
		Args:       os.Args[1:],
		HelpWriter: os.Stdout,
	}

	ui := &cli.ColoredUi{
		ErrorColor: cli.UiColorRed,
		WarnColor:  cli.UiColorYellow,
		Ui: &cli.BasicUi{
			Writer:      os.Stdout,
			Reader:      os.Stdin,
			ErrorWriter: os.Stderr,
		},
	}

	c.Commands = map[string]cli.CommandFactory{
		"build": func() (cli.Command, error) {
			return &BuildCommand{
				Ui: ui,
			}, nil
		},
	}

	exitStatus, err := c.Run()
	if err != nil {
		ui.Error("Error: " + err.Error())
	}

	os.Exit(exitStatus)
}

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

func (c *BuildCommand) newViper(filepath string) (*viper.Viper, error) {
	v := viper.New()
	v.SetConfigFile(filepath)
	err := v.ReadInConfig()
	return v, err
}

func (c *BuildCommand) Run(args []string) int {
	// This currently uses the cwd to find all the files used here
	// This can be improved in the future to accept User input or use some kind of
	// convention for where things are located
	wd, err := os.Getwd()
	if err != nil {
		return 1
	}

	// The _main.yml file is where all rules in the Patterns and the Repository are defined
	// Each product file provides specific overrides for rules defined in _main.yml
	mainFile := filepath.Join(wd, "../src/_main.yml")

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
			result = multierror.Append(result, err)
			return 1
		}

		productFile := filepath.Join(wd, fmt.Sprintf("../src/%s.yml", product))
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
		productGrammarFile := filepath.Join(wd, fmt.Sprintf("../syntaxes/%s.tmGrammar.json", product))
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

func writeJSON(data TextMateGrammar, file string) error {
	// We don't use json.MarshalIndent here because that escapes special characters automatically
	// without allowing you to change the behavior. So, we make our own encoder and disable
	// encoding and indent on our own.
	buffer := &bytes.Buffer{}
	encoder := json.NewEncoder(buffer)
	encoder.SetEscapeHTML(false)
	err := encoder.Encode(data)
	if err != nil {
		return err
	}

	var out bytes.Buffer
	err = json.Indent(&out, buffer.Bytes(), "", "  ")
	if err != nil {
		return err
	}

	err = ioutil.WriteFile(file, out.Bytes(), 0644)
	if err != nil {
		return err
	}

	return nil
}

// As defined in https://macromates.com/manual/en/language_grammars
type TextMateGrammar struct {
	ScopeName  string          `json:"scopeName"`
	Name       string          `json:"name"`
	UUID       string          `json:"uuid"`
	FileTypes  []string        `json:"fileTypes"`
	Patterns   []Rule          `json:"patterns"`
	Repository map[string]Rule `json:"repository"`
}

type Rule struct {
	Include       string             `json:"include,omitempty"`
	Name          string             `json:"name,omitempty"`
	Match         string             `json:"match,omitempty"`
	Begin         string             `json:"begin,omitempty"`
	End           string             `json:"end,omitempty"`
	ContentName   string             `json:"contentName,omitempty"`
	Comment       string             `json:"comment,omitempty"`
	Captures      map[string]Capture `json:"captures,omitempty"`
	BeginCaptures map[string]Capture `json:"beginCaptures,omitempty"`
	EndCaptures   map[string]Capture `json:"endCaptures,omitempty"`
	Patterns      []Rule             `json:"patterns,omitempty"`
}

type Capture struct {
	Name     string           `json:"name,omitempty"`
	Patterns []CapturePattern `json:"patterns,omitempty"`
}

type CapturePattern struct {
	Match   string `json:"match,omitempty"`
	Comment string `json:"comment,omitempty"`
	Name    string `json:"name,omitempty"`
	Include string `json:"include,omitempty"`
}
