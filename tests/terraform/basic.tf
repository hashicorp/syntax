# SYNTAX TEST "source.terraform" "A small but typical result"

terraform {
# ^^^^^^^^^ source.terraform meta.block.terraform
#         ^ punctuation.section.block.begin.terraform
  required_providers {
# ^^^^^^^^^^^^^^^^^^ entity.name.label.terraform
#                    ^ punctuation.section.block.begin.terraform
    azurerm = {
#   ^^^^^^^ variable.declaration.terraform variable.other.readwrite.terraform
#             ^ meta.braces.terraform punctuation.section.braces.begin.terraform
      source  = "hashicorp/azurerm"
#     ^^^^^^ meta.braces.terraform meta.mapping.key.terraform string.unquoted.terraform
#             ^ keyword.operator.terraform
#                ^^^^^^^^^^^^^^^^^ string.quoted.double.terraform
      version = "~> 2.65"
#     ^^^^^^^ meta.braces.terraform meta.mapping.key.terraform string.unquoted.terraform
#             ^ keyword.operator.terraform
#                ^^^^^^^ string.quoted.double.terraform
    }
  }

  required_version = ">= 1.1.0"
# ^^^^^^^^^^^^^^^^ variable.declaration.terraform variable.other.readwrite.terraform
#                  ^ keyword.operator.assignment.terraform
#                     ^^^^^^^^ string.quoted.double.terraform
}
# <- punctuation.section.block.end.terraform

provider "azurerm" {
# ^^^^^^^^ source.terraform meta.block.terraform
#         ^^^^^^^ string.quoted.double.terraform
#                  ^ punctuation.section.block.begin.terraform
  features {}
# ^^^^^^^^ entity.name.label.terraform
}
# <- punctuation.section.block.end.terraform

resource "azurerm_resource_group" "rg" {
# ^^^^^^^^ source.terraform meta.block.terraform
#        ^ punctuation.definition.string.begin.terraform
#         ^^^^^^^^^^^^^^^^^^^^^^ string.quoted.double.terraform
#                               ^ punctuation.definition.string.end.terraform
#                                 ^ punctuation.definition.string.begin.terraform
#                                  ^^ string.quoted.double.terraform
#                                    ^ punctuation.definition.string.end.terraform
#                                      ^ punctuation.section.block.begin.terraform
  name     = "myTFResourceGroup"
# ^^^^ variable.declaration.terraform variable.other.readwrite.terraform
#          ^ keyword.operator.assignment.terraform
#             ^^^^^^^^^^^^^^^^^ string.quoted.double.terraform
  location = "westus2"
# ^^^^ variable.declaration.terraform variable.other.readwrite.terraform
#          ^ keyword.operator.assignment.terraform
#             ^^^^^^^^^^^^^^^^^ string.quoted.double.terraform
}
# <- punctuation.section.block.end.terraform
