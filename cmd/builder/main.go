// Copyright (c) HashiCorp, Inc.
// SPDX-License-Identifier: MPL-2.0

package main

import (
	"os"

	"github.com/mitchellh/cli"
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
