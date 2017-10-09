**This guide assumes that you want the 64-bit version of Git for Windows. To install the 32-bit version, replace the `x86_64` infix by `i686` in every command included in this document.**

Git for Windows being based on `MSYS2`, it's possible to install the `git` package into an existing `MSYS2` installation. That means that if you are already using `MSYS2` on your computer, you can use Git for Windows without running the full installer or using the portable version.

Note however that there are some caveats for going this way. Git for Windows created some patches for `msys2-runtime` that have not yet been sent upstream (this is planned, checkout out issue [#284](https://github.com/git-for-windows/git/issues/284) for current status). This means that you have to install Git for Windows customized `msys2-runtime` to have a fully working `git` inside `MSYS2`.

Here the steps to take:

 1. Open an `MSYS2` terminal.
 2. Edit `/etc/pacman.conf` and just before `[mingw32]` (line #71 on my machine), add the `git-for-windows` packages repository:
        
        [git-for-windows]
        Server = https://dl.bintray.com/git-for-windows/pacman/$arch 

and optionally also the MINGW-only repository for the *opposite* architecture (i.e. MINGW32 for 64-bit SDK, MINGW64 for 32-bit SDK):

        [git-for-windows-mingw32]
        Server = https://dl.bintray.com/git-for-windows/pacman/i686

or

        [git-for-windows-mingw64]
        Server = https://dl.bintray.com/git-for-windows/pacman/x86_64

 3. Authorize signing key (this step may have to be repeated occasionally until https://github.com/msys2/msys2/issues/62 is fixed)

        curl -L https://raw.githubusercontent.com/git-for-windows/build-extra/master/git-for-windows-keyring/git-for-windows.gpg |
        pacman-key --add - &&
        pacman-key --lsign-key 1A9F3986

 4. Then synchronize new repository

        pacboy update

 5. This implicitly updates `msys2-runtime` and therefore will ask you to close the window (*not* just exit the pacman process). Don't panic, simply close all currently open shells and and program relying on `MSYS2` runtime. Once all close, start a new terminal again.

 6. Then synchronize *again* (updating the non-core part of the packages):

        pacboy update

 7. And finally install the Git/cURL packages:

        pacboy sync git:x git-doc-html:x git-doc-man:x git-extra: curl:x

 8. Finally, check that everything went well by doing `git --version` and it should output something like `git version 2.14.1.windows.1` (or newer).
