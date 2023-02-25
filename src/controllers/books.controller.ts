import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status'

const prisma = new PrismaClient();

// Get all books
const getAllBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.status(httpStatus.OK).json(books);
};

// Get a book by ID
const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await prisma.book.findUnique({
    where: { id },
  });
  if (book) {
    res.status(httpStatus.OK).json(book);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found.');
  }
};

// Create a book
const createBook = async (req: Request, res: Response) => {
  const { title, author, description, copies } = req.body;
  const newBook = await prisma.book.create({
    data: {
      title,
      author,
      description,
      copies
    },
  });
  res.status(httpStatus.CREATED).json(newBook);
};

// Update a book by ID
const updateBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, description, copies } = req.body;
  const updatedBook = await prisma.book.update({
    where: { id },
    data: {
      title,
      author,
      description,
      copies
    },
  });
  res.status(httpStatus.OK).json(updatedBook);
};

// Delete a book by ID
const deleteBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedBook = await prisma.book.delete({
    where: { id },
  });
  res.status(httpStatus.OK).json(deletedBook);
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById
}