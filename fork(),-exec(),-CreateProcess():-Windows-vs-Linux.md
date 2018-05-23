# tl ; dr

You need to make 2 calls to create new process in Linux: [`fork()`](http://man7.org/linux/man-pages/man2/fork.2.html) and then [`exec()`](http://man7.org/linux/man-pages/man3/exec.3.html). Windows has only one: [`CreateProcess()`](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682425(v=vs.85).aspx). Architecture differs so much, that's why it was so hard to implement `fork()` on Windows, and it still works dramatically slower. Please think twice before using `fork()` on Windows, and do not use `fork()` + `exec()`: you are doing tons of useless job, you have `CreateProcess()` for it.

## Before start

All information about Linux is a brief retelling of Robert Love's book: [Linux Kernel Development](https://doc.lagout.org/operating%20system%20/linux/Linux%20Kernel%20Development%2C%203rd%20Edition.pdf). 
I definitely recommend to read this book by yourself, especially if this article wasn't enough for you. I will oversimplify, otherwise I need to put whole book here.

# Process vs thread

In Windows, process is a container for threads, while thread is an executing instance of program with corresponding resources. Process can have any number of threads that you want. 0 threads is possible, but useless; many threads give an opportunity to make multithreading application. All threads in one process share same piece of memory and need to use synchronisation mechanisms.

In Linux, there is no difference between process and thread. They use virtual processor (it's exclusive for each process/thread) and virtual memory (it's shared). Virtual processor gives an illusion that every process/thread has its own real processor for all its needs, while in fact they use the processor by turns. Virtual memory also gives an illusion that process/thread has all available memory in the system (shared with other connected processes/threads), while in fact it's just a piece of memory for this group.

# Copy-on-write

COW is a general mechanism that allows avoiding copying while we do not need it. It's easier to explain this awesome mechanism with example from life. Imagine you have a great paper book, and your friends want to read it with you. Moreover, all of you want to make notes while reading. Naive solution is to make N full copies of the book for all readers, and then read each copy and make notes. But COW offers you to read the same book, and make the notes in your own notebook: you can copy little pieces if you want, but you don't need to make full copy. So, every reader owns the notebook, but you have only 1 book for all: it is enough. It allows to save time dramatically.

# Linux internals: fork(), exec()

`fork()` creates new process from existing one using COW. So, `fork()` makes a copy of the process, but you need to understand that there is almost no copying at all because of COW.

`exec()` puts the executable into new process and starts to execute it.

Is is super important moment: we do not only save time by COW; we save it in high-loaded moment. Everyone wants to start their new task immediately, without any waiting. Additionally, there is a big chance that we will never copy all this parent's stuff: it's a common scenario when we do not need it at all.

# Windows internals: why fork() does not work as native

Actually, we have enough information to guess the reason. 

At first, process on Windows and on Linux means different things: we need to create both process and at least one thread to start executing smth on Windows. COW can't be done without headache because of different ways of working with memory. We also have tons of other problems that are behind the scene for this article. 

In short, *All* programs linking to the [MSYS2 runtime](https://github.com/git-for-windows/git/wiki/The-difference-between-MINGW-and-MSYS2) essentially perform the check "was I just forked?" at startup. If that is the case, the regular code path is completely disabled and a special "fork mode" is spun up.

As a result, it really copies the entire address accessible space of the original process. It tries as best as it can to open the original file descriptors and sockets. It reinstates the current working directory (even if it does not exist anymore). And it does this and that, and that and this, and basically spends a whole lot of time that Linux' kernel would give the programs for free.

All of this was useless if you use `exec()` after it. You have `CreateProcess()` that was created as a part of Windows platform, and it is optimized to be fast enough.