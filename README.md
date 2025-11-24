## 🖼️ Screenshots

<details>
<summary>🏠 Home Page</summary>
<br>
<img src="https://github.com/Shreyansh0843/prescripto/blob/main/prescripto-image/image1.png" alt="Home Page" width="100%"/>
</details>

<details>
<summary>📅 Appointment Booking</summary>
<br>
<img src="https://github.com/Shreyansh0843/prescripto/blob/main/prescripto-image/image2.png" alt="Appointment Booking" width="100%"/>
</details>

<details>
<summary>👤 About Us Page</summary>
<br>
<img src="https://github.com/Shreyansh0843/prescripto/blob/main/prescripto-image/image3.png" alt="Admin Dashboard" width="100%"/>
</details>

<details>
<summary>👨‍⚕️ Appointments Booked</summary>
<br>
<img src="https://github.com/Shreyansh0843/prescripto/blob/main/prescripto-image/image4.png" alt="Doctor Portal" width="100%"/>
</details>

<details>
<summary>👤 Admin Dashboard</summary>
<br>
<img src="https://github.com/Shreyansh0843/prescripto/blob/main/prescripto-image/image5.png" alt="User Profile" width="100%"/>
</details>

<h1 align="center">
  PRESCRIPTO
</h1>



# 🏥 Doctor Appointment Booking System

A comprehensive full-stack healthcare appointment management platform built with the MERN stack, enabling seamless interaction between patients, doctors, and administrators.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 👤 Patient Portal
- **User Authentication**: Secure registration and login with JWT tokens
- **Doctor Discovery**: Browse doctors by specialty with detailed profiles
- **Appointment Booking**: Select available time slots with real-time availability
- **Payment Integration**: Secure online payments via Razorpay
- **Appointment Management**: View, track, and cancel appointments
- **Profile Management**: Update personal information and upload profile pictures

### 👨‍⚕️ Doctor Portal
- **Secure Login**: Dedicated authentication system for healthcare providers
- **Appointment Dashboard**: View and manage all assigned appointments
- **Appointment Actions**: Mark appointments as completed or cancel when necessary
- **Profile Control**: Update consultation fees, address, and availability status
- **Earnings Tracking**: Real-time dashboard displaying earnings and appointment statistics
- **Patient Information**: Access patient details including age calculation and contact info

### 🔐 Admin Panel
- **Doctor Management**: Add new doctors with complete profile information
- **Availability Control**: Toggle doctor availability status
- **Appointment Oversight**: View and manage all system appointments
- **Analytics Dashboard**: Track total doctors, appointments, and patients
- **Latest Bookings**: Monitor recent appointment activities
- **System Administration**: Cancel appointments and manage platform operations

## 🛠️ Tech Stack

### Frontend
- **React.js**: Component-based UI development
- **React Router**: Client-side routing
- **Context API**: Global state management
- **CSS3**: Custom styling with responsive design
- **Axios**: HTTP client for API requests
- **React Toastify**: User notifications

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Token-based authentication
- **Bcrypt**: Password hashing

### Third-Party Services
- **Cloudinary**: Image upload and storage
- **Razorpay**: Payment gateway integration
- **MongoDB Atlas**: Cloud database hosting

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Razorpay account

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/prescripto.git
cd prescripto
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Install Admin Panel Dependencies**
```bash
cd ../admin
npm install
```

5. **Configure Environment Variables** (see below)

6. **Start the Application**

Backend:
```bash
cd backend
npm run server
```

Frontend:
```bash
cd frontend
npm run dev
```

Admin Panel:
```bash
cd admin
npm run dev
```

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Admin Panel (.env)
```env
VITE_BACKEND_URL=http://localhost:4000
```

## 📚 API Documentation

### Authentication Endpoints

#### User Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/user/register` | Register new user | No |
| POST | `/api/user/login` | User login | No |
| GET | `/api/user/get-profile` | Get user profile | Yes |
| POST | `/api/user/update-profile` | Update user profile | Yes |
| POST | `/api/user/book-appointment` | Book appointment | Yes |
| GET | `/api/user/appointments` | Get user appointments | Yes |
| POST | `/api/user/cancel-appointment` | Cancel appointment | Yes |
| POST | `/api/user/payment-razorpay` | Initialize payment | Yes |
| POST | `/api/user/verify-razorpay` | Verify payment | Yes |

#### Doctor Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/doctor/login` | Doctor login | No |
| GET | `/api/doctor/appointments` | Get doctor appointments | Yes (Doctor) |
| POST | `/api/doctor/complete-appointment` | Mark appointment complete | Yes (Doctor) |
| POST | `/api/doctor/cancel-appointment` | Cancel appointment | Yes (Doctor) |
| GET | `/api/doctor/dashboard` | Get dashboard data | Yes (Doctor) |
| GET | `/api/doctor/profile` | Get doctor profile | Yes (Doctor) |
| POST | `/api/doctor/update-profile` | Update doctor profile | Yes (Doctor) |

