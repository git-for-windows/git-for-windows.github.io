To make an installer, install the [SDK](https://git-for-windows.github.io/#download-sdk), run it and then issue the following commands:

```bash
cd /usr/src/build-extra
git fetch
git checkout master
./portable/release.sh <version>-test
```

where `<version>` is the Git version.