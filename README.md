# AnimeSaver

<em>

## Note

*The project has been abandoned in favor of a better website, which is no longer using Docker and incorporates better technologies and more content 🤫. It served as a draft for the next iteration.*
</em>

## Description

This project is a web application that allows you to search for anime and add them to your list. You can also add a comment and rate an anime. You can also edit your comment and rating or delete them.
![Alt text](/Readme/AnimeSaver.gif?raw=true "Demo Gif")
**Possibility to**

- Create account
- Search for anime
- Add anime to your list
- Add comments and rate an anime
- Edit anime (comment, rating or delete)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

### Installing

Insall Prerequisites and then:
Clone the repository and go to the project root (extracted folder)
![Alt text](/Readme/image-clone.png?raw=true "clone result")

then run in the terminal (in the project root):
```bash
docker-compose up
```
You should see something like this in Docker Desktop:
![Alt text](/Readme/image-docker.png?raw=true "docker result")
if you see this, it means that the project is running successfully.
You can access the project from the browser by typing:
```bash
localhost:3000
```

## Illustrations

### Search
![Alt text](/Readme/image-search.png?raw=true "search result")
### Add anime
![Alt text](/Readme/image-add.png?raw=true "add result")
### Dashboard
![Alt text](/Readme/image-dashboard.png?raw=true "dashboard result")
### Info anime
![Alt text](/Readme/image-info.png?raw=true "info result")

## Built With

* [NestJS](https://nestjs.com/) - The API Node.js framework used
* [React](https://reactjs.org/) - The web framework used
* [Docker](https://www.docker.com/) - Containerization
* [PostgreSQL](https://www.postgresql.org/) - Database
* [Material-UI](https://material-ui.com/) - UI Framework
* [Jikan API](https://jikan.moe/) - API anime
* [JWT](https://jwt.io/) - Authentication
