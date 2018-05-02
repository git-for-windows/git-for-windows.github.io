The process to build installer is made easy via the `Git for Windows SDK`. The steps are basically:

1. Download and install the SDK, which installs the sources for `git`, additional msys and mingw packages and helpers to build the installer and provides the `Git for Windows SDK` MSys shell
2. [optional] Hack in the changes you want and make these changes available to the installer.
3. Call the right helper tools to build the package you want.

# Installing the SDK

Download the [SDK](https://gitforwindows.org/#download-sdk) and run it (using "Run as Administrator"). You will end up with a console window running the `Git for Windows SDK` shell, which you can use for the next steps. Git is already checked out and the latest version build and installed, so if you just want to build an installer from latest master, you are ready to go. 

You can open the `Git for Windows SDK` shell by double clicking `git-bash.exe` in the install folder.

As the installer is made by putting together files from the Git for Windows SDK, it is advisable to update those files first. To update the packages, call `pacman -Syu` ([caveats apply](https://github.com/git-for-windows/git/wiki/Package-management#updating-msys2-runtime-pacman-and-bash)).

# Hacking on git

If you only want an installer of the latest version of git (master), then you can skip this step.

The sources of git are checked out in `/usr/src/git`. [Hack in (and test)](Building-Git) the changes you want...

Afterwards you need to install git to make these changes available to the installer build: `cd /usr/src/git && make install`. 

If you made any documentation changes, you need to install the documentation too: `make install-html && prefix=/mingw64 make -C contrib/subtree install-html` (the second make invocation installs the `git-subtree.html` which is otherwise missing and leads to an error by the portable installer).

In some cases the change you want to make is not in git itself but in the additional files needed to emulate the *ix environment git expects (things like `grep`, `find`, `cat`,...) or in additional helper files (e.g. `start-ssh-agent.cmd`). These files come from [Msys](https://github.com/git-for-windows/MSYS2-packages) and [Mingw](https://github.com/git-for-windows/MINGW-packages) packages. Please see the documentation how to make [changes to these packages](Package-management#technical-details). Some files are also in the `build-extras` repo in the subdir [`git-extra`](https://github.com/git-for-windows/build-extra/tree/master/git-extra) (the script which calls notepad as a commit message editor, diff filter for word files,...). The source code for these files are also under `/usr/src` but need to checked out first (e.g. `cd /usr/src/MINGW-packages && git fetch && git checkout master`).

# Building an installer

You can build both a normal setup installer and a portable one.

The installers are basically created by collecting files from the `Git for Windows SDK` Msys environment, not from any checked out source code! It's therefore important to make any changed files available to the installer (the `make` calls in the "Hacking on git" step)!

As a one time step, you need to prepare the extra files which contain the helper scripts:

```bash
cd /usr/src/build-extra
git fetch
git checkout master
```

The next step depends on whether you want a normal setup-based installer or a portable installer:

To build a setup based one:

```bash
./installer/release.sh <version>-test
```
where `<version>` is the Git version.

To build a portable installer, use:

```bash
./portable/release.sh <version>-test
```
The last line of the log shows where the installer packages were created (usually in your user directory: `c:\Users\<login-name> `).

See also: 
* [Debugging git](Debugging-Git) with gdb
* Running Git's [regression tests](Running-Git's-regression-tests) 
* Msys/Mingw [package management](Package-management#technical-details)
* [Updating the SDK](https://github.com/git-for-windows/git/wiki/Updating-your-SDK)
