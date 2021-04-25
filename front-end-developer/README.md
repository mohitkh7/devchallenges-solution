# FrontEndDeveloper

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4. This project uses monorepo approach and consist multiple sub-projects within same anglar project workspace.

## Development server

Run `ng serve --project={project-name}` for a dev server. Navigate to `http://localhost:4200/front-end-developer/{project-name}`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate application {project-name}` to generate a new project. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Once the project is generated its configurations will be added in `angular.json`. Add following properties to `projects > build > options` in genrated configuration:
```
    "outputPath": "../public/front-end-developer/{project-name}",
    "baseHref": "/front-end-developer/{project-name}/",
```

## Build

Run `ng build --prod --project={project-name}` to build a particular project. The build artifacts will be stored in the `../public/front-end-developer/{project-name}` directory.

## Running unit tests

Run `ng test --project={project-name}` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

