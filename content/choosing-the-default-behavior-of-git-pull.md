---
title: "Choosing the default behavior of `git pull`"
---
# Choosing the default behavior of `git pull`

## TL;DR

The `git pull` command offers different default behaviors. This guide clarifies the differences between these settings.
Essentially, this installer screen configures what happens when you type a plain `git pull` in your terminal. It sets a global preference so you don't have to manually type flags (like `--rebase`).

You can change your choice later with the [`git config`](#changing-your-choice-later) command.

## What does `git pull` actually do?

Behind the scenes, `git pull` is a two-step command. It first runs `git fetch` to download the latest commits from the remote, then it integrates those commits into your current branch. The three options on the installer screen only affect the second step.

### No divergence (Fast-Forward)

If you haven't made any local changes since your last pull, Git simply moves your branch pointer forward to match the remote. This is known as a fast-forward. **In a fast-forward scenario, all three installer options behave identically.**

**Before pull:**
```graphviz
digraph ff_before_local {
  rankdir="LR";
  bgcolor="transparent";
  margin="0"; pad="0.05";
  node [shape="circle", style="filled", fillcolor="#f0f0f0", color="#666666", fontname="sans-serif", width="0.4", fixedsize="true"];
  edge [color="#666666", penwidth="2"];

  A1 [label="A"]; B1 [label="B"]; C1 [label="C"];
  A1 -> B1 -> C1;

  node [shape="plaintext", style="", fillcolor="transparent", fontcolor="white", fontname="Courier", fontsize="14", fixedsize="false", width=""];
  local_lbl [label="(local)"];
  C1 -> local_lbl [style="invis"];
}
```

```graphviz
digraph ff_before_remote {
  rankdir="LR";
  bgcolor="transparent";
  margin="0"; pad="0.05";
  node [shape="circle", style="filled", fillcolor="#f0f0f0", color="#666666", fontname="sans-serif", width="0.4", fixedsize="true"];
  edge [color="#666666", penwidth="2"];

  A2 [label="A"]; B2 [label="B"]; C2 [label="C"]; D2 [label="D"]; E2 [label="E"];
  A2 -> B2 -> C2 -> D2 -> E2;

  node [shape="plaintext", style="", fillcolor="transparent", fontcolor="white", fontname="Courier", fontsize="14", fixedsize="false", width=""];
  remote_lbl [label="(remote)"];
  E2 -> remote_lbl [style="invis"];
}
```

**After `git pull` (fast-forwarded):**
```graphviz
digraph ff_after {
  rankdir="LR";
  bgcolor="transparent";
  margin="0"; pad="0.05";
  node [shape="circle", style="filled", fillcolor="#f0f0f0", color="#666666", fontname="sans-serif", width="0.4", fixedsize="true"];
  edge [color="#666666", penwidth="2"];

  A -> B -> C -> D -> E;
  
  node [shape="plaintext", style="", fillcolor="transparent", fontcolor="white", fontname="Courier", fontsize="14", fixedsize="false", width=""];
  sync_lbl [label="(local syncs with remote)"];
  E -> sync_lbl [style="invis"];
}
```

### Divergence

If you have made local changes but the remote repository has also been modified, then your histories have diverged. 

```graphviz
digraph divergence {
  rankdir="LR";
  bgcolor="transparent";
  margin="0"; pad="0.05";
  node [shape="circle", style="filled", fillcolor="#f0f0f0", color="#666666", fontname="sans-serif", width="0.4", fixedsize="true"];
  edge [color="#666666", penwidth="2"];

  A -> B;
  B -> X -> Y -> Z;
  B -> C -> D -> E;

  node [shape="plaintext", style="", fillcolor="transparent", fontcolor="white", fontname="Courier", fontsize="14", fixedsize="false", width=""];
  local_lbl [label="(local)"];
  remote_lbl [label="(remote)"];
  
  Z -> local_lbl [style="invis"];
  E -> remote_lbl [style="invis"];
}
``` 

## The three installer options

When histories diverge, a fast-forward is no longer possible. This is where the three installer options come into play.

### Option 1: Merge

* **Equivalent command: `git pull --no-rebase`**

Git automatically creates a new **merge commit** to combine branches. This preserves the exact timeline of parallel work.

```graphviz
digraph merge {
  rankdir="LR";
  bgcolor="transparent";
  margin="0"; pad="0.05";
  node [shape="circle", style="filled", fillcolor="#f0f0f0", color="#666666", fontname="sans-serif", width="0.4", fixedsize="true"];
  edge [color="#666666", penwidth="2"];

  A -> B;
  B -> X -> Y -> Z;
  B -> C -> D -> E;
  
  M [fillcolor="#d9ead3", color="#38761d"];
  
  Z -> M;
  E -> M;

  node [shape="plaintext", style="", fillcolor="transparent", fontcolor="white", fontname="Courier", fontsize="14", fixedsize="false", width=""];
  merge_lbl [label="(merge commit)"];
  M -> merge_lbl [style="invis"];
}
```

### Option 2: Rebase

* **Equivalent command: `git pull --rebase`**

Git temporarily sets your local commits aside, updates your branch to match the remote, and rewrites your commits on top of the remote branch, keeping a single linear timeline.

**Before pull:**
```graphviz
digraph divergence {
  rankdir="LR";
  bgcolor="transparent";
  margin="0"; pad="0.05";
  node [shape="circle", style="filled", fillcolor="#f0f0f0", color="#666666", fontname="sans-serif", width="0.4", fixedsize="true"];
  edge [color="#666666", penwidth="2"];

  A -> B;
  B -> X -> Y -> Z;
  B -> C -> D -> E;

  node [shape="plaintext", style="", fillcolor="transparent", fontcolor="white", fontname="Courier", fontsize="14", fixedsize="false", width=""];
  local_lbl [label="(local)"];
  remote_lbl [label="(remote)"];
  
  Z -> local_lbl [style="invis"];
  E -> remote_lbl [style="invis"];
}
```

**After `git pull --rebase`:**
```graphviz
digraph rebase_after {
  rankdir="LR";
  bgcolor="transparent";
  margin="0"; pad="0.05";
  node [shape="circle", style="filled", fillcolor="#f0f0f0", color="#666666", fontname="sans-serif", width="0.4", fixedsize="true"];
  edge [color="#666666", penwidth="2"];

  A -> B -> C -> D -> E;
  
  X_prime [label="X'"];
  Y_prime [label="Y'"];
  Z_prime [label="Z'"];
  
  E -> X_prime -> Y_prime -> Z_prime;

  node [style="dashed,filled", fillcolor="#f9f9f9", color="#cccccc", fontcolor="#999999"];
  edge [style="dashed", color="#cccccc", penwidth="1"];
  B -> X -> Y -> Z;
}
```

*Note: Rebasing changes the IDs (SHAs) of your local commits.*

### Option 3: Fast-forward only

* **Equivalent command: `git pull --ff-only`**

*This is the default behavior of `git pull`.*

Git will safely abort if a fast-forward is not possible, requiring you to manually choose how to combine branches.

## How to resolve conflicts

There are many ways to resolve conflicts:
- Directly in a command-line text editor.
- Using IDE extensions.
- Using graphical interfaces like GitHub Desktop.

For a detailed guide on managing conflicts in Git for Windows, see our dedicated page:
**[Merge Conflicts - Resolving and Remembering them](./merge-conflicts-resolving-and-remembering-them.html)**

## Changing your choice later

You can change this behavior at any time without reinstalling Git by running one of the following commands:

```sh
# Option 1: Merge
git config --global pull.rebase false

# Option 2: Rebase
git config --global pull.rebase true

# Option 3: Fast-forward only (Default)
git config --global pull.ff only
```

## Related resources

- [Mapping Between Git Installer GUI Settings and Command-Line Arguments](./mapping-between-git-installer-gui-settings-and-command-line-arguments.html)
- [Silent or Unattended Installation](./silent-or-unattended-installation.html)
- Official Git documentation: [`git-pull`](https://git-scm.com/docs/git-pull)
