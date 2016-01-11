If you want your passphrase to be 'remembered' for a session (or configurable timeout period) you will need to setup an ssh-agent process to handle this key.  

Recent versions of git for windows 2.x come with an ssh agent startup script and the installer also checks if an ssh agent is currently running and asks you to kill this process.

Run the ssh agent:

    start-ssh-agent.cmd

This should work both in a `cmd` and `bash` shell and can be included in `~/.profile` or `~/.bashrc`.

The [Github instructions](https://help.github.com/articles/working-with-ssh-key-passphrases/#auto-launching-ssh-agent-on-msysgit) are still valid but not needed anymore.