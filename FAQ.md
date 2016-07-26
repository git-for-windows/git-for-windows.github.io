## Should I upgrade to a newer Git for Windows version?

In general, yes: it is a good idea to stay up-to-date.

If you have a version older than 2.7.4, it is *highly* advisable to upgrade. These versions fixed critical bugs, therefore sticking with older Git for Windows versions makes you vulnerable: 2.7.4, 2.7.0, 2.6.1, 2.5.2, 1.9.5-preview20150319, and 1.9.5-preview20141217.

## What is the relationship between *Git for Windows* and *msysGit*?

*Git for Windows* used to be developed using the development environment called "msysGit", but roughly coinciding with Git 2.1, msysGit was superseded by a new development environment: the [Git for Windows SDK](https://github.com/git-for-windows/build-extra/releases).

## How do I update *Git for Windows* upon new releases?

This depends on how you installed *Git for Windows*. The bundle installation requires you to download and install the new version. Any customizations you made will be kept as long as you did so in the appropriate configuration folders.

For advanced users working with the *Git for Windows* SDK `pacman` is available as a package manager. See [Package management](Package-management)

## How do I check the release hash and release notes

For hashes see https://github.com/git-for-windows/git/releases

For (G4W) release notes see the [build-extra repo](https://github.com/git-for-windows/build-extra/blob/master/ReleaseNotes.md) or the top level of your installation (e.g. C:\Program Files\Git\ReleaseNotes.html).


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

## How do I access a repository hosted on a Microsoft Team Foundation Server inside a Windows domain?

The Microsoft Team Foundation Server is capable of hosting git repositories. If the server is a member of a windows domain, and your user account is in that domain, you can use domain authentication to identify yourself to the server, and can thus access git repositories without having to enter any credentials. For this to work, the server has to be configured to use domain authentication, _not_ NTLM authentication. The repository URL can be obtained from the TFS web interface, it may look like http://server.example.com:8080/tfs/TWA/TeamDev/_git/reponame.

In order to instruct git to use domain authentication, prefix the server name with `:@`, like so: `http://:@server.example.com:8080/tfs/TWA/TeamDev/_git/reponame`. This is a special case of the usual `username:password@server` syntax, where both the `username` and `password` fields are empty. This causes git to look up and use your domain credentials.

## I get "Permission denied (publickey)." when using git pull

Some DSA keys are not considered secure anymore by OpenSSH 7. Adding "PubkeyAcceptedKeyTypes ssh-dss" to ~/.ssh/config helps.

## Switch locale for git-bash launcher (of Git for Windows SDK)

Some developers want to start git-bash (of Git for Windows SDK) with a different language.
To achive this in windows following command could be placed inside the launcher:
C:\Windows\System32\cmd.exe /c "set LANG=en_GB && start C:\git-sdk-64\git-bash.exe && exit"
Replace "en_GB" with your preferred locale. 



