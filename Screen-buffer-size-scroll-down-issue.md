The cursor does not set the bottom of the terminal window (like in OSX or Linux), I can scroll down "infinitely" (the height of the screen buffer size) and use the mouse to click and drag any space below the cursor. This causes extra time looking for the cursor if I need to scroll up long rows of commands and their results, then need to scroll down.

![gitbash window](https://i.stack.imgur.com/9Tdrs.png)

In OSX or Linux, you cannot scroll down past the cursor. There's no good reasons to leave empty spaces under the cursor. I've tried editing Screen Buffer Size but it will just resize the whole window, then I cannot scroll up past the height of the screen buffer size.

I'm using Windows 10 Home. git version 2.13.2.windows.1

