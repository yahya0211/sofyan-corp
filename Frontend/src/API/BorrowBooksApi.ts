import axios, { AxiosResponse } from "axios";
import { BooksType } from "../types/types";
import { API_URL } from "./MemberApi";

type BorrowBooksResponse = {
  data: BooksType[];
  message: string;
};

// Get Books Borrowed by Member
export const getBooksBorrowedByMember = async (id: string): Promise<BooksType[]> => {
  const response = await axios.get<BorrowBooksResponse>(`${API_URL}/books/${id}/user`);
  return response.data.data;
};

// Add Book to Loan (with book ID)
export const addBookToLoan = async (member_id: string, bookData: Omit<BooksType, "id">): Promise<void> => {
  await axios.post(`${API_URL}/books/${member_id}/addBook`, bookData);
};

// Remove Book from Loan (with book ID and member ID)
export const removeBookFromLoan = async (id: string, member_id: string): Promise<void> => {
  await axios.delete(`${API_URL}/books/${id}/user/${member_id}/delete`);
};

// Update Loan Status (with book ID, status, and member ID)
export const updateLoanStatus = async (id: string, status: boolean, member_id: string): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.patch(`${API_URL}/books/${id}/user/${member_id}/edit`, { status });
    console.log(response.data.data.status);
    return response;
  } catch (error) {
    console.error("Error updating loan status:", error);
    throw error;
  }
};
