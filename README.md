# 💌 Wedding Invitation Backend

![Logo](web-app-manifest-512x512.png)

A robust backend solution for managing personalized wedding invitations and guestbook entries, built with Node.js, Express, and MongoDB. This service allows for unique invitation tracking via `invitationId` and provides a seamless API for frontend integration.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 🌟 Features

*   **Personalized Guestbook**: Manage guest entries tied to unique `invitationId`s.
*   **RSVP Tracking**: Record guest attendance (`hadir`/`tidak_hadir`).
*   **Secure & Scalable**: Built with Express and MongoDB for reliable data handling.
*   **CORS Enabled**: Ready for frontend integration.
*   **Environment Configuration**: Flexible setup using environment variables.

## 🚀 Getting Started

Follow these steps to get the backend up and running locally:

### Prerequisites

*   Node.js (LTS recommended)
*   MongoDB (local instance or cloud service)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd wedding-invitation-backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory:
    ```
    PORT=3005
    MONGODB_URI=mongodb://localhost:27017/wedding_invitation
    ```
    *   `PORT`: The port for the server.
    *   `MONGODB_URI`: Your MongoDB connection string.

### Running the Server

```bash
npm start
```
The server will be available at `http://localhost:3005` (or your configured port).

## 🛠️ API Endpoints

All endpoints are prefixed with `/api/invitations/:invitationId`. Replace `:invitationId` with the specific invitation's ID.

### 1. Get Guestbook Entries

*   **URL**: `/api/invitations/:invitationId/guestbook`
*   **Method**: `GET`
*   **Description**: Retrieves all guest entries for a given `invitationId`.
*   **Response**: `200 OK` with an array of guest objects.
    ```json
    [
        {
            "_id": "65b5d1e2e9b0d1e2e9b0d1e2",
            "name": "John Doe",
            "message": "Happy wedding!",
            "attendance": "hadir",
            "invitationId": "wedding-123",
            "timestamp": "2024-01-28T10:00:00.000Z"
        }
    ]
    ```

### 2. Add a New Guestbook Entry

*   **URL**: `/api/invitations/:invitationId/guestbook`
*   **Method**: `POST`
*   **Description**: Adds a new guest entry.
*   **Request Body (JSON)**:
    ```json
    {
        "name": "Jane Doe",
        "message": "Congratulations!",
        "attendance": "tidak_hadir"
    }
    ```
    *   `name` (string, required): Guest's name.
    *   `message` (string, required): Guest's message.
    *   `attendance` (string, required): `hadir` or `tidak_hadir`.
*   **Response**: `201 Created` with the new guest object.
    ```json
    {
        "_id": "65b5d1e2e9b0d1e2e9b0d1e3",
        "name": "Jane Doe",
        "message": "Congratulations!",
        "attendance": "tidak_hadir",
        "invitationId": "wedding-123",
        "timestamp": "2024-01-28T10:05:00.000Z",
        "__v": 0
    }
    ```

## 📞 Contact & Live Demo

*   **Live Demo**: Explore the application in action at [demo.isaacnewton.store](https://demo.isaacnewton.store).
*   **Main Website (for messages)**: For inquiries or to send messages, visit [isaacnewton.store](https://isaacnewton.store).
*   **Instagram**: Connect with me on Instagram: [@hanifmaulana2](https://www.instagram.com/hanifmaulana2)

---

**Built with ❤️ for memorable moments.** 