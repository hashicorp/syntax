package main

import (
	"bytes"
	"encoding/json"
	"os"
)

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

	err = os.WriteFile(file, out.Bytes(), 0644)
	if err != nil {
		return err
	}

	return nil
}
