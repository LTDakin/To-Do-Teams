# To-Do Teams

Project to get practice with Nest.Js, Typescript, React, and managing authorization of shared data.

### Frontend
  - Framework: React
  - Routing: React-router
  - Component Library: Antd
  - State Management: Jotai
### Backend:
  - Framework: NestJs
  - Type ORM: Drizzle
  - Database: PostgresQL

## To run the project:
1. First start a docker container running a PostgresQL with matching credentials
2. Build and push migrations using drizzle-kit for the db
```
npm run build:db
npm run update:db
```
3. Start the backend and frontend servers
```
npm run start:fe
npm run start:be
```

## Main Features:
- Account Creation & Management
- Todos persisted in Database
- Share Todos with other users
- Authorization gaurds on todos for privacy and security

<p align="center">
  <kbd>
    <img width="1456" height="461" alt="Screenshot 2026-01-10 at 12 53 28 PM" src="https://github.com/user-attachments/assets/d335dfe2-7cde-44d8-997b-a4583a9ca7f6" />
  </kbd>
</p>

<p align="center">
  <kbd>
    <img width="40%" alt="Screenshot 2026-01-10 at 12 53 09 PM" src="https://github.com/user-attachments/assets/492923e0-97f7-4c7f-9cc8-6b7712fa5923" />

  </kbd>
</p>
