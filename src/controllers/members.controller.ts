import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status'

const prisma = new PrismaClient();

// Get all members
const getAllMembers = async (req: Request, res: Response) => {
  const members = await prisma.member.findMany();
  res.status(httpStatus.OK).json(members);
};

// Get a member by ID
const getMemberById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const member = await prisma.member.findUnique({
    where: { id },
  });
  if (member) {
    res.status(httpStatus.OK).json(member);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found.');
  }
};

// Create a member
const createMember = async (req: Request, res: Response) => {
  const { name, email, address, phoneNumber } = req.body;
  const newMember = await prisma.member.create({
    data: {
      name,
      email,
      address,
      phoneNumber
    },
  });
  res.status(httpStatus.CREATED).json(newMember);
};

// Update a member by ID
const updateMemberById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, address, phoneNumber } = req.body;
  const updatedMember = await prisma.member.update({
    where: { id },
    data: {
      name,
      email,
      address,
      phoneNumber
    },
  });
  res.status(httpStatus.OK).json(updatedMember);
};

// Delete a member by ID
const deleteMemberById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedMember = await prisma.member.delete({
    where: { id },
  });
  res.status(httpStatus.OK).json(deletedMember);
};

export {
  getAllMembers,
  getMemberById,
  createMember,
  updateMemberById,
  deleteMemberById
}
