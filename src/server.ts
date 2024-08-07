import express, { Application, Request, Response, NextFunction } from "express";
import { UsersRoutes } from './routes/users.routes';

const app: Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// retorna as rotas do usuario
const usersRoutes = new UsersRoutes().getRoutes();
// coloca o prefixo '/users' nas rotas de usuario
// chama usersRoutes
app.use('/users', usersRoutes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof Error) {
            return response.status(400).json({
                message: err.message,
            });
        }
        return response.status(500).json({ message: "Internal Server Error" });
    }
);

app.listen(3000, () => console.log('Server running on port: ' + 3000));
