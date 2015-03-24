We build Git for Windows using an [MSys2](https://msys2.github.io/) based *Git for Windows SDK*. This SDK can be installed via a [net-installer](https://github.com/git-for-windows/build-extra/releases)

# Installing a build environment

1. Just install the [net-installer](https://github.com/git-for-windows/build-extra/releases).

# Build Git

1. An initial `git clone` and `make` should have already occurred when installing the [net-installer](https://github.com/git-for-windows/build-extra/releases).

2. Open the *Git for Windows SDK* *MinGW* shell by double clicking either the Shortcut on the desktop `Git SDK 32-bit.lnk` or by double clicking `mingw32_shell.bat` in the install folder. That is `Git SDK 64-bit.lnk` and `mingw64_shell.bat` for the `64bit` [net-installer](https://github.com/git-for-windows/build-extra/releases).

2. Change directory to the initial clone: `cd /usr/src/git`.

4. (Optional) build Git: `make`.

5. Run the test suite: `make test`