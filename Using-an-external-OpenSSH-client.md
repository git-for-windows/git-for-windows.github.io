## OpenSSH on Windows 10

Modern versions of Windows and Windows Server come with [OpenSSH](https://www.openssh.com/) installed, and available on the system PATH. By default, the OpenSSH binaries are located in `C:\WINDOWS\System32\OpenSSH\`.

The [`ssh-agent`](https://man.openbsd.org/ssh-agent.1) is also implemented as a [Windows service](https://docs.microsoft.com/en-us/windows/win32/services/services), allowing it to be run automatically, during boot or login, and so on.

> **NOTE:** By default the `ssh-agent` service is **disabled**, and if its use required — to manage your private keys, for instance — it will need to be explicitly enabled, and then started (or configured to start as necessary).

## Configuring Git For Windows to use an external client

As per [this discussion](https://github.com/git-for-windows/git/discussions/3451#discussioncomment-1424427) on the issue, during the installation of Git For Windows there is an option to utilise either the built-in [OpenSSH](https://www.openssh.com/) client, or an external client.

In order to configure this functionality, either as a post-installation change, or to use it with the portable version of Git For Windows, the bundled OpenSSH binaries should be removed.

> **NOTE:** This feature is still **_experimental_**.