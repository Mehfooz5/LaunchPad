LaunchPad 🚀

A MERN-based platform where startups pitch their products/services and investors discover opportunities to fund them. Inspired by Shark Tank, reimagined as a social networking experience.

📌 Features

Startup Profiles – Founders can create detailed product/service pages.

Investor Dashboard – Investors can browse startups and commit funding.

Pitch System – Startups can post pitches with videos, images, and descriptions.

Social Features – Like, comment, and follow startups or investors.

Secure Authentication – User login/signup with JWT-based authentication.

Real-time Updates – Live notifications for pitches, comments, and investments.

🛠️ Tech Stack

Frontend: React, Redux, TailwindCSS / Bootstrap
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Authentication: JWT + bcrypt
Other Tools: Cloudinary (media uploads), Socket.IO (real-time)

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/Mehfooz5/launchpad.git
cd launchpad

2️⃣ Install Dependencies

For backend:

cd backend
npm install


For frontend:

cd frontend
npm install

3️⃣ Setup Environment Variables

Create .env file in server/ with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url

4️⃣ Run the App

Backend:

npm run dev


Frontend:

npm start


Visit http://localhost:5173
 🚀
