# Saga Frontend

## Overview

This is a simple user interface for an [application](https://github.com/SofieDunt/saga) that allows users to play and create interactive stories. A demo is hosted using Github pages at https://sofiedunt.github.io/saga-frontend/. Built off of the [demo branch](https://github.com/SofieDunt/saga-frontend/tree/demo), it is not connected to the backend and is intended to demonstrate layout and user flow rather than functionality.

To run the full application, follow the setup for this repository and https://github.com/SofieDunt/saga, then run both.

## Setup
Download or clone this repository and run `npm install` to install all dependencies.

## Code Walkthrough

Inside the source folder, there are four directories:

- **client** contains all functions and types relevant to interacting with the backend
- **forms** contains all forms through which users can submit information via the client
- **components** contains reusable components used to build the pages and may contain forms
- **pages** contains each page, which are composed of components and forms

Other notable files:

- `App.tsx` renders each page at its respective route
- `themes.ts` contains colors and styles used throughout the front en

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
