We build Git for Windows using an [MSys2](https://msys2.github.io/) based *Git for Windows SDK*. This SDK can be installed via a [net-installer](https://git-for-windows.github.io/#download-sdk)

# Installing a build environment

1. Just install the [net-installer](https://git-for-windows.github.io/#download-sdk).

# Build Git

1. An initial `git clone` and `make` should have already occurred when installing the [net-installer](https://git-for-windows.github.io/#download-sdk).

2. Open the *Git for Windows SDK* *MinGW* shell by double clicking either the Shortcut on the desktop `Git SDK 32-bit.lnk` or by double clicking `mingw32_shell.bat` in the install folder. That is `Git SDK 64-bit.lnk` and `mingw64_shell.bat` for the `64bit` [net-installer](https://git-for-windows.github.io/#download-sdk).

2. Change directory to the initial clone: `cd /usr/src/git`.

4. (Optional) build Git: `make`.

5. Run the test suite: `make test`. If you are a fan of statistics, you can use the following `prove` invocation to run the testsuite. But first we have to change to the test directory with the command `cd t`. After that you can issue `/usr/bin/time prove -j 15 --state=failed,save ./t[0-9]*.sh`. If *15* threads are too many for your system, you can provide the number of threads via the `-j <num>` (j for jobs) parameter.