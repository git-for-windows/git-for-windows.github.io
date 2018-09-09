# Case Preservation, Case insensitivity

Windows is case insensitive, but case preserving for filenames. Meanwhile Linux/Posix, for which Git is designed, is case sensitive. 

In addition Git branch names are stored as filenames.

This means that in normal usage, Git will have difficulty when it meets a changed case file or branch. Lower case is common for Linux usage!

E.g. `Master` branch and `master` branch are different, even though, on Windows, Git will often mistake one for the other (because Windows will read the 'other' case version of the file.

Likewise Windows will not be able to check out both an upper case and lower case version of a file(s). Apparently the vim repository has this 'two versions' Vim/vim problem.

Windows alsao cannot checkout files which contain special characters, such as colon(:) etc. This can cause cross system management issues.

# Path Quotation

Spaces in filenames is common in Windows, but rare in Linux. Linux has, like Windows, multiple path quoting mechanisms. In addition Linux can accept any character in any filename, including 'special' characters. This means that the path conversion between Windows and Git is imperfect and dependant on the particular command structure and 'terminal' in use.

Many Git commands do not report errors in the way that maybe expected by Windows users - some will simply ignore invalid options and paths, leaving the unfamiliar user wondering what happened. The `git config` is one area where this may happen, especially as there can be quoting confusion (single, double, or none) between bash, cmd, and powershell. (e.g. see [thread](https://public-inbox.org/git/d9330ba54fbda54a92a9f4d9320836d88ce9a6e6.camel@mad-scientist.net/))

# Executable and Mode Bits

Linux attaches a mode word to each file, with bits that indicate if the file is executable, readable, writable, and other ownership aspects (`chmod`). This does not map well to Windows semantics, especially for the executable bit. The existing mode bits are retained in the repository tree meta data, which is then held locally in the index. 

Users may need to directly manipulate the mode bits where necessary - the [stackoverflow page](https://stackoverflow.com/a/38285462/717355) shows how to use the `--chmod` option while adding or updating files.




