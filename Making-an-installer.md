As the installer is made by putting together files from the Git SDK, it is advisable to update those files first. To update the packages, call `pacman -Syu` ([caveats apply](https://github.com/git-for-windows/git/wiki/Package-management#updating-msys2-runtime-pacman-and-bash)). If you want to test Git changes or make an installer from your own Git fork, you need to call `cd /usr/src/git && make install` (for documentation changes, `make install-html`).

To make an installer, install the [SDK](https://git-for-windows.github.io/#download-sdk), run it and then issue the following commands:

```bash
cd /usr/src/build-extra
git fetch
git checkout master
./installer/release.sh <version>-test
```

where `<version>` is the Git version.