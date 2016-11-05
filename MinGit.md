# MinGit is *Git for Windows Applications*

## Rationale

Git for Windows targets end users, and for a long time third-party applications that spawn `git.exe` in order to provide Git-specific functionality piggy-backed onto the end-user installation.

However, for third-party applications it can be quite important to target certain minimum Git versions, e.g. when features such as `git reset --stdin` are needed that were introduced only recently.

Bundling a complete portable Git for such cases may very well be overkill, as the applications that want to call Git usually do not require *all* of Git for Windows' functionality, *especially* not the interactive features including Git GUI and Git Bash.

Enter MinGit.

MinGit is an intentionally minimal, non-interactive distribution of Git for Windows, with third-party applications as its intended audience.

## What is included in (or excluded from) MinGit?

MinGit bundles `git.exe` and supporting cast, with an eye on trying to keep the size as small as possible without breaking non-interactive Git usage. To reduce the size, MinGit excludes localized messages, interactive commands, help documents, executables that are not called by `git.exe`, and the likes.

As Tcl/Tk is only included in Git for Windows to support the Git GUI and `gitk` (both graphical, interactive components of Git), it is excluded from MinGit.

Further, a conscious decision was made to exclude Perl. It is a *large* contributor to Git for Windows' size, and only very few, non-essential functions of Git require it:

* `git add -i` (interactive, hence not needed)
* `git send-email` (highly unlikely that 3rd-party applications want to use *that*...)
* `git relink` (an old, old relic of the olden days before pack files, probably a good candidate for retirement to Git's own `contrib/` folder)
* CVS/Subversion adapters

The only really contentious part of that list is the Subversion adapter, `git svn`. However, the space savings are substantial enough, and Subversion is no longer *that* prevalent enough, to ask third-party applications that *do* want to call `git svn` to bundle a full-fledged portable Git.