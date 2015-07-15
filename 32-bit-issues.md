# What is the problem with running Git for Windows in 32-bit mode?

Note that typically, there is no problem because the solution described [here](#adjusting-msys-20dlls-address-range-manually) is executed preventively upon installation of Git for Windows.

The problem only resurfaces if a `.dll` has been installed *after* Git for Windows' installation and only if that `.dll` [interferes with the address range hard-coded into the MSys2 runtime](#background).

The simplest solution to fix that problem if it rears its ugly head at all is to switch to the 64-bit version of Git for Windows (the 64-bit address range is so large that MSys2's runtime virtually never has any run-in with another `.dll`).

The second-simplest solution is to [reinstall Git for Windows](#reinstall-git-for-windows).

# Background

Git for Windows is not just a version of Git compiled and packaged for yet another Operating System. Many parts of Git are written in script languages (e.g. POSIX shell or Perl) and therefore Git for Windows has to bundle such script interpreters as well. In particular `bash.exe` (which is used by Git for Windows to execute POSIX shell scripts) expects a POSIX environment which is not available on Windows. The Git for Windows project uses [MSys2](https://msys2.github.io/) (essentially a [portable](https://en.wikipedia.org/wiki/Portable_application) version of [Cygwin](https://cygwin.com/)) to provide the POSIX emulation layer.

## The problem with `fork()`

One of the most crucial POSIX calls expected by Bash is the `fork()` call. It starts a new process, inheriting the current process' memory contents, file descriptors and other resources. And it has no equivalent in the Win32 API (`fork()`'s closest Win32 relative is `CreateProcess()` which spawns a new process, inheriting nothing at all by default).

To make it possible to emulate `fork()`, Cygwin -- and therefore MSys2 -- needs to make certain assumptions about its core ("runtime") library called `cygwin1.dll` -- or `msys-2.0.dll`. In particular, it needs to pin it to a known address range to detect in child processes that there is a parent process already, and to copy the relevant data from there.

That works very well. Until another `.dll` has been loaded into memory already, into a location that interferes with the hard-coded address range of the runtime. It is unfortunately not possible to catch that problem in a user-friendly way because there is no Win32 API call that can ask "has this address range been used by this and that `.dll`?".

## The symptom of an address range that needs adjusting

When there is already a `.dll` interfering with MSys2's runtime's hard-coded address range, the user will be greeted by this error message when calling Bash :

```
> sh.exe
      0 [main] sh.exe" 17588 handle_exceptions: Exception: STATUS_ACCESS_VIOLATION
    865 [main] sh.exe" 17588 open_stackdumpfile: Dumping stack trace to sh.exe.stackdump
```

## Solutions

There are several ways how to get out of this problem:

## Upgrade to the 64-bit version of Git for Windows

The address range available in 64-bit Windows is so large as to virtually guarantee that the address range of the MSys2 runtime never has to be adjusted. This is by far the easiest solution, now that Git for Windows 2.x offers a 64-bit version.

## Reinstall Git for Windows

If you cannot switch to 64-bit for any reason, reinstalling Git for Windows will typically fix the problem because it [adjusts the address range preemptively](#adjusting-msys-20dlls-address-range-manually).

## Adjusting `msys-2.0.dll`'s address range manually

To fix the problem of address range overlaps, MSys2 offers a utility called `rebase.exe` (which confusingly has nothing at all to do with `git rebase`) to adjust the address range of a given set of `.dll` files.

Unfortunately the [symptom](#the-symptom-of-an-address-range-that-needs-adjusting) occurs not all that rarely, therefore there is even a script to make `rebase.exe` more convenient to use: `/usr/bin/rebaseall`. This script is meant to be executed via Dash instead of Bash, to avoid chicken-and-egg problems with Bash not being able to run properly unless the address range is already fixed. Typically it is unnecessary to run this script manually because it is run as part of Git for Windows' installation process. If the [symptom](#the-symptom-of-an-address-range-that-needs-adjusting) occurs at some stage long after Git for Windows was installed, reinstalling Git for Windows is the most convenient way to fix it.