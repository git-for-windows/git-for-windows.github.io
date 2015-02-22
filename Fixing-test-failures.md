# Running tests

Git's source code ships with a lot of [regression tests](http://en.wikipedia.org/wiki/Regression_testing). This gives us a pretty good indicator of the source code's health: if a regression test starts failing for a topic branch, it is safe to assume that there is some "room for improvement" in the changes introduced by said topic branch.

It is a good practice to add a regression test when fixing bugs. Such a test not only illustrates what is going wrong (and lets other developers verify that there is indeed a bug that needs fixing), it also ensures that it is much harder to re-introduce that bug by mistake in the future: the regression tests would sound an alarm.

## Running the complete test suite

Git's test suite can be run in various ways:

- by running `make test` in the directory where Git's sources were checked out (`/usr/src/git/` by default)
- by running `make` in the `t/` subdirectory of `/usr/src/git/`
- using Perl's `prove` test runner, by running `make prove` in the `t/` subdirectory of `/usr/src/git/`

It can take quite a while to run the test suite. To help, Git allows to run those tests in parallel, e.g. by passing the `-j` flag to `make`: `make -j5` would run up to five tests in parallel.

# Running individual tests

When some tests fail, it is best to run them individually. This can be done using `make`, of course, a much better way is to run them via `sh`, though, allowing for more fine-grained control:

- `sh t0001-*.sh -i` will run *t0001* and stop at the first failing test (as opposed to the default, to continue running the rest of the tests in the *t0001* test suite)
- `sh t0001-*.sh -v` will show the output of the programs called by the tests
- `sh t0001-*.sh -d` will keep the temporary directory in which the test was run, `trash directory.t0001-init/` (this is useful when comparing the output of tests between Git versions when the tests fail for one Git version but succeed for another).
- `sh -x t0001-*.sh` will print out the command-line of the programs before they are executed

These options can be combined, too.

## Further debugging techniques

### Piping the output to a file

Often there will be a ton of output and not all of that output is relevant to investigate test failures. In those cases, it makes sense to redirect the output to a file:

```bash
sh -x t0001-*.sh -i -v 2>&1 | tee log.out
```

Alternatively, the output can be redirected to a pager:

```bash
sh -x t0001-*.sh -i -v 2>&1 | less
```

To enable a quicker round-trip for running tests when running them repeatedly (typically changing the code a tad after each iteration), you can ask the `less` pager to fake key-presses just after starting. For example, the following command-line will always search for the first occurrence of the characters "ERROR:" in the output:

```bash
sh -x t0001-*.sh -i -v 2>&1 | less +/ERROR:
```

### `set -x`

The statement `set -x` in a shell script will turn on the execution trace (see the explanation of the `sh -x ...` invocation above), and `set +x` will turn it off. This is not only useful for adding debug output to the regression tests; It is also useful in the parts of Git that are still implemented as shell scripts (such as `git submodule`).

For even more sophisticated debugging, the `set -x` statement can be triggered conditionally. The following example would turn on execution tracing only when the current commit name starts with *cafebabe*:

```bash
case "$(git rev-parse HEAD 2> /dev/null)" in cafebabe*) set -x;; esac
```

### Tracing execution in Perl scripts

Some parts of Git are implemented as Perl scripts. To trigger execution tracing similar to Bash's `set -x` statement, you can add the `-d:Trace` parameter to the shebang line (i.e. to the first line of the Perl script, which reads "#!/usr/bin/perl"). This requires the `Devel::Trace` Perl package to be installed, e.g. by calling `perl -MCPAN -e 'install Devel::Trace'` once.