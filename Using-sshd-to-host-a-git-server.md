Everything you need to host a git server on Windows is included with Git for Windows.
In these instructions it is assumed that Git for Windows is installed at %GIT_HOME%

### Configure sshd
You need to create a key pair within %GIT_HOME%\etc\ssh for sshd to use as the server identity.
e.g., ssh_host_rsa_key and ssh_host_rsa_key.pub

TODO: How to create the key pair

### Run sshd
A simple way to start sshd automatically when you log in is to put a .BAT script in:
%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup

Mine contains:

`cd /d %GIT_HOME%
%GIT_HOME%\usr\bin\sshd.exe`

### Test sshd
Your ultimate goal is probably to be able to ssh into the server where you are running sshd, without having to enter your password. (There are security considerations which probably require you to consult policies within your local organization) I suggest you setup your user account(s) with ssh public key authentication for this.

### Adding projects 
I create projects directly in %GIT_HOME% with:

`git init --bare yourproject.git`

Then from a client you can clone that project and add content to it from there.

Note: Creating them there is probably not ideal when it comes time to upgrading Git version on the server, so you may want to consider this before starting out.

### Connect with git
From your client machine (which may or may not be the same machine as the server)
Checkout projects via git clone with an ssh-protocol URL:
`git clone ssh://your.server/yourproject.git`

Or if your local username on the client is different than on the server:
`git clone ssh://you@your.server/yourproject.git`

If you have chosen to use public key authentication, you should not have to enter a password.