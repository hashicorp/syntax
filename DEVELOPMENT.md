# Development

We are an open source project on GitHub and would enjoy your contributions! Please [open a new issue](https://github.com/hashicorp/syntax/issues) before working on a PR that requires significant effort. This will allow us to make sure the work is in line with the project's goals.

### Requirements

- Node >= 16.13.2
- npm >= 8.x
- Go >= 1.17

### Getting the code

```bash
git clone https://github.com/hashicorp/syntax
```

### Dependencies

After cloning the repo, run `npm install` to install dependencies.

```bash
npm install
```

## Writing TextMate Grammar

The following workflow is recommended to work on any of the HashiCorp TextMate grammars in this repo:

1. Add or modify grammar in the `src/_main.yml` or product specific YAML file in like `src/terraform.yml`.
1. Change directory to `builder` and run `go run main.go build`
1. Add a new test case file or modify existing test case files inside the `tests/snapshot/<lang>` directory. Make sure to put the new file in the correct folder or it will not be tested.
1. Run `npm run test:snap:<lang>` until the tests pass.

> Tip: Running `npm run test:snap:update` after modifying the tmGrammar file will give you a quick visual representation of how the tokens are being resolved. This can aid in crafting unit tests.

## Tests

Automated `unit` tests can be written using [vscode-tmgrammar-test](https://github.com/PanAeon/vscode-tmgrammar-test) and live inside `./tests`.

To start the test suite from the command-line run:

```bash
npm test
```

## Writing Grammar Snapshot Tests

Snapshot tests comprise of two files: example files and their companion `snap` file:

```bash
tests/snapshot/terraform/blocks.tf
tests/snapshot/terraform/blocks.tf.snap
```

These files are grouped by HashiCorp product inside folders named for the product they target.

Snapshot test example files are HashiCorp product files without any `vscode-tmgrammar-test` token lines. Each example file is exactly how you would see it used in production. This ensures scope, inheritance, and resolution of tokens happen exactly as they would on a user's machine.

The companion `snap` file is named the same as the example file with the `.snap` extension, and is the tmGrammar represenation of all resolved tokens. This file is commited alongside the example file. If anything changes with regards to how the tokens are resolved, the snapshot test will fail.

> Note: If modifying an existing snapshot test, run `npm run test:snap:update` to update the snapshot file. This will update the snapshot file with the new modified grammar. Be sure to do this after you've tested using `npm run test:snap` and are sure that the modified grammar is correct, otherwise you may get false positives.

For example:

```bash
#tests/snapshot/terraform/blocks.tf
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
  timeouts {
    create = "60m"
    delete = "2h"
  }
}

#tests/snapshot/terraform/blocks.tf.snap
>resource "aws_instance" "web" {
#^^^^^^^^ source.hcl.terraform meta.block.hcl entity.name.type.terraform
#        ^ source.hcl.terraform meta.block.hcl
#         ^^^^^^^^^^^^^^ source.hcl.terraform meta.block.hcl variable.other.enummember.hcl
#                       ^ source.hcl.terraform meta.block.hcl
#                        ^^^^^ source.hcl.terraform meta.block.hcl variable.other.enummember.hcl
#                             ^ source.hcl.terraform meta.block.hcl
#                              ^ source.hcl.terraform meta.block.hcl punctuation.section.block.begin.hcl
>  ami           = "ami-a1b2c3d4"
```
