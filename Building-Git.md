We build Git for Windows using an [MSys2](https://msys2.github.io/) based *Git for Windows SDK*. This SDK can be installed via a [net-installer](https://github.com/git-for-windows/build-extra/releases)

# Installing a build environment

1. Just install the [net-installer](https://github.com/git-for-windows/build-extra/releases).

# Build Git

1. An initial `git clone` and `make` should have already occurred when installing the [net-installer](https://github.com/git-for-windows/build-extra/releases).

2. Open the *Git for Windows SDK* by double clicking either `mingw32_shell.bat` or `mingw64_shell.bat`.

2. `cd /usr/src/git`.

4. Build Git: `make`.

5. Run the test suite: `make test`

# Build the `msys2-⁠runtime`

1. Start the *MSys* (`msys2_shell.bat`) shell (i.e. not the *MinGW 32-bit* nor the *MinGW 64-bit* one).

2. Install the MSys2 Toolchain: `pacman -⁠S gcc binutils make`.

3. Clone the MSYS2-packages repository: `cd /usr/src && git clone https://github.com/git-for-windows/MSYS2-packages`.

4. Build the package: `makepkg -⁠s`.

(You might need to call `pacman -S ca-certificates` to reinstall that package, it seems that it was not installed properly at least in one MSys2 32-bit setup.)