As described in [Package management](Package-management), Git for Windows' SDK is a close derivative of the [MSYS2](https://msys2.github.io/) system, and as such, its components are built using `makepkg` and `makepkg-mingw` (borrowed from Arch Linux' [`pacman`](https://wiki.archlinux.org/index.php/Pacman)).

Most of those packages are actually built by the MSYS2 project and consumed by Git for Windows. However, a couple of components (including cURL and OpenSSH) _are_ built by Git for Windows, e.g. to be able to react faster to newly-available versions, or to allow for modifications specific to Git for Windows.

In general, the process to upgrade components to new versions is quite tedious.

First of all, the Git for Windows maintainer needs to be aware that a new version of a Git for Windows SDK component is available. The current process for this involves using a custom IFTTT applet to receive notifications when, say, [cURL's Atom feed](https://github.com/curl/curl/tags.atom) reports a new version.

The next step is to update the package definitions (i.e. Pacman's [`PKGBUILD`](https://www.archlinux.org/pacman/PKGBUILD.5.html) files), to reflect the new version and the checksum for the respective archive.

Git for Windows offers some automation for that, figuring out the current version of a specified component in [its administrative script called `please.sh`](https://github.com/git-for-windows/build-extra/blob/master/please.sh) and updating the respective `PKGBUILD`, then building and uploading the Pacman package. The idea is to call e.g. `sdk cd build-extra && ./please.sh upgrade curl` to upgrade cURL.

This script is, essentially, the backbone of the two Azure Pipelines used by the Git for Windows project to build new package versions: [Build and publish MINGW Pacman package](https://dev.azure.com/git-for-windows/git/_build?definitionId=32) and [Build and publish MSYS Pacman package](https://dev.azure.com/git-for-windows/git/_build?definitionId=33).

However, many a time this automation fails, for a variety of reasons, including, but not limited to:

- Download links do change. If this is the case, the `source` definition in the `PKGBUILD` needs to be adjusted.
- Patches that are applied as part of the `build` function in the `PKGBUILD` script might no longer apply to newer versions (see below).
- Spurious network errors. Those are the maintainer's favorite hiccups.

# Adjusting patches when they no longer apply to new versions

TBD