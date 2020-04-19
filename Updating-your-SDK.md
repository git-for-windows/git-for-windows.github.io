# Installing the SDK

The [Git for Windows SDK release](https://github.com/git-for-windows/build-extra/releases/latest) is a self extracting and auto executing 7-zip archive that clones the latest version of files in [Git for Windows SDK 64 repository](https://github.com/git-for-windows/git-sdk-64`) using a temporary bundled git. For the [32 bit version](https://github.com/git-for-windows/git-sdk-32`) it also performs a run time optimisation on cloned DLLs (rebase).

This was previously called the 'net installer', see below. It provides everything required to bootstrap a development environment, even if no git is available (or an unstable one is being worked on).

It is also possible to manually extract the archive and then run `./setup-git-sdk.bat` in the MSYS2 terminal window.
 
Alternatively, you can also clone your own copy of the 64 bit SDK with `git clone --depth=1 https://github.com/git-for-windows/git-sdk-64` (or `...-32` for 32-bit)... (select depth to taste) (See #816). The repository contains exes and DLLS so you should run the rebase script for the 32 bit version.

The SDK contains core parts of MSYS2 Runtime, MinGW, 'pacman' and 'gnupg' packages, carefully selected to
keep the size small yet still allowing use of the 'pacman' package manager to initialize a full-fledged MSYS2 environment
plus Git for Windows' packages.

# Updating the installed SDK

The SDK ships with the script `update-via-pacman.bat` that you can run (but you need to make sure that all Git SDK Bash windows are closed first, i.e. that no processes are running that might lock files that want to be updated)

Alternatively:
To keep the SDK up-to-date, periodically run

	pacman -Syu
	# If core-packages are updated by this you are promted
 	# to restart MSYS2 without exiting back to the shell.
	# Follow these instructions and repeat:
	pacman -Syu

## Explanation

Core packages like the `msys2-runtime`, `bash` or `pacman` itself should be updated
with the `pacman -Syu` command [was X`update-core` script X]. Because those core packages are linked to the
`msys2-runtime` (and each other), and updating the runtime "in flight" results most
often in heap corruption as far as MSYS2 is concerned.

The old `update-core` script has been retired, see https://github.com/msys2/MSYS2-packages/issues/524

## Alternative Method

An alternative method is to start `git-cmd.exe` from within the MSYS2 shell and run `pacman -Sy --needed msys2-runtime && pacman -S --needed pacman bash`. This ensures that no obsolete binary continues to be used after the
update.

### See Also:

* [G4W Package Management](https://github.com/git-for-windows/git/wiki/Package-management)
* [pacman man page](https://www.archlinux.org/pacman/pacman.8.html)
* [PKGBuild man page](https://www.archlinux.org/pacman/PKGBUILD.5.html)
* [makepkg man page](https://www.archlinux.org/pacman/makepkg.8.html)
* ArchLinux articles - [Creating Packages](https://wiki.archlinux.org/index.php/Creating_packages) and [PKGBuild](https://wiki.archlinux.org/index.php/PKGBUILD)
* [MSYS2 Introduction & Contributing](http://sourceforge.net/p/msys2/wiki/Contributing%20to%20MSYS2/)
* [SDK's setup-git-sdk.bat script](https://github.com/git-for-windows/build-extra/blob/master/sdk-installer/setup-git-sdk.bat)

## Origin of 'net installer' concept

The idea for the 'net installer' originated in the Git for Windows
project when it was still based on MSys 1.x. At that time, MSys 1.x did
not have a package manager, therefore the original net installer
(ab-)used Git as a package manager.

Since the new net installer no longer needs to ship with Git (instead using Pacman to install all the packages (including the `mingw-w64-git` package) that are current at the time the net installer is launched), its versions are no longer tightly coupled to the Git version.
