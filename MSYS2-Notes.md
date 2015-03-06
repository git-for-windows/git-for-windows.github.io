Page for things that pop up while fiddling with MSys2.

# PS1 script

I had to replace `PS1="$PS1"'\n'` with `PS1="$PS1"$'\n'` within the `profile` file to get the git prompt working. See also [this msys2 ticket page](http://sourceforge.net/p/msys2/tickets/17/)

# Debugging the environment conversion to UTF-8

When trying to debug environment issues, it can be very helpful to print out the environment as it comes into Git. Unfortunately, `mingw_startup()` – which converts the environment to UTF-8 – is run so early that the `sprintf()` family of functions does not work: the locale has not been initialized yet (because this would require the environment, using the `LC_ALL` environment variable!). Therefore, something like this is required:
```c
#include <strsafe.h>
...
{
  char buffer[1024];
  StringCbPrintf(buffer, sizeof(buffer), "env %d is '%s'\n", i, environ[i]);
  write(2, buffer, strlen(buffer));
}
``` 

# Changing the colors in the Terminal

See https://github.com/mavnn/mintty-colors-solarized

# Building the git documentation
- pacman -S asciidoc xmlto
- start a msys shell
- make doc

In a mingw32 shell asciidoc fails with
```
../git/Documentation$ asciidoc git-annotate.txt
asciidoc: FAILED: configuration file asciidoc.conf missing
```

# Openssh

Complains about world writeable private key files, although that makes no sense on windows.
