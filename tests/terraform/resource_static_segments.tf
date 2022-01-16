# SYNTAX TEST "source.terraform" "GH-683 highlight static segments"

resource "aws_docdb_cluster" "aws_docdb_cluster" {
# ^^^^^^^^ source.terraform meta.block.terraform
#         ^^^^^^^^^^^^^^^^^ string.quoted.double.terraform
#                             ^^^^^^^^^^^^^^^^^ string.quoted.double.terraform
#                                                ^ punctuation.section.block.begin.terraform
  tags                      = var.tags
# ^^^^ variable.declaration.terraform variable.other.readwrite.terraform
#                           ^ keyword.operator.assignment.terraform
#                             ^^^ support.constant.terraform
#                                 ^^^ variable.other.member.terraform
  final_snapshot_identifier = "${var.docdb_cluster_cluster_identifier}-final-snapshot"
# ^^^^^^^^^^^^^^^^^^^^^^^^^ variable.declaration.terraform variable.other.readwrite.terraform
#                           ^ keyword.operator.assignment.terraform
#                               ^ keyword.other.interpolation.begin.terraform
#                                ^^^ support.constant.terraform
#                                   ^ keyword.operator.accessor.terraform
#                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ variable.other.member.terraform
#                                                                    ^ keyword.other.interpolation.end.terraform
#                                                                     ^^^^^^^^^^^^^^^ string.quoted.double.terraform
  storage_encrypted         = true
# ^^^^^^^^^^^^^^^^^ variable.declaration.terraform variable.other.readwrite.terraform
#                           ^ keyword.operator.assignment.terraform
#                             ^^^^ constant.language.terraform
}
# <- punctuation.section.block.end.terraform
