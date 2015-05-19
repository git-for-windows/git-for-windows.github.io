How to add Git Bash Here properly:

Create a batch file named bash_here.bat in installed directory and contents should be:

`:`

`@echo off`

`set MSYSTEM=MINGW64`

`set curpath="."`

`if NOT 'x%1' == 'x' set curpath=%1`

`start %~dp0usr\bin\mintty.exe -i /mingw64/share/git/git-for-windows.ico -t "MSYS2 Bash Here" -w normal /usr/bin/bash -lc 'cd "$(cygpath %curpath%)"; export CHERE_INVOKING=1; exec bash --login -i'`

Then you need to add in regedit:

[HKEY_CLASSES_ROOT\Directory\Background\shell\msys2]

@="MSYS2 Bash here"

"Icon"="C:\\git-sdk-64\\mingw64\\share\\git\\git-for-windows.ico"


[HKEY_CLASSES_ROOT\Directory\Background\shell\msys2\command]

@="C:\\git-sdk-64\\bash_here.bat \"%V\""


[HKEY_CLASSES_ROOT\Directory\Background\shell\msys2_git_gui]

"Icon"="C:\\git-sdk-64\\mingw64\\share\\git\\git-for-windows.ico"

@="MSYS2 Git GUI"

[HKEY_CLASSES_ROOT\Directory\Background\shell\msys2_git_gui\command]

@="C:\\git-sdk-64\\usr\\bin\\bash.exe -lc 'cd \"$(cygpath \"%V\")\"; export CHERE_INVOKING=1; exec git gui'"


[HKEY_CLASSES_ROOT\Directory\shell\msys2]

@="MSYS2 Bash here"

"Icon"="C:\\git-sdk-64\\mingw64\\share\\git\\git-for-windows.ico"

[HKEY_CLASSES_ROOT\Directory\shell\msys2\command]

@="C:\\git-sdk-64\\bash_here.bat \"%V\""


[HKEY_CLASSES_ROOT\Directory\shell\msys2_git_gui]

@="MSYS2 Git GUI"

"Icon"="C:\\msysgit\\share\\resources\\git.ico"


[HKEY_CLASSES_ROOT\Directory\shell\msys2_git_gui\command]

@="C:\\git-sdk-64\\usr\\bin\\bash.exe -lc 'cd \"$(cygpath \"%V\")\"; export CHERE_INVOKING=1; exec git gui'"
