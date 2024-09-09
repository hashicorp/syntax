# Copyright (c) HashiCorp, Inc.

# line comment

// line comment

/*
  Block comment
*/

io_mode = "async"

service "http" "web_proxy" {
  listen_addr = "127.0.0.1:8080"

  process "main" {
    command = ["/usr/local/bin/awesome-app", "server"]
  }

  process "mgmt" {
    command = ["/usr/local/bin/awesome-app", "mgmt"]
  }
}

sum = 1 + addend

message = "Hello, ${name}!"

shouty_message = upper(message)
