# Copyright (c) HashiCorp, Inc.

byte_match_statement_rules = local.enabled && var.byte_match_statement_rules != null ? {
  for rule in flatten(var.byte_match_statement_rules) :
    format("%s-%s",
      lookup(rule, "name", null) != null ? rule.name : format("%s-byte-match-%d", module.this.id, rule.priority),
      rule.action,
    ) => rule
  } : {}