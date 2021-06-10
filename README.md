![fliqpay](./src/assets/images/logo.svg)

## Fliqpay Assessment

### About

This project is part of the interviewing process for a Frontend role at Fliqpay.

### Description

Project simulates the payout feature. A typical user enters an amount, specifies currencies, gets exchange
rates courtesy the [fixer API](https//fixer.io) and then proceeds to enter the recipient's information.

### Demo

A working demo can be found [here](https://fliqpay-tochi.netlify.app)

The fixer free plan only allows for one base currency and has a monthly limit of 250 API calls

### Doc

Read the docs [here](https://github.com/nwanguma/fpayassessment)

### Stack

- React
- TypeScript
- Tailwind

### Additional libraries/frameworks

- Jest
- React test library
- Lodash
- Axios

### Project description

This project was bootstrapped with [create-react-app](https://create-react-app.dev/docs/adding-typescript) and [tailwind](https://tailwindcss.com/docs/guides/create-react-app).

## Getting Started

### Prerequisites

To install this project you need the following:

1. yarn
   Assuming you have node & npm installed you need to run
   `npm install yarn -g`

2. A code editor

3. Please install the stylelint extension, the src already includes the stylelint module and config file. For more information on why this is neccessary please read this [issue](https://github.com/tailwindlabs/discuss/issues/111)

4. Sign up for a free API key on [fixer](https://fixer.io)

5. Create env variable with the format REACT_APP_FIXER_API_KEY=yourapikey

### Installation

1. Clone the repo
   `git clone https://github.com/nwanguma/fpayassessment.git`

2. Install packages
   `yarn install`

### Development

1. To start the dev server, run
   `yarn start`

This serves the project at [localhost](http://localhost:3000)

### Build

1. To get a production build, run
   `yarn build`

### Test

Test coverage is provided by [jest](https://jestjs.io/docs/tutorial-react) and [react testing library](https://testing-library.com/docs/react-testing-library/intro/).

1. To run tests
   `yarn test`

### Eject

_This is not recommended_

[Do not eject](https://medium.com/curated-by-versett/dont-eject-your-create-react-app-b123c5247741)

`yarn eject`

### Assumptions

I let the UI guide my work, I tried to make the app as real world as possible by adding input validation and type checking.

### Submission

This submission adheres to the requirements, I didn't manage to add e2e testing with Cypress because of time.

### Issues

None

### Constructive Feedback

I have none, this assessment is perfect.
