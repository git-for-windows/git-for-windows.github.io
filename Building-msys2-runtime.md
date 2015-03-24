# Installing a build environment

1. Just install the [net-installer](https://github.com/git-for-windows/build-extra/releases).

# Build `msys2-⁠runtime`

1. Open the *Git for Windows SDK* *MSys* shell by double clicking `msys2_shell.bat` in the install folder. (i.e. not the *MinGW 32-bit* nor the *MinGW 64-bit* one).

2. Install the MSys2 Toolchain: `pacman -⁠S gcc binutils make`.

3. Clone the MSYS2-packages repository: `cd /usr/src && git clone https://github.com/git-for-windows/MSYS2-packages`.

4. Build the package: `makepkg -⁠s`.