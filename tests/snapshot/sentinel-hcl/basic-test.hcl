mock "tfplan/v2" {
  module {
    source = "../../testdata/mock-tfplan-success.sentinel"
  }
}

mock "time" {
  data = {
    now = {
      hour = 9
      minute = 42
    }
  }
}

test {
  rules = {
    main = true
  }
}
