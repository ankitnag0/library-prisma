import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const prisma = new PrismaClient();

// Checkout a book
const checkoutBook = async (req: Request, res: Response) => {
  const { bookId, memberId } = req.body;

  // Check if the book exists
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found.');
  }

  // Check if the member exists
  const member = await prisma.member.findUnique({ where: { id: memberId } });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found.');
  }

  // Check if the book is available
  if (book.copies === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book not available.');
  }

  // Create a checkout entry
  const checkout = await prisma.checkout.create({
    data: {
      bookId,
      memberId,
      checkedOutAt: new Date(),
    },
  });

  // Update the number of copies
  await prisma.book.update({
    where: { id: bookId },
    data: { copies: book.copies - 1 },
  });

  res.status(httpStatus.CREATED).json(checkout);
};

// Return a book
const returnBook = async (req: Request, res: Response) => {
  const { bookId, memberId } = req.body;

  // Check if the book exists
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found.');
  }

  // Check if the member exists
  const member = await prisma.member.findUnique({ where: { id: memberId } });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found.');
  }

  // Check if the member has checked out the book
  const checkout = await prisma.checkout.findFirst({
    where: { bookId, memberId, returnedAt: null },
  });
  if (!checkout) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book not checked out.');
  }

  // Update the checkout entry
  const updatedCheckout = await prisma.checkout.update({
    where: { id: checkout.id },
    data: { returnedAt: new Date() },
  });

  // Update the number of copies
  await prisma.book.update({
    where: { id: bookId },
    data: { copies: book.copies + 1 },
  });

  res.status(httpStatus.OK).json(updatedCheckout);
};

export { checkoutBook, returnBook };
