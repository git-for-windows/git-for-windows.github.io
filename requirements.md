# Prerequisites

This page lists the prerequisites required to run [Git for Windows](https://gitforwindows.org/).

## Windows version

As of Git for Windows v2.10.1, Windows Vista or later are required. The last version of Git for Windows to support Windows XP and Windows Server 2003 is [v2.10.0](https://github.com/git-for-windows/git/releases/tag/v2.10.0.windows.1).

Why?

Parts of Git are implemented in shell script, and Git for Windows runs those scripts via [MSYS2](https://msys2.github.io/)'s POSIX emulation layer, which in turn is based on the [Cygwin POSIX emulation layer](https://cygwin.com). Seeing as Windows XP and Windows Server 2003 are years past their official end of life, the Cygwin project ended their Herculean efforts to support those Windows versions.
