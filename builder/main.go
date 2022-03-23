package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

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

func (c *BuildCommand) Run(args []string) int {
	wd, err := os.Getwd()
	if err != nil {
		return 1
	}

	// The _main.yml file is where all rules in the Patterns and the Repository are defined
	// Each product file provides specific overrides for rules defined in _main.yml
	// Here we build a main Viper instance to store the config we will merge in product specific maps to
	mainFile := filepath.Join(wd, "../src/_main.yml")
	fmt.Printf("Pulling in main template: %s\n", mainFile)
	mainViper := viper.New()
	mainViper.SetConfigFile(mainFile)
	if err := mainViper.ReadInConfig(); err == nil {
		fmt.Printf("Merging config file: %v\n", mainViper.ConfigFileUsed())
	} else {
		fmt.Printf("Error reading config: %v\n", err)
		return 1
	}

	// For each product defined, read the yml and merge into the main Viper instance
	products := []string{"hcl", "terraform"}
	for _, product := range products {
		fmt.Printf("Evaluating %s\n", product)
		productFile := filepath.Join(wd, fmt.Sprintf("../src/%s.yml", product))
		fmt.Printf("Processing: %s\n", productFile)

		// Create a product Viper instance that reads each product yml for rules
		productV := viper.New()
		productV.SetConfigFile(productFile)
		if err := productV.ReadInConfig(); err == nil {
			fmt.Printf("Merging config file: %v\n", productV.ConfigFileUsed())
		} else {
			fmt.Printf("Error reading config: %v\n", err)
			continue
		}

		// merge the product Viper map into the main Viper instance
		// This overrides anything already loaded so each product can replace existing
		// rules and/or provide new ones
		if err := mainViper.MergeConfigMap(productV.AllSettings()); err != nil {
			fmt.Printf("Unable to merge user configuration values: %s", err.Error())
			continue
		}

		// Export the merged map to a struct so we can write to file
		fmt.Printf("Building %s\n", product)
		var config TextMateGrammar
		err := mainViper.Unmarshal(&config)
		if err != nil {
			fmt.Printf("Unable to merge user configuration values: %s", err.Error())
			continue
		}

		// Write the struct to JSON. We can modify this to include writing to other formats in the future
		productGrammarFile := filepath.Join(wd, fmt.Sprintf("../syntaxes/%s.tmGrammar.json", product))
		writeJSON(config, productGrammarFile)
	}

	return 0
}

func writeJSON(data TextMateGrammar, file string) {
	fmt.Printf("Writing %s\n", file)

	// We don't use json.MarshalIndent here because that escapes special characters automatically
	// without allowing you to change the behavior. So, we make our own encoder and disable
	// encoding and indent on our own.
	buffer := &bytes.Buffer{}
	encoder := json.NewEncoder(buffer)
	encoder.SetEscapeHTML(false)
	err := encoder.Encode(data)
	if err != nil {
		fmt.Printf("Marshal: %v", err)
	}

	var out bytes.Buffer
	json.Indent(&out, buffer.Bytes(), "", "  ")

	productjson, _ := filepath.Abs(file)
	err = ioutil.WriteFile(productjson, out.Bytes(), 0644)
	if err != nil {
		log.Fatal(err)
	}
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
