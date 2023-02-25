import jwt from 'jsonwebtoken';
import config from '../config/config';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

declare global {
    namespace Express {
        interface Request {
            admin?: {
                id: string;
                name: string;
                email: string;
                password: string;
            };
        }
    }
}

// Authenticate admin
const authentication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authorization header missing');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, config.jwtsecret) as { id: string };

        const admin = await prisma.admin.findUnique({
            where: { id: decodedToken.id },
        });

        if (!admin) {
            throw new Error();
        }

        req.admin = admin;

        next();
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }
};

export default authentication;
