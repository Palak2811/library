import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-title">About This Project</div>
      <div>Created by - Palak Mathur</div>
      <div>Contact - palakmathur2811@gmail.com</div>
      <div>
        Developed and deployed a full-stack Online Library Web Application using React (Vite) on the frontend and Express.js on the backend. Leveraged the Project Gutenberg API (Gutendex) to fetch and display public domain books with real-time search functionality. Implemented a persistent book review system, allowing users to read or edit reviews for individual books. Reviews are stored in server-side using Node.js.
        The application features a clean, library-themed interface styled with custom CSS and includes responsive design elements. Frontend and backend are connected through RESTful APIs with CORS support for seamless integration. The project is structured with proper React Router setup for smooth page navigation and is deployed to platforms like Vercel and Render.
      </div>
      <div className="skills">
        <strong>Skills Used:</strong> React.js (with Vite), JSX, Node.js, Express.js, API Integration, CSS, npm, React Hooks, React Router DOM, File System, Local Server, Browser DevTools
      </div>
    </div>
  );
};

export default About;
