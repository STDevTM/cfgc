# CFGC - Changelog from git commits

## Overview

This VSTS/TFS marketplace task generates changelog from commit messages. This task was built inspired form [changelog_from_git_commits](https://docs.fastlane.tools/actions/changelog_from_git_commits/) action of [Fastlane](https://fastlane.tools/) tools.

![cfgc options](./images/options.png)

## Options

The task has 2 options to generate changelog:

* **Since last tag** - Generate changelog from git commit messages since last tag in git log,
* **Between Revisions** - Specify range of revisions from where changelog will be generated
  * **From revision** - Tag name or revision hash of start commit.
  * **To revision** - Tag name or revision hash of last commit.

![beetwen option](./images/between-option.png)

## Customization

* **Pretty** - The format applied to each commit while generating the collected value.
* **Date format** - The date format applied to each commit while generating the collected value.
* **Include Merges** - Whether or not to include any commits that are merges.

## Author

Tigran Hambardzumyan, tigran@stdevmail.com

## Support

Feel free to [open issuses](https://github.com/stdevteam/cfgc/issues/new) with any suggestions, bug reports, feature requests, questions.

## Let us know!

We’d be really happy if you sent us links to your projects where you use our component. Just send an email to developer@stdevmail.com and do let us know if you have any questions or suggestion.

## License

RxRestClient is available under the MIT license. See the [LICENSE](./LICENSE) file for more info.