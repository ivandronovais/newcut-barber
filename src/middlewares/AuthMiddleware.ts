import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IPayload } from "../Interfaces/UsersInterface";

export class AuthMiddleware {
    auth(request: Request, response: Response, next: NextFunction) {
        // pega o bearer token dentro da requisicao
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).json({
                code: 'token.missing',
                message: 'Token Missing',
            });
        }
        const [, token] = authHeader?.split(' ');
        let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN;

        if (!secretKey) {
            throw new Error('There is no token key');
        }
        try {
            const { sub } = verify(token, secretKey) as IPayload;
            request.user_id = sub;
            return next();
        } catch (error) {
            return response.status(401).json({
                code: 'token expired',
                message: 'Token Expired',
            })
        }


    }
}