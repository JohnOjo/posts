# Posts

Frontend Angular application to display posts.
App is hosted and accessible through this link: `https://johnojo.github.io/posts`

## How to run project locally

Prerequisites: Please install NodeJS (`https://nodejs.org/en/download`), Angular CLI (please open a terminal and run: npm i @angular/cli) and Git (`https://git-scm.com/downloads`)
Please open a terminal in the same folder as the repo and run the following commands:

1. git clone [repository_url]
2. cd [project_directory]
3. npm i (only run this after cloning the repo or when a new library is added or updated)
4. ng serve (alternatively run: npm run start)
   Once the server is running, open your browser and navigate to `http://localhost:4200/` (if the port is taken then enter the url provided in terminal into a browser). The application will automatically reload whenever you modify any of the source files.

## Architecture choices

1. I used the @if, @for and @switch declaritive control flow instead on *ngIf, *ngFor and \*ngSwitch as it is more efficient as angular compiles them statically, it makes use for block level rendering which reduces unnecessary DOM updates and elimates unnecessary change detection cycles.
2. Additonally I used @for instead of \*ngFor as it is faster due to it using block memoization (function caching).
3. I used "track" in the @for loops in the HTML template improve performance and avoid unnecessary re-renders.
4. I went with standalone components over modules, to simplify code as it is more portable, reusable and improves the separation of concers.
5. I used ReadonlyArray to create immutable arrays to prevent accidental changes to data.
6. I used providedIn: 'root' with the @Injectable() to avoid duplicate services being created.
7. I used retry() on the api call to add robostness to the application in case of network faliures or other errors.
8. Setup CI/CD pipeline to run unit tests and deploy app to prevent bugs (in /.github/workflows folder)

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

(alternatively run: npm run test)

## Running end-to-end tests

Prerequisites: Please open a terminal and run: npx playwright install
For end-to-end (e2e) testing, run:

```bash
ng e2e
```

## Troubleshooting/Issues
"Module not found" error: Run npm install to install missing dependencies.
"Port 4200 already in use" error: Change the port using ng serve --port [port_number].