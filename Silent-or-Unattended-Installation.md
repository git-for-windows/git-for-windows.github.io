It is possible to silently install msysgit using the following flags when called from a dos prompt:
```
/SILENT /COMPONENTS="icons,ext\reg\shellhere,assoc,assoc_sh"
```

An example of this is
```
Git-2.12.2.2-64-bit.exe /SILENT /COMPONENTS="icons,ext\reg\shellhere,assoc,assoc_sh"
```
You can find all of the possible flags to use by inspecting the install.iss file:

https://github.com/git-for-windows/build-extra/blob/master/installer/install.iss

You can also load install parameters from a file with `/LOADINF="filename"`, and you can record parameters to a file using `/SAVEINF="filename"`.

An example of a parameter file is:

```
[Setup]
Lang=default
Dir=C:\Program Files\Git
Group=Git
NoIcons=0
SetupType=default
Components=
Tasks=
PathOption=Cmd
SSHOption=OpenSSH
CRLFOption=CRLFAlways
```

More information on commandline parameters can be found at http://www.jrsoftware.org/ishelp/index.php?topic=setupcmdline