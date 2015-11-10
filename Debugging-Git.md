# Debugging Git using the GNU debugger (GDB)

First of all, Git's `.exe` files should be rebuilt with debugging information, and without optimization (because `gdb` has serious troubles single-stepping code compiled using `-O2` for some reason). To this end, [install the Git for Windows SDK](https://git-for-windows.github.io/#download-sdk), edit `/usr/src/git/Makefile` to remove the `-O2` from the `CFLAGS = -g -O2 -Wall` line and then run `make` in `/usr/src/git/`.

After that, you can run Git's executables in GDB like so:

```sh
gdb --args ./git.exe --exec-path=/usr/src/git rev-parse HEAD
```

## Stopping at certain errors

Sometimes it is useful to ask the debugger to pause the program when the code path is entered that outputs an error message. The functions in Git that output error messages are `error_builtin()` and `die_builtin()`. So you can set the breakpoints

```
b error_builtin
b die_builtin
```

before calling `run` in `gdb` to stop execution at the appropriate time.