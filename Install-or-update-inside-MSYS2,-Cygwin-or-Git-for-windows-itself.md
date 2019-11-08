## It's different from [Install inside MSYS2 proper](https://github.com/git-for-windows/git/wiki/Install-inside-MSYS2-proper)

Instead of configuring and installing `Git-for-windows` using `Pacman`, this guide introduces another approach to properly install or update `git-for-windows` inside `MSYS2`, `Cygwin` or even `Git-for-windows` itself. The only thing you need is a `bash` interpreter on windows and a `curl`.

## How to

With the script `getgit` introduced by [git-for-windows/build-extra#261](https://github.com/git-for-windows/build-extra/pull/261), you can download and run the script or just run `curl https://raw.githubusercontent.com/git-for-windows/build-extra/gitupdate/git-extra/getgit | bash`.

The script would gather information about the current system ( *Msys / Cygwin* ), bitness, version of an already existed git-for-windows, version of the latest released git-for-windows... and then forge a proper download URL targeting a proper version of the `PortableGit` installer.
With all the information prepared, the script would download the installer and unpack it to `/tmp`. After that, all the necessary files will be copied to a proper place inside the ( *Msys's / Cygwin's* ) file system without touching any existing **non-git-for-windows-exclusive** files.

Additionally, the `getgit` script will produce two scripts `ctxmenu.bat` and `rm-ctxmenu.bat` which could add and remove `Git GUI Here` and `Git Bash Here` context menu items. But note that, these two context menu items although seem alike with the ones of `Git-for-windows`, they are actually **different**! They just provided similar outcomes and functionality yet still not the same things.

## Known issue
* On Cygwin, the final `Git Bash Here` won't have a nice prompt that has the current branch of a git repo folder shown. To fix this, you need to remove the `PS1=...` line in the `/etc/bash.bashrc`.
* If some `Permission denied` errors raised, please run your `bash` as Administrator to make sure this script runs with write privilege granted. And if something similar happens against `ctxmenu.bat` script or `rm-ctxmenu.bat`, run it as **Administrator** as well.
