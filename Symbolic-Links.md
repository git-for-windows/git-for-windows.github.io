Short version: there is no exact equivalent for POSIX symlinks on Windows, and the closest thing is unavailable for non-admins by default. Therefore, symlink emulation support is switched off by default and needs to be configured by you, the user, via the `core.symlinks=true` config setting.

# Background

Starting with Windows Vista, there is support for symbolic links. These are not your grandfather's Unix symbolic links; They differ in quite a couple of ways:

- Symbolic links are only available on Windows Vista and later, most notably not on XP
- You need the `SeCreateSymbolicLinkPrivilege` privilege, which is by default assigned only to Administrators but can be assigned to normal users using Local Security Policy (or via Active Directory). Home Editions of Windows Vista and Windows 7 do not have Local Security Policy, but the freely available Polsedit (http://www.southsoftware.com) can be used on these editions. Note that regardless of privilege assignment, members of the Administrators group will also require UAC elevation (see the full details in *Access Token Changes* just above https://msdn.microsoft.com/en-us/library/bb530410.aspx#vistauac_topic4)
- Symbolic links on remote filesystems are disabled by default (call `fsutil behavior query SymlinkEvaluation` to find out)
- Symbolic links will only work on NTFS, not on FAT
- Windows' symbolic links are typed: they need to know whether they point to a directory or to a file (for this reason, Git will update the type when it finds that it is wrong)
- Many programs do not understand symbolic links

For those reasons, Git for Windows disables support for symbolic links by default (it will still read them when it encounters them). You can enable support via the `core.symlinks` config variable, e.g. when cloning:

```sh
git clone -c core.symlinks=true <URL>
```

# Creating symbolic links

By default, the `ln -s` command in *Git Bash* does *not* create symbolic links. Instead, it creates copies.

To create symbolic links (provided your account has permission to do so), use the `mklink.exe` tool, like so:

```cmd
mklink /d this-link-points-to c:\that-directory
mklink this-link-points-to c:\that-file
```