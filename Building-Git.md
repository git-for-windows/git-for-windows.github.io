We build Git for Windows using [MSys2](https://msys2.github.io/).

As we are in the process of switching away from msysGit as our development environment, the following instructions are a little rough on the edges. This situation should become better over the next months.

# Installing a build environment

1. Install MSys2 from https://msys2.github.io/, into `C:/msys32` and `C:/msys64` (if you only want to build for one architecture, you can skip the other one). This will install three Shells into the Start Menu: the *MSys*, the *MinGW 32* and the *MinGW 64* Shell. To build Git, you should start the *MinGW* shell corresponding to the architecture of the installed MSys2.

2. Add the Git for Windows-specific Pacman repository: insert the following lines into your `/etc/pacman.conf`, **before** the `[mingw]` line (it is important :
> [git-for-windows]
> Server = https://git-for-windows.github.io/pacman-repository/$arch
> SigLevel = Optional

3. Update via Pacman: `pacman -Syu` (as the msys2-runtime gets updated, the *MSys Shell* needs to be restarted afterwards).

# Build Git

1. Install (MSys2) Git: `pacman -S git`. That Git is based on MSys2, i.e. it is *not* a MinGW Git. However, we need a working Git to check out the Git source, eh? :grinning: 

2. Clone Git: `cd /usr/src/ && git clone https://github.com/git-for-windows/git`.

3. Install the Toolchain (gcc etc): `pacman -S mingw-w64-<arch>-toolchain`, where `<arch>` is either `i686` or `x86_64`.

4. Install Git's dependencies: `pacman -S python less openssh patch make tar ca-certificates perl-Error perl perl-Authen-SASL perl-libwww perl-MIME-tools perl-Net-SMTP-SSL perl-TermReadKey winpty-git mingw-w64-<arch>-curl mingw-w64-<arch>-expat mingw-w64-<arch>-openssl mingw-w64-<arch>-tcl mingw-w64-<arch>-pcre`

5. Temporarily: In /usr/src/git/, check out the `update-to-2.3.0` branch: `git remote add -f dscho https://github.com/dscho/git && git checkout -t dscho/update-to-2.3.0`.

6. Build Git. Some dependencies might be missing, still, e.g. subversion, gettext, man, mingw-w64-<arch>-gdb, binutils or texinfo (these packages were installed manually before the first successful Git for Windows build).

***

_Note_: if you encounter messages like `39 [main] make 7628 child_info_fork::abort:...` while running make, follow the following MSYS2 [Issue](http://sourceforge.net/p/msys2/tickets/74/) post, in short: close all MSys2 windows and run the `autorebase.bat` script in the top-level MSys2 directory from a `cmd`.

# Build the `msys2-⁠runtime`

1. Install the MSys2 Toolchain: `pacman -⁠S gcc binutils make`.

2. Clone the MSYS2-packages repository: `cd /usr/src && git clone https://github.com/git-for-windows/MSYS2-packages`.

3. Temporarily: In MSYS2-packages, check out the `msys-runtime` branch: `git remote add -f dscho https://github.com/dscho/MSYS2-packages && git checkout -t dscho/msys-runtime`.

4. Build the package: `makepkg -⁠s`.

(You might need to call `pacman -S ca-certificates` to reinstall that package, it seems that it was not installed properly at least in one MSys2 32-bit setup.)