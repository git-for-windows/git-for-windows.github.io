# **Please note that this scenario is not officially supported by Git for Windows**

(The reason this is unsupported is that there are no volunteers to support that scenario.)

**This guide assumes that you want the 64-bit version of Git for Windows.**

Git for Windows being based on MSYS2, it's possible to install the `mingw-w64-git` package into an existing MSYS2 installation. That means that if you are already using MSYS2 on your computer, you can use Git for Windows without running the full installer or using the portable version.

Note however that there are some caveats for going this way. Git for Windows created some patches for `msys2-runtime` that have not been sent upstream. (This had been planned, but it was determined in issue [#284](/git-for-windows/git/issues/284) that it would probably not be happening.) This means that you have to install Git for Windows customized `msys2-runtime` to have a fully working `git` inside MSYS2.

Here the steps to take:

 1. Open an MSYS2 terminal with `msys2_shell.cmd`.
 2. Edit `/etc/pacman.conf` and just before `[mingw32]` (line #71 on my machine), add the `git-for-windows` packages repository:
        
        [git-for-windows]
        Server = https://wingit.blob.core.windows.net/x86-64 

and optionally also the MINGW-only repository for the *opposite* architecture (i.e. MINGW32 for 64-bit SDK):

        [git-for-windows-mingw32]
        Server = https://wingit.blob.core.windows.net/i686

If you are comfortable with command line and the `sed` command, the step 2 can be done with the following `sed` command (make sure to do proper backup before trying it):

        sed -i '/^\[mingw32\]/{ s|^|[git-for-windows]\nServer = https://wingit.blob.core.windows.net/x86-64\n\n|; }' /etc/pacman.conf

 3. Authorize signing key with:

        curl -L https://raw.githubusercontent.com/git-for-windows/build-extra/HEAD/git-for-windows-keyring/git-for-windows.gpg |
        pacman-key --add - &&
        pacman-key --lsign-key 3B6D86A1BA7701CD0F23AED888138B9E1A9F3986

 4. Then synchronize new repository with

        pacman -Syu

 5. This updates `msys2-runtime` and therefore will ask you to close the window (*not* just exit the pacman process). Don't panic, simply close all currently open MSYS2 shells and MSYS2 programs. Double-check Task Manager and kill `pacman.exe` it's still running after the window is closed, because it can linger. Once all are closed, start a new terminal again.

 6. Then synchronize *again* (updating the non-core part of the packages):

        pacman -Su

 7. And finally install the Git/cURL packages:

        pacman -S mingw-w64-x86_64-{git,git-doc-html,git-doc-man,curl} git-extra

 8. Finally, check that everything went well by doing `git --version` in a MINGW64 shell and it should output something like `git version 2.14.1.windows.1` (or newer).