#### Admin Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/add-doctor` | Add new doctor | Yes (Admin) |
| POST | `/api/admin/login` | Admin login | No |
| GET | `/api/admin/all-doctors` | Get all doctors | Yes (Admin) |
| POST | `/api/admin/change-availability` | Toggle doctor availability | Yes (Admin) |
| GET | `/api/admin/appointments` | Get all appointments | Yes (Admin) |
| POST | `/api/admin/cancel-appointment` | Cancel appointment | Yes (Admin) |
| GET | `/api/admin/dashboard` | Get dashboard statistics | Yes (Admin) |

#### Public Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/doctor/list` | Get all available doctors | No |

## 📁 Project Structure

```
doctor-appointment-booking/
│
├── backend/
│   ├── config/
│   │   ├── mongodb.js          # Database connection
│   │   └── cloudinary.js       # Cloudinary configuration
│   ├── controllers/
│   │   ├── adminController.js  # Admin logic
│   │   ├── doctorController.js # Doctor logic
│   │   └── userController.js   # User logic
│   ├── middleware/
│   │   ├── authAdmin.js        # Admin authentication
│   │   ├── authDoctor.js       # Doctor authentication
│   │   ├── authUser.js         # User authentication
│   │   └── multer.js           # File upload handling
│   ├── models/
│   │   ├── doctorModel.js      # Doctor schema
│   │   ├── userModel.js        # User schema
│   │   └── appointmentModel.js # Appointment schema
│   ├── routes/
│   │   ├── adminRoute.js       # Admin routes
│   │   ├── doctorRoute.js      # Doctor routes
│   │   └── userRoute.js        # User routes
│   ├── .env
│   ├── server.js               # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/             # Images and static files
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Header.js
│   │   │   ├── SpecialityMenu.js
│   │   │   ├── TopDoctors.js
│   │   │   ├── Banner.js
│   │   │   └── Footer.js
│   │   ├── context/
│   │   │   └── AppContext.js   # Global state
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Doctors.js
│   │   │   ├── Login.js
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   ├── MyProfile.js
│   │   │   ├── MyAppointments.js
│   │   │   └── Appointment.js
│   │   ├── App.js
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
└── admin/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── Sidebar.js
    │   ├── context/
    │   │   ├── AdminContext.js
    │   │   └── DoctorContext.js
    │   ├── pages/
    │   │   ├── Admin/
    │   │   │   ├── Dashboard.js
    │   │   │   ├── AddDoctor.js
    │   │   │   ├── DoctorsList.js
    │   │   │   └── AllAppointments.js
    │   │   └── Doctor/
    │   │       ├── DoctorDashboard.js
    │   │       ├── DoctorAppointments.js
    │   │       └── DoctorProfile.js
    │   ├── App.js
    │   └── main.jsx
    ├── .env
    └── package.json
```

## 📖 Usage Guide

### For Patients

1. **Registration**: Create an account with email and password
2. **Browse Doctors**: Filter doctors by specialty
3. **Book Appointment**: 
   - Select a doctor
   - Choose available date and time slot
   - Complete payment via Razorpay
4. **Manage Appointments**: View upcoming appointments and cancel if needed
5. **Profile Management**: Update personal information and upload profile picture

### For Doctors

1. **Login**: Use credentials provided by admin
2. **View Appointments**: Access all scheduled appointments
3. **Manage Appointments**: Mark completed or cancel
4. **Update Profile**: Modify consultation fees and availability
5. **Track Earnings**: Monitor total earnings from dashboard

### For Administrators

1. **Login**: Use admin credentials
2. **Add Doctors**: Register new doctors with complete information
3. **Manage Doctors**: Toggle availability status
4. **Monitor Appointments**: View and manage all system appointments
5. **Dashboard Analytics**: Track platform statistics


## 🔮 Future Enhancements

- [ ] Email notifications for appointment confirmations
- [ ] SMS reminders before appointments
- [ ] Video consultation integration
- [ ] Multi-language support
- [ ] Patient medical history tracking
- [ ] Prescription management system
- [ ] Rating and review system for doctors
- [ ] Advanced analytics and reporting
- [ ] Mobile application (React Native)
- [ ] AI-powered doctor recommendations

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@shreyansh0843](https://github.com/shreyansh0843)
- LinkedIn: [Shreyansh Priyadarshi](https://linkedin.com/in/shreyansh20)

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Cloudinary for image management
- Razorpay for payment processing
- All open-source libraries used in this project

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
