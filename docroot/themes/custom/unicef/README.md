# UNICEF sub-theme

## Prerequisites

The project use [Node](https://nodejs.org) to process development tasks, [npm](https://www.npmjs.com/) to manage dependencies and [gulp.js](http://gulpjs.com/) to process and compile files.


## Installing
### Using npm
* Download the project or execute `git clone` in this repository;
* Run the following commands: `cd path/installation && npm install`

### PatternLab

* In order to compile pattern-lab files, you need to go into pattern-lab folder and run this command:

`composer install`

After that, dependencies will be downloaded and a public folder will be created inside pattern-lab folder.

### Dependencies

Go to unicef theme folder, and run this command to download dependencies:

`npm install`

### Build

To generate compiled files, run this command:

`npm start` for DEV or;
`npm run build` for PROD;

## Running project

Then in your browser you should open an url [http://localhost:8080] in order to see PatternLab page, or you should access [http://local.unicefplatform.com] to see your project at Drupal.

The final files will be available in folder **assets/dist**, at the root directory.

The PatternLab files will be available in folder **pattern-lab/public**.
---

## Libraries used in this project
#### Last Update - 30/03/2017
