# Music Website

This is a simple music website that allows users to add new songs and view a list of all the added songs. The website features an "Add Song" page where users can input song details such as title, artist, album (optional), and genre, and a "List Songs" page to view all the songs added.

## Features
- **Add Song Page**: A form where users can input song details (title, artist, album, genre).
- **List Songs Page**: Displays a table of all added songs, including their title, artist, album (if provided), and genre.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Setup Instructions

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

### 1. Clone the repository
Clone this repository to your local machine using the following command:

```git clone https://github.com/yourusername/music-website.git```

### 2.  Install dependencies
- Navigate into the project directory and install the necessary dependencies:
```
cd MusicDB
npm install
```
### 3. Set up the Database
- Log in to your MySQL server and create a database:
```
CREATE DATABASE music_db;
```
- Use the following SQL query to create the songs table:
```
USE music_db;
```
- Update the database connection settings in the backend code (server.js or a .env file if using one). Replace placeholders with your MySQL credentials:
```
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'music_db',
});
```
### 4. Run the Backend Server
- Start the backend server using:
```
node server.js
```
This will run the backend server at http://localhost:8080.
