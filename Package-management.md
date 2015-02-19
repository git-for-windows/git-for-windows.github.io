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

## Repository structure

TBD

## Bintray

TBD

## Rebuild packages

To build MSys packages, you need to start the `MSys` shell (which sets `MSYSTEM=MSYS` before running the Bash), clone the [`MSYS2-packages`](https://github.com/git-for-windows/MSYS2-packages) repository (recommended location: `/usr/src/MSYS2-packages`), `cd` to the appropriate subdirectory and call

```bash
makepkg -s
```

(The `-s` flag tells `makepkg` that it should install dependencies automatically as needed)

To build MinGW packages, you need to start the appropriate `MinGW` shell (32-bit or 64-bit – this sets `MSYSTEM=MINGW32` or `MSYSTEM=MINGW64` respectively), clone the [`MINGW-packages`](https://github.com/git-for-windows/MINGW-packages) repository (recommended location: `/usr/src/MINGW-packages`), `cd` to the appropriate subdirectory and call

```bash
makepkg-mingw -s
```
 
## How to upload new versions (Git for Windows core developers only)

TODO: explain how to use `repo-add`