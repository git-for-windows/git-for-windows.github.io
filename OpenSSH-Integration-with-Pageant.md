# OpenSSH Integration with Pageant

For some users, it may be desirable to tie OpenSSH in to the PuTTY authentication agent (Pageant). This allows you to leverage OpenSSH for remote repository access, which tends to be the most reliable choice within the specific context of Git for Windows (Git), while using a single keystore for your computer as a whole.

While the capability is not currently integrated into Git, it's straightforward to accomplish using [ssh\-pageant](https://github.com/cuviper/ssh-pageant). This is a drop-in replacement for ssh-agent, which simply builds a connection between OpenSSH and Pageant for key-based authentication.

## Limitations

Since Git bundles OpenSSH internally, and needs a msys2\-specific build of ssh\-pageant, you probably need to use Git Bash (rather than Git CMD) in order to make use of this functionality.

## Obtaining ssh\-pageant

### End User (non\-SDK) Git Installation

For a normal (non-SDK) installation of Git, the first step is to download the ssh-pageant package from either the [32\-bit](http://repo.msys2.org/msys/i686/) or [64\-bit](http://repo.msys2.org/msys/x86_64/) msys2 repository... be sure to match the bit-level of your Git software. The specific filename may vary, but should match the pattern of "ssh\-pageant\-git\-\*.pkg.tar.xz".

Once the file has been successfully downloaded, the next step is to decompress it. This can be done using *7z* from within Git Bash.

    7z e ssh-pageant-git-*.pkg.tar.xz

This should result in a second file with the same name, minus the ".xz" extension. We can now extract *ssh\-pageant.exe* using *tar*.

    tar xf ssh-pageant-git-*.pkg.tar --strip=2 usr/bin/ssh-pageant.exe

Finally, we need to copy the executable from the current directory to a location outside our Git installation, to ensure that it won't get clobbered during upgrades. Typically *$HOME/bin* is used for this purpose.

    mkdir $HOME/bin
    mv ssh-pageant.exe $HOME/bin/

### Git SDK Installation

Having the full SDK available simplifies the process, as you just need to run the following command to install the *ssh\-pageant* package.

    pacman -S ssh-pageant

## Starting ssh\-pageant Automatically

Now that the ssh\-pageant utility is present, it's a simple matter for Git Bash to start it automatically. Just create/edit your *$HOME/.bash_profile* (or *$HOME/.profile*, if you prefer), and add the following.

    # ssh-pageant allows use of the PuTTY authentication agent (Pageant)
    SSH_PAGEANT="$(PATH=/usr/bin:$HOME/bin command -v ssh-pageant)"
    if [ -z "$SSH_AUTH_SOCK" -a -x "$SSH_PAGEANT" ]; then
       eval $("$SSH_PAGEANT" -qra "${TEMP:-/tmp}/.ssh-pageant-$USERNAME")
    fi
    unset SSH_PAGEANT

The `-qra "${TEMP:-/tmp}/.ssh-pageant"` portion is equivalent to the `-q -r -a filename` options. In this context it means:

* **\-a filename** \-\- Bind to a specific socket file (creating it if necessary)
* **\-r** \-\- Allow reuse of an existing socket file
* **\-q** \-\- Quiet mode

By specifying the socket name along with the reuse option, we ensure that only a single running copy of ssh\-pageant is required. Otherwise a separate incarnation would be launched every time Git Bash gets invoked.

Now start a new Git Bash session, or source the profile edited just above, and run the `ssh-add -l` command. If all is well, and Pageant is running (with keys loaded), you should see something similar to the following.

    $ ssh-add -l
    4096 SHA256:XjN/glikgdBoBclg4EaN8sJ/ibrxTq7zVydpkUwANzk Heinz Doofenshmirtz (RSA)
