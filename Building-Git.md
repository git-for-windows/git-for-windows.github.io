We build Git for Windows using an [MSys2](https://msys2.github.io/) based *Git for Windows SDK*. This SDK can be installed via a [net-installer](https://github.com/git-for-windows/build-extra/releases)

# Installing a build environment

1. Just install the [net-installer](https://github.com/git-for-windows/build-extra/releases).

# Build Git

1. An initial `git clone` and `make` should have already occurred when installing the [net-installer](https://github.com/git-for-windows/build-extra/releases).

2. Open the *Git for Windows SDK* by double clicking either `mingw32_shell.bat` or `mingw64_shell.bat`.

2. `cd /usr/src/git`.

4. Build Git: `make`.

5. Run the test suite: `make test`