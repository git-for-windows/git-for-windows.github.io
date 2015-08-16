## What is the relationship between *Git for Windows* and *msysGit*?

*Git for Windows* used to be developed using the development environment called "msysGit", but roughly coinciding with Git 2.1, msysGit was superseded by a new development environment: the [Git for Windows SDK](https://github.com/git-for-windows/build-extra/releases).


## Some native console programs don't work when run from Git Bash. How to fix it?

*Git for Windows* defaults to using [mintty](https://code.google.com/p/mintty/) terminal. Compared to default Windows console host, it provides normal multi-line cut&paste, working resizing, defaults to unicode font and avoids some bugs in the default console host. However it does not present itself as console to native applications (those *not* built with MSys or Cygwin), so in these applications:

 * Non-ascii output may be corrupted due to mismatch in character sets (MSys and Cygwin use utf-8 while Windows will fall back to the legacy dos codepages in this case).
 * Interactive and full-screen applications won't work at all.

There are several methods for working around these problems:

 * Run programs that have problems using the [`winpty`](https://github.com/rprichard/winpty) utility. This allows you to keep using the nicer mintty terminal, but can become unwieldy if you need the workaround for many programs.
 * Modify the shortcut for Git Bash to run `bash` directly without `mintty` so it uses the default console host and configure it for "Quick Edit", reasonable size and scroll-back and suitable unicode font. You'll still have to live with the other quirks of console host.
 * Install and use [ConEmu](http://conemu.github.io/).

## I get errors trying to check out files with long path names.
Windows file paths are by default limited to 255 characters. Some repositories may have committed files which contain paths longer than the limit. By default, *Git for Windows* does not support long paths, and will print errors when trying to perform any operation on a long file name. Set the configuration property `core.longpaths` to true to allow certain Git operations to properly handle these files. See [this wiki page](https://github.com/git-for-windows/git/wiki/Git-cannot-create-a-file-or-directory-with-a-long-path) for more information.