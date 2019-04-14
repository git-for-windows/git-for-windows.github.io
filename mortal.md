# Privileged remote app

This is a privileged app template that demonstrates the usage of [`XMLHttpRequest`](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest) and [`systemXHR`](https://developer.mozilla.org/Apps/Reference/Firefox_OS_device_APIs#systemXHR) to load remote content from a server, and includes a properly configured manifest file with the right app type (`privileged`) and required permissions, in order to use those APIs.

This is part of the [mortar](https://github.com/mozilla/mortar/) template collection for building [Open Web Apps](https://developer.mozilla.org/Apps).

## Obtaining

There are a few ways to get this template:

If you use [Git](http://www.git-scm.com/):

````bash
git clone https://github.com/mozilla/mortar-privileged-remote-app.git
````

Or download the latest version in this [ZIP file](https://github.com/mozilla/mortar-privileged-remote-app/archive/master.zip).


## Usage

Import the app into the [App Manager](https://developer.mozilla.org/Firefox_OS/Using_the_App_Manager). Then you can run it in the simulator, or in a Firefox OS device.

## Code walkthrough

The `manifest.webapp` file contains metadata about the app, such as its name, description, icon and required permissions for running under Firefox OS. Of particular interest for this app is the `systemXHR` permission, which is what enables us to load data from other domains, whether they have enabled CORS or not.

Moving over to `index.html`, this is the starting point for the app when it's launched, and also where the layout is defined and the JavaScript files with the functionality and logic are loaded.

The appearance is defined in `css/app.css`. There are just some very basic rules.

We define the app's behaviour in `js/app.js`. The most important aspect of this app is how we run XMLHttpRequests across domains without getting same-origin or CORS errors, thanks to the usage of the `mozSystem: true` attribute when instancing the XMLHTTPRequests. Be sure to have a look at the code to see where this happens.

Finally we are also including `js/libs/l10n.js`, which contains [L10n](https://developer.mozilla.org/en-US/docs/Web/API/L10n_API), a library for translating the strings in the app. Using this library, users can run the app in their own language, as long as you provide the translations for those languages. We're currently including a translation to Spanish as an example, but feel free to contribute with more translations in `data/locales.ini`, looking at `data/es.properties` and `data/en-US.properties` to see the syntax in action. The way it works, it will automatically translate the HTML elements that contain a `data-l10n-id` attribute with the translation identifier.

For any dynamically shown content, you need to use the `navigator.webL10n.get` function, but since that is slightly tedious to write each time, we're aliasing it to just `translate`:

```javascript
var translate = navigator.mozL10n.get;
```

## Getting help

If you find something that doesn't quite work as you'd expect, we'd appreciate if you [filed a bug](https://github.com/mozilla/mortar-privileged-remote-app/issues)!

We need your help in order to help you. Therefore:

1. Tell us which version of the template are you using. Where did you get the code from?
* Specify the environment where the bug occurs i.e. which version of the Simulator or Firefox OS device. An example would be `1.2 simulator` or `Boot2Gecko 1.4.0.0`. 
* Describe the problem in detail. What were you doing? What happened? What did you expect to happen?
* Probably also provide a test case so we can see what is happening and try to reproduce the error.

Ultimately it all boils down to the fact that if we can't reproduce it, we can't help you or fix it either.

## Contributing

Contributions are always welcome! If you want to collaborate, whether that is with a new feature or fixing a bug, we recommend you...

1. Have a look at the [issue tracker](https://github.com/mozilla/mortar-privileged-remote-app/issues) first--to make sure there isn't anyone working on that already.
* If it's a new issue/feature, or no one is working on it already, fork the project in GitHub (you'll need an account if you don't have it yet).
* Create the bug to let us know you want to work on this. That way we are aware of and can keep an eye on it, or maybe tell you that it is not a bug but an intended feature, and save you the hassle of working on something that is not needed.
* Clone your fork to your computer (i.e. get the code onto your computer)
* Make a new branch, and switch to that new branch
* Do the changes you deem necessary
* Push the branch to GitHub
* Send a pull request

To make your changes as easy to merge back onto the project as possible, you should only work on one feature per branch. That makes code review simpler and faster!
