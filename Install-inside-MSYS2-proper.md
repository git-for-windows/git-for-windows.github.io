# **Please note that this scenario is not officially supported by Git for Windows**

Git for Windows being based on MSYS2, it's possible to install the `mingw-w64-git` package into an existing MSYS2 installation.  That means that if you are already using MSYS2 on your computer, you can use Git for Windows without running the full installer or using the portable version.  There are some caveats for going this way, details below.

This guide assumes you are comfortable using the command line and you are willing to completely re-install your MSYS2 if something goes wrong.  You can contact @Elieux for advice in the `git-for-windows/git` Gitter room or through the contact channels for MSYS2.  Please don't file issues with Git for Windows installed this way until you verify them in an official Git for Windows distribution.


#### The steps

Here are the steps to install the 64-bit version of Git for Windows to be run in an MSYS2 terminal (`msys2_shell.cmd`):

 1. Edit `/etc/pacman.conf` and add the Git for Windows package repositories above any others (i.e. just before `[mingw32]` on line #71 as of this writing):

        [git-for-windows]
        Server = https://wingit.blob.core.windows.net/x86-64

        [git-for-windows-mingw32]
        Server = https://wingit.blob.core.windows.net/i686

    (The above is correct.  The second, MINGW-only repository is for the other architecture.)

    This step can be done with the following `sed` command (make sure to do proper backup before trying it):

        sed -i '/^\[mingw32\]/{ s|^|[git-for-windows]\nServer = https://wingit.blob.core.windows.net/x86-64\n\n[git-for-windows-mingw32]\nServer = https://wingit.blob.core.windows.net/i686\n\n|; }' /etc/pacman.conf

 2. Authorize the signing key with:

        curl -L https://raw.githubusercontent.com/git-for-windows/build-extra/HEAD/git-for-windows-keyring/git-for-windows.gpg |
        pacman-key --add - &&
        pacman-key --lsign-key 3B6D86A1BA7701CD0F23AED888138B9E1A9F3986

 3. Then synchronize with new repositories with

        pacman -Syyuu

    This installs a new `msys2-runtime` and therefore will ask you to terminate all MSYS2 processes.  Save what you need from other open MSYS2 shells and programs, exit them and confirm the Pacman prompt. 
 Double-check Task Manager and kill `pacman.exe` if it's still running after the window is closed.  Start a new MSYS2 terminal.

 4. Then synchronize *again* (updating the non-core part of the packages):

        pacman -Suu

 5. And finally install the packages containing Git, its documentation and some environment modifications[2]:

        pacman -S mingw-w64-x86_64-{git,git-doc-html,git-doc-man} git-extra

Now you can close the current shell and open a MINGW64 shell (`msys2_shell.cmd -mingw64`) to check that everything went well.  Run `git --version` and it should output something like `git version 2.31.0.windows.1` (or newer).


#### Troubleshooting

If you encounter error "*error: wrong number of arguments, should be from 1 to 2*" with `git add -p`, set `add.interactive.useBuiltin` to `true` in Git's configuration.


#### Notes

Git for Windows carries an `msys2-runtime` different from upstream MSYS2, see issue [#284](/git-for-windows/git/issues/284) for more details.  It's possible to keep the stock MSYS2 runtime by reordering the repositories in `/etc/pacman.conf`.  The steps above do install the custom version to ensure you have a fully working Git.  In either case it's possible to run into issues, although not common.

It might happen that some packages are downgraded compared to upstream MSYS2.  This is unfortunate but if you want the authentic Git for Windows experience, it's necessary.
