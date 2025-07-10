import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req:Request, res:Response) => {
    res.send("hellow form express + typescript api!");
})

app.listen(3000, () => {
    console.log("Server is listeining on port 3000");
})