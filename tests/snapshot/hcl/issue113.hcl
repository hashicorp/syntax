# Copyright (c) HashiCorp, Inc.

dynamic "text_transformation" {
  for_each = lookup(rule.value.statement, "text_transformation", null) != null ? [
    for rule in lookup(rule.value.statement, "text_transformation") : {
      priority = rule.priority
      type     = rule.type
  }] : []

  content {
    priority = text_transformation.value.priority
    type     = text_transformation.value.type
  }
}

locals {
  byte_match_statement_rules = local.enabled && var.byte_match_statement_rules != null ? {
    for rule in flatten(var.byte_match_statement_rules) :
    format("%s-%s",
      lookup(rule, "name", null) != null ? rule.name : format("%s-byte-match-%d", module.this.id, rule.priority),
      rule.action,
    ) => rule
  } : {}
}



