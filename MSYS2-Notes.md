Page for things that pop up while fiddling with msys2.

1. PS1 script: I had to replace `PS1="$PS1"'\n'` with `PS1="$PS1"$'\n'` within the `profile` file to get the git prompt working. See also [this msys2 ticket page](http://sourceforge.net/p/msys2/tickets/17/)