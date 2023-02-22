# 32-bit support of Git for Windows

While Git for Windows v1.x was only ever offered as 32-bit installer (i.e. targeting the i686 CPU architecture), with the switch of Git for Windows v2.x in August 2015 to depend on [MSYS2](https://www.msys2.org/), there have been two variants: the 32-bit and the 64-bit (x86\_64) one.

However, due to Git for Windows' reliance on the MSYS2, which [dropped 32-bit support](https://www.msys2.org/news/#2020-05-17-32-bit-msys2-no-longer-actively-supported) (the 32-bit version of the MSYS2 runtime [cannot even be built](https://github.com/msys2/msys2-runtime/commit/762dcfc658c85de8d418c6ba4e0e40024bee118a) as of version 3.4.0), Git for Windows will start to phase out 32-bit support after Git for Windows v2.40.x.

## Timeline

### March 2023: End of full 32-bit support

The last major Git for Windows version with full 32-bit support will be v2.40.x.

### Until 2025: Limited 32-bit support

The 32-bit variant of Git for Windows will still be offered, but not all of the components distributed with Git for Windows will necessarily be updated as for the 64-bit variant.

For example, 64-bit Git for Windows v2.41.x will ship with the MSYS2 runtime v3.4.x, while 32-bit Git for Windows will remain with v3.3.6 forever.

### Until 2029: MinGit-only 32-bit support

The only official 32-bit artifacts built by the Git for Windows project will be MinGit, the minimal subset of Git for Windows intended for third-party applications (i.e. providing all Git functionality needed by applications, but not functionality needed for interactive usage by a human user).

### After April 2029: End of 32-bit support

Git for Windows will no longer provide any official 32-bit artifacts.
