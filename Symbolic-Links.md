Short version: there is no exact equivalent for POSIX symlinks on Windows, and the closest thing is unavailable for non-admins by default. Therefore, symlink emulation support is switched off by default and needs to be configured by you, the user, via the `core.symlinks=true` config setting.

# Background

Starting with Windows Vista, there is support for symbolic links. These are not your grandfather's Unix symbolic links; They differ in quite a few ways:

- Symbolic links are only available on Windows Vista and later, most notably not on XP
- You need the `SeCreateSymbolicLinkPrivilege` privilege, which is by default assigned only to Administrators and guarded by UAC, but can be assigned to other users or user groups (see below).
- Symbolic links on remote filesystems are disabled by default (call `fsutil behavior query SymlinkEvaluation` to find out)
- Symbolic links will only work on NTFS, not on FAT nor exFAT
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

# Allowing non-administrators to create symbolic links

The privilege of `Create symbolic links` can be assigned using local policy editors (or via policies from Active Directory in case of domain accounts). Home Editions of Windows do not have these policy editors, but the freely available [Polsedit](http://www.southsoftware.com) can be used on these editions. 

- Local Group Policy Editor: Launch `gpedit.msc`, navigate to `Computer configuration - Windows Setting - Security Settings - Local Policies - User Rights Assignment` and add the account(s) to the list named `Create symbolic links`.

- Local Security Policy: Launch `secpol.msc`, navigate to `Security Settings - Local Policies - User Rights Assignment` and add the account(s) to the list named  `Create symbolic links`.

- Polsedit: Launch `polseditx32.exe` or `polseditx64.exe` (depending on your Windows version), navigate to `Security Settings - User Rights Assignment` and add the account(s) to the list named `Create symbolic links`.

Note that regardless of privilege assignment, members of the Administrators group will also require UAC elevation (see the full details in the *Access Token Changes* section in this [document on UAC](https://msdn.microsoft.com/en-us/library/bb530410.aspx)). Since Windows 10 version 1704 (*Creators Update*), enabling Developer Mode will disable this restriction and allow creating symlinks without UAC elevation[1] (although Git for Windows still requires UAC elevation up to and including v2.13.0).

[1] https://blogs.windows.com/buildingapps/2016/12/02/symlinks-windows-10/