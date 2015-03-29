Modern software development relies heavily on a way to manage dependencies, i.e. to keep track of required software libraries and their versions. Examples are `apt-get` for Linux, `homebrew` for MacOSX, `Maven` for Java and `pip` for Python.

Git for Windows is based on [MSys2](https://msys2.github.io/) which bundles Arch Linux' [Pacman](https://wiki.archlinux.org/index.php/Pacman) tool for dependency management.

# How to use `pacman`

There is a `man` page for `pacman` and the tool also sports a `--help` option. These resources are recommended to address questions not covered by the following, brief descriptions.

## Install/upgrade packages

To install a package, run

```bash
pacman -S <package-name>
```

To ensure that the newest package version is installed, it is recommended to pass the `-y` option, too, which asks Pacman to download the newest package list:

```bash
pacman -Sy <package-name>
```

## Remove packages

```bash
pacman -R <package-name>
```

## List packages

To list the installed packages, call

```bash
pacman -Q
```

To list the contents of a package, call

```bash
pacman -Ql <package-name>
```

# Technical details

## Rebuild packages

To build MinGW packages, you need to start the appropriate `MinGW` shell (32-bit or 64-bit – this sets `MSYSTEM=MINGW32` or `MSYSTEM=MINGW64` respectively), clone the [`MINGW-packages`](https://github.com/git-for-windows/MINGW-packages) repository (recommended location: `/usr/src/MINGW-packages`), `cd` to the appropriate subdirectory and call

```bash
makepkg-mingw -s
```
 
(The `-s` flag tells `makepkg` that it should install dependencies automatically as needed)

To build MSys packages, you need to start the `MSys` shell (which sets `MSYSTEM=MSYS` before running the Bash), clone the [`MSYS2-packages`](https://github.com/git-for-windows/MSYS2-packages) repository (recommended location: `/usr/src/MSYS2-packages`), `cd` to the appropriate subdirectory and call

```bash
makepkg -s
```

## Perl package management

Perl packages are managed outside of the `pacman` realm, but instead with [CPAN](http://www.cpan.org/):

```bash
perl -MCPAN -e 'install <package-name>'
```

CPAN also offers an interactive shell:

```bash
perl -MCPAN -e shell
```

## Repository structure

Pacman repositories are served via HTTP, as static files in a single directory. The most important file in that directory is the *package index*, called `<name>.db.tar.xz` by convention. This package index can be updated via `repo-add <package-index> <package-file>...` (this updated *only* the package index, it does *not* copy the package files into the same directory). Pacman expects to find the package files referenced in the package index in the same directory as the index.

The *Git for Windows*-specific packages are served from Bintray, see [below](#Bintray).
We ship MSys2 and MinGW packages for two architectures, [`i686`](https://dl.bintray.com/git-for-windows/pacman/i686/) and [`x86_64`](https://dl.bintray.com/git-for-windows/pacman/x86_64/).

## Bintray

[Bintray](https://bintray.com) hosts repositories of binary files, much like GitHub hosts repositories of source files. Git for Windows' binary files are [hosted on Bintray](https://bintray.com/git-for-windows/).

Git for Windows' [most important repository hosted on Bintray](https://bintray.com/git-for-windows/pacman) contains the Pacman repositories [described above](#Repository_structure). The section to add to `pacman.conf` to access this repository is:

```ini
[git-for-windows]
Server = https://dl.bintray.com/$repo/pacman/$arch
SigLevel = Optional
```

## How to upload new versions (*Git for Windows* maintainers only)

To upload new files, a maintainer needs to have permission to write to the `pacman` repository on Bintray. We have a helpful tool in the [`build-extra`](https://github.com/git-for-windows/build-extra) repository to assist in the process, called `pacman-mirror.sh`. After building a new package version (preferably for 32-bit *and* 64-bit), the tool should be used thusly:

```bash
/usr/src/build-extra/pacman-mirror.sh fetch
/usr/src/build-extra/pacman-mirror.sh add \
    /path/to/<package>-<version>-i686.pkg.tar.xz \
    /path/to/<package>-<version>-x86_64.pkg.tar.xz
/usr/src/build-extra/pacman-mirror.sh push
```

The `fetch` step will initialize or synchronize the local mirror of the Pacman repository, the `add` step will copy the packages into the appropriate location, and the `push` step will update the package index, and upload the packages that are not yet on Bintray as well as the package index.

Note: The `pacman-mirror.sh` tool takes no precaution against simultaneous use. You *will* want to coordinate with your fellow maintainers to avoid running it at the same time as somebody else.