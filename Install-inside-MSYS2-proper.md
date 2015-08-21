Git for Windows being based on `MSYS2`, it's possible to install the `git` package into an existing `MSYS2` installation. That means that if you are already using `MSYS2` on your computer, you can use Git for Windows without running the full installer or using the portable version.

Note however that there is some caveats for going this way. Git for Windows created some patches for `msys2-runtime` that have not yet been sent upstream (this is planned, checkout out issue [#284](https://github.com/git-for-windows/git/issues/284) for current status). This means that you have to install Git for Windows customized `msys2-runtime` to have a fully working `git` inside `MSYS2`.

Here the steps to take:

 1. Open an `MSYS2` terminal.
 2. Edit `/etc/pacman.conf` and just before `[mingw32]` (line #71 on my machine), add the `git-for-windows` packages repository (Using `SigLevel = Optional TrustedOnly` because packages are not signed right now):
        
        [git-for-windows]
        SigLevel = Optional TrustedOnly
        Server = https://dl.bintray.com/git-for-windows/pacman/$arch 

 3. Then synchronize new repository
      
        pacman -Sy

 4. And finally install correct packages

        pacman -S git-for-windows/msys2-runtime git-for-windows/mingw-w64-x86_64-git git-for-windows/mingw-w64-x86_64-git-doc-html git-for-windows/mingw-w64-x86_64-git-doc-man

 5. Since you have updated `msys2-runtime`, you might get strange error messages right after finishing installation like an infinite stream of heap memory related messages. Don't panic, simply close all currently open shells and and program relying on `MSYS2` runtime. Once all close, start a new terminal again. 

 6. Finally, checkout that everything went well by doing `git --version` and it should output something like `git version 2.5.0.windows.1`