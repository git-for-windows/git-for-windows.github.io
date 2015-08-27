Starting with Windows Vista, there is support for symbolic links. These are not your grandfather's Unix symbolic links; They differ in quite a couple of ways:

- Symbolic links are only available on Windows Vista and later, most notably not on XP
- You need the `SeCreateSymbolicLinkPrivilege` privilege (which is by default not assigned only to Administrators; also requires UAC elevation for any Administrators member, regardless of privilege assignment)
- Symbolic links pointing to remote filesystems are disabled by default (call `fsutil behavior query SymlinkEvaluation` to find out)
- Symbolic links will only work on NTFS, not on FAT
- Windows' symbolic links are typed: they need to know whether they point to a directory or to a file (for this reason, Git will update the type when it finds that it is wrong)
- Many programs do not understand symbolic links

For those reasons, Git for Windows disables support for symbolic links by default (it will still read them when it encounters them). You can enable support via the `core.symlinks` config variable, e.g. when cloning:

```sh
git clone -c core.symlinks=true <URL>
```