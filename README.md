# Sarcastic Drawl - React Edition

This is a React application that creates a sarcastic drawl effect when displaying text. It's based on the C++ version but implemented as a web application.

## Features

- Simulates a sarcastic drawl by introducing variable timing delays when revealing text
- Uses a sarcastic color scheme with light aqua text on dark background
- Allows users to input their own phrases to display with a sarcastic drawl
- Responsive design that works on mobile and desktop

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## How It Works

The application uses React's state and effect hooks to create a typewriter-like effect with variable timing delays. Similar to the C++ version, it applies different delay patterns to:

- Vowels (for emphasis)
- Punctuation (for dramatic pauses)
- Spaces (for timing)
- Apostrophes (for extra emphasis)

The styling uses a dark theme with light aqua text (a stereotypically "sarcastic" color) for maximum sarcastic effect.

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
