# Copyright (c) HashiCorp, Inc.

// generic blocks with multiple labels as strings
block0 {}
block0-newline {
}

block1 "foo" {}
block1-newline "foo" {
}

block2 "foo" "bar" {}
block2-newline "foo" "bar" {
}

block3 "foo" "bar" "baz" {}
block3-newline "foo" "bar" "baz" {
}

block4 "foo" "bar" "baz" "lorum" {}
block4-newline "foo" "bar" "baz" "lorum" {
}

block5 "foo" "bar" "baz" "lorum" "ipsum" {}
block5-newline "foo" "bar" "baz" "lorum" "ipsum" {
}

// generic blocks with indentifier labels
blocklabel1 foo bar lorum-ipsum {}
blocklabel1-newline foo bar lorum-ipsum {
}

blocklabelmixed "foo" bar "loru" m-ipsum {}
blocklabelmixed-newline "foo" bar "loru" m-ipsum {
}

// utf8 labels
blockutf8 "foož:/ᚠᚢ" {}
blockutf8-newline "foož:/ᚠᚢ" {
}

// edgecases
blockempty "" {}
blockempty-newline "" {
}

block-single-char-indentifier a {}
block-single-char-indentifier-newline a {
}

byte_match_statement_rules = local.enabled && var.byte_match_statement_rules != null ? {
}

path "secrets/data/users/{{identity.entity.name}}/*" {
  capabilities = ["create", "update", "patch", "read", "delete", "list"]
}

path "secrets/data/users/*" {
  capabilities = ["create", "update", "patch", "read", "delete", "list"]
}