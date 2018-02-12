As the installer is made by putting together files from the Git SDK, it is advisable to update those files first. To update the packages, call `pacman -Syu` ([caveats apply](https://github.com/git-for-windows/git/wiki/Package-management#updating-msys2-runtime-pacman-and-bash)).

If you want to test Git changes or make an installer from your own Git fork, you need to call 

```bash
cd /usr/src/git
make install
``` 
for documentation changes:

```bash
make install-html
```

and *afterwards* 

```bash
prefix=/mingw64 make -C contrib/subtree install-html
```

>without this second `make` you get an error message about a missing `git-subtree.html` file).

To make an installer, install the [SDK](https://gitforwindows.org/#download-sdk) and run it

>Git for Windows SDK MinGW shell can be run by double-clicking either the Shortcut on the desktop Git SDK 32-bit.lnk or by double-clicking mingw32_shell.bat in the install folder. That is Git SDK 64-bit.lnk and mingw64_shell.bat for the 64bit SDK installer.

then issue the following commands:

```bash
cd /usr/src/build-extra
git pull master
./installer/release.sh <version>-test
```

where `<version>` is the Git version (please note that the `<version>` cannot contain dots after the numerical version: `2.7.2-hello-world` is okay while `2.7.2.hello.world` is not okay).
