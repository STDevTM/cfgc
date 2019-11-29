# CFGC - Changelog from git commits

## Overview

This VSTS/TFS marketplace task generates changelog from commit messages. This task was built inspired by [changelog_from_git_commits](https://docs.fastlane.tools/actions/changelog_from_git_commits/) action of [Fastlane](https://fastlane.tools/) tools.

![cfgc options](images/options.png)

## Options

The task has 2 options to generate changelog:

* **Since last tag** - Generate changelog from git commit messages since last tag in git log,
* **Between Revisions** - Specify range of revisions from where changelog will be generated
  * **From revision** - Tag name or revision hash of start commit.
  * **To revision** - Tag name or revision hash of last commit.

![beetwen option](images/between-option.png)

## Customization

* **Pretty** - The format applied to each commit while generating the collected value.
* **Date format** - The date format applied to each commit while generating the collected value.
* **Include Merges** - Whether or not to include any commits that are merges.

## Learn more

The [source](https://github.com/stdevteam/cfgc) for this extension is on GitHub. Take, fork, and extend.

## Release Notes

Please refer to our [release page on Github](https://github.com/stdevteam/cfgc/releases)