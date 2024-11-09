# EdSpire

**EdSpire** is an innovative, score-based college search platform developed with object-oriented JavaScript. It enables students to explore and connect with thousands of peers for personalized college guidance and information exchange. With EdSpire, students can make informed decisions about their educational paths by comparing schools, programs, and scores and gaining insights from a community of like-minded individuals.

## Project Overview

EdSpire is designed to simplify the college search process by offering a unique scoring system that ranks colleges based on multiple factors. Students can interact with peers who share similar interests, experiences, and goals, allowing for a collaborative and informative college search journey.

## Getting Started

Follow these instructions to set up EdSpire on your local machine for development and testing.

### Prerequisites

To run EdSpire locally, you’ll need:

- **Node.js** and **npm** for managing dependencies
- **MongoDB** for database storage
- **Zsh** or any terminal for running commands

### Installing

#### To Start the Frontend:

1. Navigate to the frontend folder:

   ```bash
   cd ./frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:

   ```bash
   npm start
   ```

   The frontend will run on your localhost.

#### To Start the Backend:

1. Open a new terminal window or Zsh session.
2. Navigate to the backend folder:

   ```bash
   cd ./backend
   ```

3. Install backend dependencies:

   ```bash
   npm install
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will connect to the MongoDB database to store and retrieve data.

### Database Setup

EdSpire uses MongoDB as its database to store and manage information that supports the app’s core functionalities. This includes data on colleges, user scores, and peer interactions. For database access, please reach out to the repository owner.

## Features

1. **College Search with Score-Based Ranking**: Easily search for colleges and view their scores based on multiple criteria.
2. **Peer Connections**: Connect with other students, exchange insights, and get personalized guidance on college decisions.
3. **Data Storage and Management**: The backend uses MongoDB to manage and serve the data required for the app, making efficient API calls to provide users with relevant information.

## Running the Tests

Testing is essential to ensure that both frontend and backend functionalities work as expected. 

### Frontend Testing

You can add tests to validate UI components, user flows, and search functionality.

### Backend Testing

Test the backend API endpoints to ensure data is correctly stored, retrieved, and updated in the MongoDB database.

## Deployment

To deploy EdSpire, ensure you have set up MongoDB on a production server. You can deploy the frontend on platforms like **Vercel** or **Netlify** and the backend on **Heroku** or **AWS**.

## Built With

- **JavaScript** - Core language for frontend and backend
- **MongoDB** - Database for storing user and college information
- **Node.js & Express** - Backend server and API setup
- **React** - Frontend library for building UI components

## Contributing

Contributions are welcome! Please read `CONTRIBUTING.md` for guidelines on code of conduct and the process for submitting pull requests.

## Authors

- **Devansh Alok** - Initial work - [devanshalok](https://github.com/devanshalok)

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## Acknowledgments

- Inspiration from college guidance platforms.
- Special thanks to contributors and early users for valuable feedback.
- Support from the developer community in building the scoring system and optimizing data storage.
