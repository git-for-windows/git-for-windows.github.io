# Prerequisites

This page lists the prerequisites required to run [Git for Windows](https://gitforwindows.org/).

## Windows version

Git for Windows requires Windows 7 Service Pack 1 or later. The last version to support Windows Vista and Server 2008 was [v2.37.1](https://github.com/git-for-windows/git/releases/tag/v2.37.1.windows.1). The last version of Git for Windows to support Windows XP and Windows Server 2003 is [v2.10.0](https://github.com/git-for-windows/git/releases/tag/v2.10.0.windows.1).

Why?

Parts of Git are implemented in shell script, and Git for Windows runs those scripts via [MSYS2](https://msys2.github.io/)'s POSIX emulation layer, which in turn is based on the [Cygwin POSIX emulation layer](https://cygwin.com). Seeing as Windows Vista, Server 2008, XP and Server 2003 are years past their official end of life, the Cygwin project ended their Herculean efforts to support those Windows versions.
