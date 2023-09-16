# Pastebin

Pastebin is an online content sharing service. It allows users to store and share plain text snippets or code snippets easily. Users can paste their desired content into the platform, and it generates a unique URL for the paste, which can be shared with others. This URL can then be used to access and view the shared content.

## Tech Stack

- Frontend: React Typescript
- Backend: NestJS
- Database: TypeORM with PostgreSQL

## Table of Contents

- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)

## Getting Started

### Install dependencies

In the root folder of the repository:

```sh
npm install
```

### Environment Setup

Create a backend/.env file in your root folder by making a copy of backend/.env.example.

- If you are running your own postgres (not via docker-compose), update the variables accordingly.

```sh
cp backend/.env.example backend/.env
```

### Run locally

Start up the local development environment with full infrastructure by running:

```sh
npm run start-full
```

This should start up the frontend, backend, and a dockerized PosgreSQL database.

- Backend should now be served from http://localhost:8080
- Frontend should be served from http://localhost:3000.

# API Documentation

## Base URL

All API requests are made to: [http://localhost:8080/](http://localhost:8080/)

### Get Active Snippets

Fetch a list of active snippets, with optional pagination and sorting.

- **HTTP Method**: `GET`
- **Endpoint**: `/snippets`
- **Query Parameters**:
  - `page`: The page number to fetch (optional).
  - `limit`: The number of items per page (optional).
  - `sortBy`: The field by which to sort (optional). Valid values: `numViews`, `dateCreated`.
  - `order`: Sort order (optional). Valid values: `ASC`, `DESC`.

#### Example Request

```sh
curl "http://localhost:8080/snippets?page=1&limit=10&sortBy=views&order=DESC"
```

#### Example Response

```json
{
  "snippets": [...],
  "totalNum": 50
}
```

### Get Snippet by ID

Fetch a snippet by its ID. Expired snippets will not be fetched, and a null value is returned.

- **HTTP Method**: `GET`
- **Endpoint**: `/snippets/:id`

#### Example Request

```sh
curl http://localhost:8080/snippets/1
```

#### Example Response

```json
{
  "id": 1,
  "content": "Some content",
  "title": "Some title",
  "minsToExpiry": 60
}
```

### Create a New Snippet

Create a new snippet.

- **HTTP Method**: `POST`
- **Endpoint**: `/snippets`
- **Query Parameters**:
  - `title`: The title of the snippet (required).
  - `content`: The content of the snippet (required).
  - `minsToExpiry`: The number of minutes before the snippet expires (required).

#### Example Request

```sh
curl -X POST "http://localhost:8080/snippets" \
     -H "Content-Type: application/json" \
     -d '{
           "content": "Your Snippet Content Here",
           "title": "Your Title Here",
           "minsToExpiry": 60
         }'
```

#### Example Response

```json
{
  "id": 1,
  "content": "Hello, world!",
  "title": "My Snippet",
  "minsToExpiry": 60
}
```
