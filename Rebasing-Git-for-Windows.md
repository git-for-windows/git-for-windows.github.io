To do a *rebase* of the *Git for Windows* source onto a new [upstream](https://github.com/git/git) *Git* release, follow this guideline.

# Assumptions
1. You want to *rebase* onto a new [upstream](https://github.com/git/git) release tagged as `v2.3.4`
2. The latest *rebase* was done onto a [upstream](https://github.com/git/git) release tagged as `v2.3.3`

# Preconditions
1. A working [Git for Windows SDK](https://gitforwindows.org/#download-sdk).
2. A fetched build-extra repository.  
    `cd /usr/src/build-extra`  
    `git fetch`  
    `git checkout master`
    (`git pull` if your branch is behind the upstream)
3. Working directory set to current *Git for Windows* source.  
    `cd /usr/src/git`
4. Added [upstream](https://github.com/git/git) as a remote.  
    `git remote add git https://github.com/git/git`  
    `git fetch git`

# Starting the *rebase*
1. Find the commit of the last *rebase* and remember it.  
    `BASE="$(git rev-parse ":/Start the merging-rebase")"`
2. Run the `shears.sh` script to build up the actual *rebase* script.  
    `../build-extra/./shears.sh --merging --onto v2.3.4 $BASE`  
    Note: `v2.3.4` is a `tag` in the remote `git`.
    See the script if you are testing changes initiated in a local branch of the git upstream.
3. The *rebase* should start automatically and occasionally stop if it hits any merge conflicts. Resolve those conflicts and then continue the rebase.  
    `git rebase --continue`

# Verifying the *rebase*
1. Generate a *diff* of the previous state.  
    `git diff v2.3.3..origin/master > prev.diff`
2. Generate a *diff* of the current state.  
    `git diff v2.3.4..master > curr.diff`
3. *Diff* the *diffs*.  
    `git diff --no-index prev.diff curr.diff`

    >Ideally, the resulting output will show changes only in the `@@` lines of `prev.diff` vs `curr.diff`.  
    >It's a bit hard to read, though, because it is a diff of a diff.  
    >So meta.  
    >When there is a line that starts with a `-` or a `+` but then continues with a space, that's good!  
    >It means that the context of our changes changed.
