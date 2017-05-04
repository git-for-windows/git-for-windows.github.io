It is possible to install Git for Windows silently using the following flags when called from a command-line prompt:
```
Git-<version>-<bitness>.exe /VERYSILENT /NORESTART /NOCANCEL /SP- /CLOSEAPPLICATIONS /RESTARTAPPLICATIONS /COMPONENTS="icons,ext\reg\shellhere,assoc,assoc_sh"
```

An example of this is
```
Git-2.12.2.2-64-bit.exe  /VERYSILENT /NORESTART /NOCANCEL /SP- /CLOSEAPPLICATIONS /RESTARTAPPLICATIONS /COMPONENTS="icons,ext\reg\shellhere,assoc,assoc_sh"
```

You can find all of the possible flags to use by calling the installer with the `/?` flag (for the options supported by InnoSetup out of the box), and by inspecting the [`install.iss` file](https://github.com/git-for-windows/build-extra/blob/master/installer/install.iss) (for custom options added only to Git for Windows' installer).

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

More information on commandline parameters can be found in [InnoSetup's documentation](http://www.jrsoftware.org/ishelp/index.php?topic=setupcmdline).