# React Lotto

## Purpose

Implemented a simple lotto client app specification someone gave me with react. Pretty pointless app.

## Assumptions

What happens to the pot is not clearly specified in the problem.

I'll assume that whatever is left in the pot from the previous draw remains and that the entirety of the paid ticket price is added to the pot (ie, the lotto is a non-profit with no operational cost).

Also, dollar amounts awarded will be truncated down.

## Folder Layout

* gruntfile.js: File containing the tasks used to prepare the application for distribution.
* package.json: File containing a list of installable depdencies as well as shorthand commands that allows the use to test and package using solely locally installed depencies
* lib: Folder containing gui-independant models the app uses
* test: Folder containing tests to verify the proper functionality of the gui-independant models
* doc: Documentation for the app. If you're reading this, you know this already.
* app: Folder containg gui-dependent aspects of the app as well as the final packaged application
 * less: Folder containing the less files that will be compiled into a single app.css file for the application
 * javascript: Folder containing the jsx files that will be compiled into a single app.min.js file for the application
 * html: Folder containing the application's entrypoint html file. This file is simply copied to the distribution directory and not otherwise manipulated.
 * font: Folder containing the custom fonts for the application. Font folders in this directory are simply copied to the distribution directory, but not manipulated.
 * dist: This is the distribution directory containing the index.html file that can be executed in a browser. It doesn't exist until the application is first packaged.
