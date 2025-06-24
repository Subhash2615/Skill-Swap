# Skill Swap

Skill Swap is a MERN stack web application that allows users to connect, exchange skills, and schedule appointments for learning or collaboration. Users can manage connections, set up meetings (including recurring ones), and keep track of their appointments—all in a modern, user-friendly interface.

---

## Features

- **User Registration & Authentication**
- **Skill Matching:** Find users to teach or learn new skills.
- **Connections:** Send, accept, or reject connection requests.
- **Connections List:** View all users you are connected with.
- **Appointments:** Schedule meetings with connections, including support for recurring meetings and status updates.
- **Responsive UI:** Modern, accessible, and mobile-friendly design using Tailwind CSS and React.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT-based
- **Other:** Axios, ESLint, PostCSS

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Subhash2615/Skill-Swap.git
   cd Skill-Swap
   ```

2. **Install dependencies:**

   ```bash
   # For backend
   cd server
   npm install

   # For frontend
   cd ../client
   npm install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` in the `server` folder and fill in your MongoDB URI and JWT secret.

4. **Run the app:**

   ```bash
   # Start backend
   cd server
   npm start

   # Start frontend (in a new terminal)
   cd ../client
   npm run dev
   ```

5. **Visit:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000)

---

## Usage

- Register and log in.
- Add your skills to teach and learn.
- Browse matches and send connection requests.
- Accept or reject incoming requests.
- View your connections and schedule appointments.
- Manage and view all your appointments.

---

## Screenshots

_(Add screenshots of your app here!)_

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Contact

For questions or feedback, open an issue or contact [Subhash2615](https://github.com/Subhash2615).
