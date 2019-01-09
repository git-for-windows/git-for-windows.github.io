Modern software development relies heavily on a way to manage dependencies, i.e. to keep track of required software libraries and their versions. Examples are `apt-get` for Linux, `homebrew` for MacOSX, `Maven` for Java and `pip` for Python.

Git for Windows is based on [MSYS2](https://msys2.github.io/) which bundles Arch Linux' [Pacman](https://wiki.archlinux.org/index.php/Pacman) tool for dependency management.

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

To upgrade all packages to their newest versions, call

```bash
pacman -Syu
```

### Updating `msys2-runtime`, `pacman` and `bash`

As `pacman.exe` is itself an MSYS2 executable, it is strongly suggested to update `msys2-runtime` and `pacman` packages individually if they need to be updated, and let `pacman` quit *immediately* afterwards.

Likewise, if you run `pacman` from a `bash` -- an MSYS2 program, too -- you should quit the shell *immediately* (it might show an infinite stream of heap messages instead of quitting, requiring to be force-quit).

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

To find out what package a file belongs to, call

```bash
pacman -Qo <file-name>
```

# Technical details

## Rebuild packages

If you want to rebuild a package, the first order of business is to know which repository has the metadata for the package. Git for Windows has three repositories containing such metadata:

- [build-extra](https://github.com/git-for-windows/build-extra) contains the `git-extra` package information,
- [MINGW-packages](https://github.com/git-for-windows/MINGW-packages) contains the information for the MinGW packages, i.e. packages that do not require any POSIX emulation; by convention, their package name have the `mingw-w64-` prefix, and
- [MSYS2-packages](https://github.com/git-for-windows/MSYS2-packages) contains the information for all packages that require a POSIX emulation, such as Bash, OpenSSH, etc. The `MSYS2-packages` repository also contains the information of the package *providing* the POSIX emulation: [`msys2-runtime`](https://github.com/git-for-windows/msys2-runtime) (see also [Building msys2-runtime](Building-msys2-runtime)).

To build MinGW packages, you need to start the appropriate `MinGW` shell (32-bit or 64-bit – this sets `MSYSTEM=MINGW32` or `MSYSTEM=MINGW64` respectively), clone the [`MINGW-packages`](https://github.com/git-for-windows/MINGW-packages) repository (recommended location: `/usr/src/MINGW-packages`), `cd` to the appropriate subdirectory and call

```bash
makepkg-mingw -s
```
 
(The `-s` flag tells `makepkg` that it should install dependencies automatically as needed)

To build MSys packages, you need to start the `MSys` shell (e.g. `C:\git-sdk-64\msys2_shell.cmd -msys`, which sets `MSYSTEM=MSYS` before running the Bash), clone the [`MSYS2-packages`](https://github.com/git-for-windows/MSYS2-packages) repository (recommended location: `/usr/src/MSYS2-packages`), `cd` to the appropriate subdirectory and call

```bash
makepkg -s
```

If you have modified any files (like `PKGBUILD`) you need to update the checksums using the `updpkgsums` command before running `makepkg` or `makepkg-mingw`.

*Note*: Before building the first MSys package, as per [MSYS2's own documentation](http://sourceforge.net/p/msys2/wiki/Contributing%20to%20MSYS2/) you need to install the development packages for development:

```sh
pacman -Sy base-devel msys2-devel
```

### Build packages from locally-patched sources

When testing Pull Requests or debugging certain issues, it is convenient to build packages from source code other than the canonical one listed in the `PKGBUILD` file. This can be achieved by switching to the subdirectory of `/usr/src/MINGW-packages` or `/usr/src/MSYS2-packages`, respectively, corresponding to the package you want to build, ensure that the `src/` directory is populated (and call `makepkg-mingw --nobuild -s` or `makepkg --nobuild -s` otherwise), then patch the source code in the `src/` subdirectory and after that call

```bash
makepkg-mingw --noextract --noprepare
```

or


```bash
makepkg --noextract --noprepare
```

to build the package.

### More details about rebuilding packages

The `makepkg` script is part of the `pacman` package itself. It expects a [`PKGBUILD`](https://wiki.archlinux.org/index.php/PKGBUILD) file in the current directory that contains metadata about the package and functions specifying how to prepare the source code, build the executables, and package all the files.

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
We ship MSYS2 and MinGW packages for two architectures, [`i686`](https://dl.bintray.com/git-for-windows/pacman/i686/) and [`x86_64`](https://dl.bintray.com/git-for-windows/pacman/x86_64/).

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
