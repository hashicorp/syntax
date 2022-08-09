module "something" {
  source = "./modules/something.sentinel"
}

policy "policy1" {
  source = "./policies/policy1/policy1.sentinel"
  enforcement_level = "hard-mandatory"
}

policy "policy2" {
  source = "./policies/policy2/policy2.sentinel"
}

global "time" {
  value = {
    now = {
      day = 31
    }
  }
}

param "foo" {
  value = "bar"
}
