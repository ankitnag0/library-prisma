import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import config from '../config/config';

const prisma = new PrismaClient();

// Register admin
const registerAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin
  const newAdmin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashedPassword
    },
    select: {
      name: true,
      email: true
    }
  });

  res.status(httpStatus.CREATED).json(newAdmin);
};

// Login admin
const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if admin exists
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  // Check if password is correct
  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign({ id: admin.id }, config.jwtsecret, {
    expiresIn: '1d',
  });

  res.status(httpStatus.OK).json({ token });
};

export { registerAdmin, loginAdmin };
