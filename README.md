# Eco-Efficient 🌱

Eco-Efficient is a modern, full-stack waste management and rewards platform designed to empower communities to live more sustainably. By gamifying waste disposal and providing actionable insights into environmental impact, Eco-Efficient makes sustainability accessible and rewarding for everyone.

---

## 🚀 Key Features

### 👤 User Dashboard
- **Waste Logging:** Easily log different types of waste disposal.
- **Impact Tracking:** Visualize your environmental contribution through real-time metrics.
- **Rewards System:** Earn points for sustainable actions and redeem them for exciting rewards.
- **Profile Management:** Personalized user profiles with activity history.

### 🤝 Partner Dashboard
- **Collection Management:** Streamlined interface for waste collection partners.
- **Operation Tracking:** Monitor collection schedules and partner-specific tasks.
- **Organization Profiles:** Dedicated profiles for organizations and agencies.

### 🛠️ Admin Dashboard
- **System Overview:** Comprehensive dashboard for monitoring the entire platform.
- **User & Partner Management:** Oversight of all user roles and permissions.
- **Content Management:** Manage rewards, sustainability tips, and platform settings.

### 🔐 Security & Authentication
- **Role-Based Access Control (RBAC):** Distinct interfaces for Users, Admins, and Partners.
- **Secure Auth:** Email-based authentication with OTP verification and JWT tokens.
- **Email Validation:** Integration with Kickbox API for reliable user onboarding.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [Bootstrap 5](https://getbootstrap.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **API Client:** [Axios](https://axios-http.com/)

### Backend
- **Framework:** [Django 4.2](https://www.djangoproject.com/)
- **API:** [Django REST Framework](https://www.django-rest-framework.org/)
- **Authentication:** [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/)
- **Database:** SQLite (Development) / PostgreSQL (Production ready)
- **Email:** [Brevo (formerly Sendinblue)](https://www.brevo.com/) via SMTP

---

## 📂 Project Structure

```text
Eco-Efficient/
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main page components
│   │   └── assets/     # Static assets (images, etc.)
│   └── public/         # Static public files
├── backend/            # Django REST API
│   ├── accounts/       # User management & profiles
│   ├── waste/          # Waste logging & tracking logic
│   ├── rewards/        # Rewards & redemption system
│   ├── partners/       # Partner-specific functionality
│   └── backend/        # Project configuration
└── README.md           # Project documentation
```

---

## 🚦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install django django-rest-framework django-cors-headers djangorestframework-simplejwt python-dotenv
   ```
4. Configure environment variables (see below).
5. Run migrations:
   ```bash
   python manage.py migrate
   ```
6. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Email Configuration (Brevo/SMTP)
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email_user
EMAIL_HOST_PASSWORD=your_smtp_password
DEFAULT_FROM_EMAIL=Eco-Efficient <noreply@eco-efficient.com>

# Third-party APIs
KICKBOX_API_KEY=your_kickbox_api_key
```

---

## ✨ Contributors

- **Suman** - *Initial Work*

---

Made with ❤️ for a Greener Planet 🌍
