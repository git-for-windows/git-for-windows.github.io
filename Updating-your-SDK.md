Extract from the [Releases page](https://github.com/git-for-windows/build-extra/releases)[the segment about net-installer 1.0.0-rc-1]. Note the Caution parts! 

# The SDK 'net installer'

The SDK 'net installer' is a self-extracting archive containing a minimal
set of files needed to bootstrap an entire development environment to
compile and run Git for Windows.

When run as executable, it automatically runs `setup-git-sdk.bat` after
extracting the files. Users who prefer to unpack the archive manually
with 7-Zip need to run that batch file manually, too.

The files contained in the net installer are parts of MSys2's
'msys2-runtime', 'pacman' and 'gnupg' packages, carefully selected to
keep the size of the installer small yet still allowing to use the
Pacman package manager to initialize a full-fledged MSys2 environment
plus Git for Windows' packages.

The bootstrap script needs to force-install the packages because the net
installer comes without any package information and Pacman would
therefore refuse to overwrite the files from above-mentioned packages.

# To keep the development environment up-to-date

To keep the development environment up-to-date, developers need to run

	pacman -Syu

from time to time.

### Caution

There is one caveat, though: if this wants to update the msys2-runtime
itself, it is *highly* recommended to close all other MSys2 programs
(e.g. terminal windows, Bash sessions, etc) and update msys2-runtime
individually, immediately close the window (i.e. *not* run `exit`) and
then restart the update in a new window.

The reason: pacman itself is linked to the msys2-runtime, and updating
the runtime "in flight" results most often in heap corruption as far as
MSys2 is concerned. For the same reason, updates to Bash and Pacman
itself should be handled  in the same manner.

## Alternative Method

An alternative method is to start `git-cmd.exe` and run `pacman -Sy
<package>` for `msys2-runtime`, `bash` and `pacman` as needed, because
that ensures that no obsolete binary continues to be used after the
update.

## Origin of 'net installer' concept

The idea for the 'net installer' originated in the Git for Windows
project when it was still based on MSys 1.x. At that time, MSys 1.x did
not have a package manager, therefore the original net installer
(ab-)used Git as a package manager.

Since the new net installer no longer needs to ship with Git (instead
using Pacman to install the mingw-w64-git package that is current at the
time the net installer is launched), its versions are no longer tightly
coupled to the Git version.