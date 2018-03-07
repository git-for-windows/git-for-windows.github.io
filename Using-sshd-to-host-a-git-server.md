Everything you need to host a git server on Windows is included with Git for Windows.

### Configure sshd
### Run sshd
A simple way to start sshd automatically when you log in is to put a .BAT script in:
%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup

Mine contains:

`cd /d %GIT_HOME%`
`%GIT_HOME%\usr\bin\sshd.exe`
### Test sshd
### Connect with git