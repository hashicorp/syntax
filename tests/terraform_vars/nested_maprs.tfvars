# SYNTAX TEST "source.terraform" "GH-675 tfvars nested maps"

somedata = {
  name1 = {
# ^^^^^ meta.mapping.key.terraform string.unquoted.terraform
    database_name = "db1"
  }
  name2 = {
# ^^^^^ meta.mapping.key.terraform string.unquoted.terraform
    database_name = "db2"
  }
  name3 = {
# ^^^^^ meta.mapping.key.terraform string.unquoted.terraform
    database_name = "db3"
  }
}
