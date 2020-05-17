# Welcome to Provider Map!
### Our goal is to create a platform to help people find locations (facilities) to take care of their health during this troubled times. To do so we source data from public & private sources as well as via input from people in the medical field through the platform.

## Technologies
Provider Map's current tech stack is lean and we look to keep it this way in order to allow contributors to more easily understand and contribute to the project.

The application is a ReactJS based application (Redux coming soon, haven't had a need for it yet) bundled with Webpack.

This project leverages the @airbnb/lunar UI toolkit and an internal UI toolkit for creating components and building the user interface. For reference, please see Lunar's [storybook](https://airbnb.io/lunar/?path=/story/core-autocomplete--disable-selected-items-with-is-item-selectable) and [github](https://github.com/airbnb/lunar) pages.

For styling, [styled-components](https://styled-components.com/) is the weapon of choice. For forms, [react-hook-form](https://react-hook-form.com/) has worked well due to its simplicity.

For the backend, Provider Map uses Firebase's serverless infrastructure and the Firestore NoSQL DB to store information about the facilities. Due to the time sensitivity of the project and the outbreak, Firebase is used for storage, analytics and hosting. With time, this approach can be revaluated.


## Contributing
If you are looking to contribute, please see the [Issues](https://github.com/providermap/provider-map-client/issues) tab for current open issues to find one that is not being worked on or one that interests you. If you have any questions, feel free to reach out to any of the contributors.

Any development task will have to go through peer-review as a Pull Request to the Develop branch.

## Running the project
Firstly, you will need the .env file from one of the contributors in order to connect to the ProviderMap firebase account.

Before anything, please install the dependencies of the project.

``$ npm install``

Then in the project directory, you can run:

``$ npm run dev``

This runs the app in the development mode.<br />
Open [http://localhost:80](http://localhost:80) to view it in the browser.

The page will reload if you make edits thanks to the `react-hot-reloader`. You will also see any lint errors in the console thanks to `eslint`. (See `.eslintrc.js` for the rules)


## Building the project

``$ npm run build``

Builds the app in development mode to the `public` folder.<br />
It correctly bundles React with the development webpack with source-maps. Dev-friendly bundle :)


``$ npm run build-prod``

Builds the app in production mode to the `public` folder.<br />
It correctly bundles React with the production webpack and optimizes the build for the best performance. The app is ready to be deployed!

## Docker (Unused due to Firebase Hosting)
``docker build --tag provider-map-client .``

This command builds the app in production mode (see `Dockerfile`) and adds a tag to the docker build for use.

``docker run -p 8000:80 provider-map-client``

This command runs the application's production build in the docker container and expose port 80.
Open [http://localhost:80](http://localhost:80) to view it in the browser.