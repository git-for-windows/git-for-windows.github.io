We build Git for Windows using [MSys2](https://msys2.github.io/).

As we are in the process of switching away from msysGit as our development environment, the following instructions are a little rough on the edges. This situation should become better over the next months.

# Installing a build environment

1. Install MSys2 from https://msys2.github.io/, into `C:/msys32` and `C:/msys64` (if you only want to build for one architecture, you can skip the other one). This will install three Shells into the Start Menu: the *MSys*, the *MinGW 32* and the *MinGW 64* Shell. To build Git, you should start the *MinGW* shell corresponding to the architecture of the installed MSys2.

2. Download [setup-git-sdk.bat](https://raw.githubusercontent.com/git-for-windows/build-extra/master/setup-git-sdk.bat) and put it in the the top-level MSys2 directory. Then run the `setup-git-sdk.bat` in a `cmd` window (you need to close all MSys2 windows before that, so that the `msys-2.0.dll` file can be updated). The `setup-git-sdk.bat` updates the `msys2-runtime` and will install the git build dependencies via `pacman`.

# Build Git

1. Open your corresponding *MinGW* Shell

2. Clone Git: `cd /usr/src/ && git clone https://github.com/git-for-windows/git`.

4. Build Git: `make`.

5. Run the test suite: `make test`

***

_Note_: if you encounter messages like `39 [main] make 7628 child_info_fork::abort:...` while running make, follow the following MSYS2 [Issue](http://sourceforge.net/p/msys2/tickets/74/) post, in short: close all MSys2 windows and run the `autorebase.bat` script in the top-level MSys2 directory from a `cmd`.

# Build the `msys2-⁠runtime`

1. Install the MSys2 Toolchain: `pacman -⁠S gcc binutils make`.

2. Clone the MSYS2-packages repository: `cd /usr/src && git clone https://github.com/git-for-windows/MSYS2-packages`.

3. Temporarily: In MSYS2-packages, check out the `msys-runtime` branch: `git remote add -f dscho https://github.com/dscho/MSYS2-packages && git checkout -t dscho/msys-runtime`.

4. Build the package: `makepkg -⁠s`.

(You might need to call `pacman -S ca-certificates` to reinstall that package, it seems that it was not installed properly at least in one MSys2 32-bit setup.)