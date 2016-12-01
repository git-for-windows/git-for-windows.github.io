Please note: this page describes how to compile Git's source code in Visual Studio 2010 or later.

# Checking out `vs/master`

Git's source code (and hence also Git for Windows' source code) is [usually built using GNU C and GNU Make in a Git for Windows SDK](https://github.com/git-for-windows/git/wiki/Building-Git).

However, as of Git for Windows v2.11.0, a much more convenient way is available: by cloning https://github.com/git-for-windows/git and checking out the `vs/master` branch, you will automatically have project definitions ready to go with Visual Studio.

Simply open the `git.sln` file and build the solution.

# Running the tests

When building Git in Visual Studio, you do not actually need a full-blown Git for Windows SDK. Simply install Git for Windows, make sure that the entire solution was built, open a Git Bash and run the tests in the `t/` subdirectory.

## Running an individual test

To test, say, the interactive rebase functionality, simply run the appropriate test (the file names are pretty self-explanatory):

```sh
sh t3404-rebase-interactive.sh
```

If you need much more verbose output, e.g. when a test is failing, use the `-i -v -x` options:

```bash
bash t3404-rebase-interactive.sh -i -v -x
```

## Running the entire test suite

You can use the `prove` tool (which *mostly* works reliably, sometimes you will see that a test exited "dubiously" but running it again individually would not show any signs of failure...):

```sh
prove --timer --jobs 15 ./t[0-9]*.sh
```