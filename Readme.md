# HR Performance Review App

## Overview

The HR Performance Review App is a comprehensive solution designed to streamline the performance review process within organizations. Built with React-Admin and Firebase Cloud Functions, this application facilitates the management of employee reviews, competencies, and feedback in a user-friendly manner.

## Features

- **Employee Management**: Easily manage employee information including job titles, managers, and emails.
- **Review Management**: Conduct and manage performance reviews, track status, and view past reviews.
- **Competency Tracking**: Define and manage key competencies for each role, allowing for targeted feedback and development.
- **Feedback Mechanism**: Facilitate the provision of feedback from managers and HR, including approval workflows.

## Getting Started

### Prerequisites

- Node.js
- Yarn
- A Firebase project for backend services

### Installation

1. Clone the repository:
```bash
git clone https://github.com/steinarkarlsson/askja.git
```

1. Navigate to the project directory:
```bash
cd askja
```
2. Install dependencies:
```bash
yarn install
```

3. Set up your Firebase configuration in .env file:
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```
4. Start the development server:
```bash
yarn start
```


## Testing firebase rules

Ensure that the Firestore emulator is running before running the tests.

From the project root run:
```bash
FIRESTORE_EMULATOR_HOST="127.0.0.1:8080" yarn run test
```

## Deployment
Refer to the React-Admin documentation for instructions on deploying the application to a production environment.


## Cloud Functions
To manually trigger a cloud function such as CreateReviews, you can use the Firebase CLI:

```bash
yarn start:shell
```

Then run the function with the following command:

```bash
createReviews()
```
