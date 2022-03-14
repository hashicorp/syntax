# Release

This project produces GitHub Releases as the versioned artifacts for use in products like the Terraform VS Code Extension.

For example, you can download the v0.2.3 Terraform Syntax release by using `
https://github.com/hashicorp/syntax/releases/download/v0.2.3/terraform.tmGrammar.json`

## Publish Release

## Increment Version

1. Ensure that CHANGELOG.MD has all changes since last release. Add if any are missing.
1. Increment `version` in package.json
1. Commit changes
1. Open PR
1. Team reviews and merges PR

## Create Release

The Release GitHub Action will package the release for public consumption.

To trigger a release, create a tag and push to the hashicorp/syntax repo:

1. On the `main` branch create a new tag by running the following with the correct version:

```
  git tag -a v0.1.0 -m "v0.1.0"
```

2. Then push the tag to the repo to trigger the automation:

```
  git push --tags
```
