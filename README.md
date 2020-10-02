[![devDependency Status](https://david-dm.org/git-for-windows/git-for-windows.github.io/dev-status.png)](https://david-dm.org/git-for-windows/git-for-windows.github.io#info=devDependencies)

The Git for Windows homepage

https://gitforwindows.org/


## Developing

Note: if you have the cautious 'Use Git from Git Bash only' setting then you may need to change from bash to cmd at step 2, adjusting the cd path at step 3.

0. `git clone https://github.com/git-for-windows/git-for-windows.github.io.git` (this repo) 
1. Install [Node.js](https://nodejs.org/) (contains the 'npm' package manager)
2. Install Grunt: `npm install -g grunt-cli`
3. Install Node.js' dependencies: `cd git-for-windows.github.io && npm install`
4. Run `grunt` to generate the files
5. Run `grunt connect`
6. Open `http://localhost:4000` in your favorite browser to check the changes.
## Contribution
Feel free to contribute in this project.Suggest if any improvement needed.

