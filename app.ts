import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path = require("node:path");


dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());



// In-memory "database"
let movies: Array<{ id: number; title: string }> = [];
let actors: Array<{ id: number; name: string; movieId: number }> = [];
let awards: Array<{ id: number; title: string; movieId: number }> = [];

// MOVIES Endpoints
app.get("/movies", (req: Request, res: Response) => {
    res.json(movies);
});

app.post("/movies", (req: Request, res: Response) => {
    const movie = req.body;
    movies.push(movie);
    res.status(201).json(movie);
});

app.put("/movies/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex((m) => m.id === parseInt(id));
    if (movieIndex > -1) {
        movies[movieIndex] = { ...movies[movieIndex], ...req.body };
        res.json(movies[movieIndex]);
    } else {
        res.status(404).send("Movie not found");
    }
});

app.delete("/movies/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    movies = movies.filter((m) => m.id !== parseInt(id));
    res.status(204).send();
});

// ACTORS Endpoints
app.get("/actors", (req: Request, res: Response) => {
    res.json(actors);
});

app.post("/actors", (req: Request, res: Response) => {
    const actor = req.body;
    actors.push(actor);
    res.status(201).json(actor);
});

// ACTORS BY MOVIE Endpoint
app.get("/movies/:movieId/actors", (req: Request, res: Response) => {
    const { movieId } = req.params;
    const movieActors = actors.filter(
        (actor) => actor.movieId === parseInt(movieId)
    );
    res.json(movieActors);
});

// AWARDS Endpoints
app.get("/awards", (req: Request, res: Response) => {
    res.json(awards);
});

app.post("/awards", (req: Request, res: Response) => {
    const award = req.body;
    awards.push(award);
    res.status(201).json(award);
});

// AWARD BY MOVIE Endpoint
app.get("/movies/:movieId/awards", (req: Request, res: Response) => {
    const { movieId } = req.params;
    const movieAwards = awards.filter(
        (award) => award.movieId === parseInt(movieId)
    );
    res.json(movieAwards);
});

// Start the server
const PORT = 3001;
app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
