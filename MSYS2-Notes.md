Page for things that pop up while fiddling with MSys2.

1. PS1 script: I had to replace `PS1="$PS1"'\n'` with `PS1="$PS1"$'\n'` within the `profile` file to get the git prompt working. See also [this msys2 ticket page](http://sourceforge.net/p/msys2/tickets/17/)

2. When trying to debug environment issues, it can be very helpful to print out the environment as it comes into Git. Unfortunately, `mingw_startup()` – which converts the environment to UTF-8 – is run so early that the `sprintf()` family of functions does not work: the locale has not been initialized yet (because this would require the environment, using the `LC_ALL` environment variable!). Therefore, something like this is required:
```c
#include <strsafe.h>
...
{
  char buffer[1024];
  StringCbPrintf(buffer, sizeof(buffer), "env %d is '%s'\n", i, environ[i]);
  write(2, buffer, strlen(buffer));
}
``` 