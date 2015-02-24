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

Note: To compile 32-bit packages, you might need to set `MINGW_INSTALLS=mingw32` first.

To build MSys packages, you need to start the `MSys` shell (which sets `MSYSTEM=MSYS` before running the Bash), clone the [`MSYS2-packages`](https://github.com/git-for-windows/MSYS2-packages) repository (recommended location: `/usr/src/MSYS2-packages`), `cd` to the appropriate subdirectory and call

```bash
makepkg -s
```

To rebuild the `msys2-runtime` (i.e. `msys-2.0.dll`), you will need to have a *second* MSys2 installation and quit all applications from the first MSys2 installation. In the second installation, as above, start the `MSys` shell and clone `MSYS2-packages` to `/usr/src/`.

Inside the `msys2-runtime` subdirectory, you need to use `makepkg -s` *for the initial build*.

For subsequent builds, after modifying the source files in `src/msys2-runtime/winsup/cygwin/` you can switch to `src/build-<arch>-pc-msys/<arch>-pc-msys/winsup/cygwin` and type `make`. This will generate an `msys0.dll` file in the latter directory that you can then copy to the first MSys2 installation to test.

The process to rebuild the `Bash` is very similar to the `msys2-runtime` one; You will just need to work in the `src/bash-<version>/` subdirectory of `/usr/src/MSYS2-packages/bash/` (both the sources and the generated `bash.exe` live there).

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

TBD

## Bintray

TBD

## How to upload new versions (Git for Windows core developers only)

TODO: explain how to use `repo-add`