# Posts

Frontend Angular application to display posts.

## How to run project locally
Prerequisites: Please install NodeJS (`https://nodejs.org/en/download`) and Angular CLI (please open a terminal and run: npm i @angular/cli)
Please open a terminal in the same folder as the repo and run the following commands:
1. npm i (only run this after cloning the repo or when a new library is added or updated)
2. ng serve (alternatively run: npm run start)
Once the server is running, open your browser and navigate to `http://localhost:4200/` (if the port is taken then enter the url provided in terminal into a browser). The application will automatically reload whenever you modify any of the source files.

## How to build project locally

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## How to run unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```