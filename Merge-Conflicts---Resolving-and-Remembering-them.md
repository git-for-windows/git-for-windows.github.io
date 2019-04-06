Work in Progress as I try and work out how to do this (06-04-2019)..  

When building a new release for Git-for-Windows, the full range of Windows patches the maintainer applies need to be moved ([`rebase`](https://git-scm.com/docs/git-rebase)d) from being on top of the old upstream Git, to being on top of the new upstream release. 

There is a [process](https://github.com/git-for-windows/git/wiki/Rebasing-Git-for-Windows), a script and the support of the merging-rebase code, but still there maybe conflicts, old and new, especially if some of the Windows code has been adopted upstream in a different form.

This note looks at how to remember those resolutions, reuse them, and to learn from previous Git-for-Windows rebases.
The magic is in the [REuse REcorded REsolution (rerere)](https://git-scm.com/docs/git-rerere) command and it's underlying database.

The documentation is terse, so let's also point to some on-line articles:
* [Fun with rerere](https://gitster.livejournal.com/41795.html) from the Git maintainer
* [Fix conflicts only once with git rerere](https://medium.com/@porteneuve/fix-conflicts-only-once-with-git-rerere-7d116b2cec67) Nice graphs and examples.
* [Do you even rerere?](https://blog.theodo.fr/2015/01/do-you-even-rerere/) Good discussion, including `rerere-train`.
* [rerere-train.sh](https://github.com/git/git/blob/master/contrib/rerere-train.sh) use the 'blame' button for extra commit info.
* [Are there any downsides to enabling git rerere?](https://stackoverflow.com/q/5519244/717355) Not really, but read and learn.
* [Smarter rebase avoiding redundant work?](https://stackoverflow.com/q/10601541/717355) more rerere-train answers
* [7.9 Git Tools (book) - Rerere](https://git-scm.com/book/en/v2/Git-Tools-Rerere).

So, enable `rerere` - `git config --global rerere.enabled true`,  
consider setting `git config --global rerere.autoupdate true` and away you go!

Determine a previous Git-for-Windows merging-rebase end points and run the `contrib/rerere-train.sh`

Remember the parameters passed to rerere-train are `<rev-list-args>` (apparently) for selecting the training set.

### From the git List
Threads about the internal workings:  

[saving and replaying multiple variants with rerere](https://public-inbox.org/git/1442275050-30497-1-git-send-email-gitster@pobox.com/) 2015-09-14  
[Should rerere auto-update a merge resolution?](https://public-inbox.org/git/CACPiFCJH7RSb_rz6M6ADuGi0q+oeWYhE1fNMQC0EUcCn_kCJwg@mail.gmail.com/) 2017-08-23  
[rebase: use OPT_RERERE_AUTOUPDATE()](https://public-inbox.org/git/20190319190317.6632-4-phillip.wood123@gmail.com/#r) 2019-03-19  
[git/Documentation/technical/rerere.txt](https://github.com/git/git/blob/master/Documentation/technical/rerere.txt) committed on 5 Aug 2018  
[Make git-rerere a builtin](https://public-inbox.org/git/Pine.LNX.4.63.0612201738000.19693@wbgn013.biozentrum.uni-wuerzburg.de/) 2006-12-20 convert from a perl script    

