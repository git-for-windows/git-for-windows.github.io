# tl;dr

MINGW refers to executables that are compiled using the GNU C Compiler but target the Win32 API. MSYS2 refers to executables that are compiled (another) GNU C Compiler and make use of a POSIX emulation layer.

# Background

First of all, it needs to be noted that many parts of Git are not written in portable C; Git relies on a POSIX shell and Perl to be available instead.

## Git for Windows 1.x (MINGW and MSys)

To support the scripts, Git for Windows has to ship a minimal POSIX emulation layer with Bash and Perl thrown in, and when the Git for Windows effort started in August 2007, it used MSys, a stripped down version of Cygwin. Consequently, the original name of the project was "msysGit" (which, sadly, caused a *lot* of confusion because few Windows users know about MSys, and even less care).

To compile the C code of Git for Windows, MSys was used, too: it sports two versions of the GNU C Compiler: one that links implicitly to the POSIX emulation layer, and another one that targets the plain Win32 API (with a few convenience functions thrown in). For performance reasons (the POSIX emulation layer puts a serious dent into execution speed), Git for Windows' executables are built using the latter, and therefore they are really just Win32 programs. To discern executables requiring the POSIX emulation layer from the ones that do not, the latter are called MinGW (Minimal GNU for Windows) when the former are called MSys executables.

This reliance on MSys incurred challenges, too, though: some of our changes to the MSys runtime -- necessary to support Git for Windows better -- were not accepted upstream, so we had to maintain our own fork. Also, the MSys runtime was not developed further to support e.g. UTF-8 or 64-bit, and apart from lacking a package management system
until much later (when `mingw-get` was introduced), many packages provided by the MSys/MinGW project lag behind the respective source code versions, in particular Bash and OpenSSL. For a while, the Git for Windows project tried to remedy the situation by trying to build newer versions of those packages, but the situation quickly became untenable,
especially with problems like the Heartbleed bug requiring swift action that has nothing to do with developing Git for Windows further.

## Git for Windows 2.x (MINGW and MSYS2)

Happily, in the meantime [the MSYS2 project](https://msys2.github.io/) emerged, and was chosen to be the base of the Git for Windows 2.x. Just like MSys, MSYS2 is a stripped down version of [Cygwin](https://cygwin.com), but it is actively kept up-to-date with Cygwin's newest revisions. Thereby it already supports Unicode internally, and it also offers the 64-bit support that we yearned for since the beginning of the Git for Windows project.

MSYS2 also ported the Pacman package management system from Arch Linux and uses it heavily. This brings the same convenience to which Linux users are used (from `yum` or `apt-get`), and to which MacOSX users are used (from Homebrew or MacPorts), or BSD users (from the Ports system), to MSYS2: a simple `pacman -Syu` will update all installed packages to the newest versions currently available.

MSYS2 is also *very* active, typically providing package updates multiple times per week.

It still required a two-month effort to bring everything to a state where Git's test suite passes, many more months until the first official Git for Windows 2.x was released, and a couple of patches still await their submission to the respective upstream projects. Yet without MSYS2, the modernization of Git for Windows would simply not have happened.