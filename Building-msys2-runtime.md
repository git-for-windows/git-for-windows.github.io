# Installing a build environment

1. Just install the [net-installer](https://git-for-windows.github.io/#download-sdk).

# Build `msys2-⁠runtime`

1. Open the *Git for Windows SDK* *MSys* shell by double clicking `msys2_shell.bat` in the install folder. (i.e. not the *MinGW 32-bit* nor the *MinGW 64-bit* one).

2. Install the MSys2 Toolchain: `pacman -⁠S base-devel`.

3. Clone the MSYS2-packages repository: `cd /usr/src && git clone https://github.com/git-for-windows/MSYS2-packages`.

4. Change to the `msys2-runtime` directory: `cd MSYS2-packages/msys2-runtime`

4. Build the package: `makepkg -⁠s`.