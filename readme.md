# SimpleNote - Full-Stack Note-Taking Application

SimpleNote is a full-stack MERN application that allows users to seamlessly create, view, edit, and delete notes. It features a clean, responsive interface with rate limiting to prevent abuse, built entirely with React, Tailwind CSS, and DaisyUI for a polished user experience.

## Features

- **Note Management**: Create, read, update, and delete notes with titles and content.
- **Responsive UI/UX**: Built with React, Tailwind CSS, and DaisyUI, featuring micro-interactions and a modern design.
- **Rate Limiting**: Integrated with Upstash Redis to limit requests (100 per 60 seconds) and prevent abuse.
- **Real-time Feedback**: Toast notifications for user actions using React Hot Toast.
- **Data Persistence**: MongoDB for storing notes with timestamps.
- **Development & Production Modes**: Supports hot module replacement in development and static file serving in production.
---

## 🚀 Setup Instructions

### Prerequisites
- Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
- You will also need a MongoDB database (e.g., [MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas/register)).
- Sign up for [Upstash](https://upstash.com/) to get Redis credentials for rate limiting.

### 1. Environment Variables Configuration
Navigate to `backend/.env` and fill in the necessary keys:
```env
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
PORT=5000
NODE_ENV=production
```
> **Note**: Obtain `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from your Upstash dashboard after creating a Redis database.

>**Note**: Set ```NODE_ENV=production``` to serve the frontend via the Express server. Set ```NODE_ENV=development``` if running the frontend separately via Vite.


### 2. Production Mode (Single Command)
This project is configured to build the frontend and serve it through the backend for easy hosting.
From the root folder:
```bash
# Install all dependencies and build the frontend
npm run build

# Start the Express server (serves both API and Frontend)
npm run start

```
The application will be available at ```http://localhost:5000```.

### 3. Development Mode (Two Terminals)
If you want to make live changes with Hot Module Replacement (HMR):

**Terminal 1: Backend**
```bash
cd server
npm install
npm run dev
```
Runs on ```http://localhost:5000```

**Terminal 2: Frontend**
```bash
cd client
npm install
npm run dev
```
It will run on a local port provided by Vite, typically ```http://localhost:5173```

## 🔌 API Endpoints Documentation

All API requests are prefixed with `/api`. No authentication is required for this application.

### Notes (`/api/notes`)


| Method | Endpoint | Description | Response |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Fetch all notes, sorted by creation date (newest first). | Array of note objects |
| **GET** | `/:id` | Get a specific note by ID. | Single note object or 404 if not found |
| **POST** | `/` | Create a new note with title and content. | Created note object |
| **PUT** | `/:id` | Update an existing note's title and content. | Updated note object or 404 if not found |
| **DELETE** | `/:id` | Delete a note by ID. | Deleted note object or 404 if not found |

### Request/Response Examples

#### Create Note (`POST /api/notes`)

**Request Body:**

```json
{
  "title": "My First Note",
  "content": "This is the content of my note."
}
```
**Response (201)**:
```json
{
  "_id": "60d5ecb74b24c72b8c8b4567",
  "title": "My First Note",
  "content": "This is the content of my note.",
  "createdAt": "2023-06-25T10:30:00.000Z",
  "updatedAt": "2023-06-25T10:30:00.000Z",
  "__v": 0
}
```
#### Get all notes (`GET /api/notes`)

**Response (200)**:
```json
[
  {
    "_id": "69c26184b4170c58ccd7e9aa",
    "title": "Book Recommendations",
    "content": "Project Hail Mary by Andy Weir and The Seven Husbands of Evelyn Hugo. Check if the library has them.",
    "createdAt": "2026-03-24T10:03:48.171Z",
    "updatedAt": "2026-03-24T10:03:48.171Z",
    "__v": 0
  },
  {
    "_id": "69c26173b4170c58ccd7e9a7",
    "title": "Website Updates",
    "content": "The \"Submit\" button on the contact form is overlapping on mobile views. Need to adjust the CSS padding.",
    "createdAt": "2026-03-24T10:03:31.941Z",
    "updatedAt": "2026-03-24T10:03:31.941Z",
    "__v": 0
  },
  {
    "_id": "69c26153b4170c58ccd7e9a1",
    "title": "Workout Routine",
    "content": "Leg Day: 3 sets of squats, 12 lunges, and 10 minutes on the stair climber. Remember to stretch for at least 5 minutes after.\n",
    "createdAt": "2026-03-24T10:02:59.020Z",
    "updatedAt": "2026-03-24T10:03:12.154Z",
    "__v": 0
  },
  {
    "_id": "69c26130b4170c58ccd7e99e",
    "title": "Gift Ideas",
    "content": "Gift mom a heart shaped pendant",
    "createdAt": "2026-03-24T10:02:24.347Z",
    "updatedAt": "2026-03-24T10:02:24.347Z",
    "__v": 0
  }
]
```
#### Update Note (`PUT /api/notes/:id`)

**Request Body:**

```json
{
  "title": "Updated Note Title",
  "content": "Updated content."
}
```
**Response (200)**:
```json
{
  "_id": "60d5ecb74b24c72b8c8b4567",
  "title": "Updated Note Title",
  "content": "Updated content.",
  "createdAt": "2023-06-25T10:30:00.000Z",
  "updatedAt": "2023-06-25T10:32:00.000Z",
  "__v": 0
}
```
## Error Responses

- **400 Bad Request**: Invalid request body (e.g., missing title or content).
- **404 Not Found**: Note with specified ID not found.
- **429 Too Many Requests**: Rate limit exceeded (100 requests per 60 seconds).
- **500 Internal Server Error**: Server-side error.

## 🛡 Rate Limiting

The application uses **Upstash Redis** for rate limiting to ensure service stability.

- **Limit:** 100 requests per IP address.
- **Window:** 60-second sliding window.
- **Exceeding Limits:** Returns a `429 Too Many Requests` status code.
- **Error Message:** `"Too many requests, please try again later."`