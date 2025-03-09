---
title: requirements
---
# Prerequisites

This page lists the prerequisites required to run [Git for Windows](https://gitforwindows.org/).

## Windows version

Git for Windows requires Windows 8.1 or later on i686 and x86_64 CPU architectures. The last version to support Windows 7, 8, Server 2008 R2 and Server 2012 was [v2.46.2](https://github.com/git-for-windows/git/releases/tag/v2.46.2.windows.1). The last version to support Windows Vista and Server 2008 was [v2.37.1](https://github.com/git-for-windows/git/releases/tag/v2.37.1.windows.1). The last version of Git for Windows to support Windows XP and Windows Server 2003 is [v2.10.0](https://github.com/git-for-windows/git/releases/tag/v2.10.0.windows.1).

Why?

Parts of Git are implemented in shell script, and Git for Windows runs those scripts via [MSYS2](https://msys2.github.io/)'s POSIX emulation layer, which in turn is based on the [Cygwin POSIX emulation layer](https://cygwin.com). Seeing as Windows 8, Server 2012, 7, Server 2008 R2, Vista, Server 2008, XP and Server 2003 are years past their official end of life, the Cygwin project ended their Herculean efforts to support those Windows versions.

Git for Windows requires Windows 11 on the ARM64 CPU architecture.

Why?

The POSIX emulation layer mentioned above does not yet exist for ARM64, so we need x86_64 emulation to run the x86_64 version. The required x86_64 emulation is not available prior to Windows 11. While an i686 version exists, that is [on a deprection timeline](https://gitforwindows.org/32-bit.html).
