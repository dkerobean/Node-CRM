ClientConnect CRM - Backend (Node.js)
Overview
Welcome to the ClientConnect CRM backend! This is the server-side component of a full-stack customer relationship management (CRM) application. It is built using Node.js and Express.js to handle API requests, authentication, ticket management, real-time communication, and more.

Key Features
User Authentication: Role-based access (Admin, Agent, Customer) using JWT.
Ticket Management: Create, update, and track the status of customer tickets (Open, In Progress, Closed).
Real-Time Chat: Powered by Socket.io for live messaging between users.
File Uploads: Manage file attachments using AWS S3.
Notifications: Email and SMS notifications via SendGrid/Twilio.
RESTful API: Handles all operations with secure and structured endpoints.
Tech Stack
Node.js & Express.js: Backend framework and server.
MongoDB: Database for storing user and ticket data.
Socket.io: Real-time communication for chat.
AWS S3: For file storage and attachments.
SendGrid/Twilio: For email and SMS notifications.