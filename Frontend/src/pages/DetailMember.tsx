import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MemberType, BooksType } from "../types/types";
import { getMember } from "../API/MemberApi";
import { getBooksBorrowedByMember, addBookToLoan, removeBookFromLoan, updateLoanStatus } from "../API/BorrowBooksApi";
import { Puff } from "react-loader-spinner";
import ModalAddBook from "../components/Form/addBookForm/ModalAddBook";
import { CiTrash } from "react-icons/ci";

const MemberDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<MemberType | null>(null);
  const [books, setBooks] = useState<BooksType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetching member details
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await getMember(id as string);
        setMember(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMember();
  }, [id]);

  const handleUpdateLoan = async (id: string, status: boolean, member_id: string) => {
    try {
      // Toggle status (Dipinjam -> Dikembalikan, atau sebaliknya)
      const newStatus = !status;
      const response = await updateLoanStatus(id, newStatus, member_id);
  
      // Periksa respons dengan status >= 200 dan < 300
      if (response && response.status >= 200 && response.status < 300) {
        console.log("Books data after update:", response.data); // Log untuk memeriksa data yang diterima
  
        // Perbarui daftar buku
        const updatedBooks = await getBooksBorrowedByMember(member_id);
        console.log("Updated books data:", updatedBooks); // Log data terbaru yang diambil
        setBooks(updatedBooks); // Pastikan ini memperbarui state dengan data yang benar
      } else {
        console.error("Failed to update status", response);
      }
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  };
  

  const handleDeleteBook = async (id: string, member_id: string) => {
    try {
      await removeBookFromLoan(id, member_id as string);
      // Refresh daftar buku setelah berhasil menghapus
      const updatedBooks = await getBooksBorrowedByMember(member_id as string);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Fetching books borrowed by the member
  useEffect(() => {
    const fetchBooks = async () => {
      if (member) {
        try {
          const booksData = await getBooksBorrowedByMember(id as string);
          setBooks(booksData);
        } catch (error) {
          console.error("Error fetching borrowed books:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBooks();
  }, [member, id]);

  const handleAddBook = async (bookData: Omit<BooksType, "id">) => {
    try {
      await addBookToLoan(id as string, bookData); // Tambahkan buku ke database

      // Refresh daftar buku setelah berhasil menambahkan
      const updatedBooks = await getBooksBorrowedByMember(id as string);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  if (loading || !member) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Puff color="#6366F1" height={80} width={80} radius={1} visible={true} />
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Detail Anggota</h1>

        {/* Member Details */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-lg shadow-md text-white">
            <p className="text-lg">
              <strong>Nama:</strong> {member.name}
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-lg shadow-md text-white">
            <p className="text-lg">
              <strong>Email:</strong> {member.email}
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-lg shadow-md text-white">
            <p className="text-lg">
              <strong>Nomor HP:</strong> {member.phone}
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-lg shadow-md text-white">
            <p className="text-lg">
              <strong>Alamat:</strong> {member.address}
            </p>
          </div>
        </div>

        {/* Book Loan Details */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Buku yang Dipinjam</h2>
          {books.length > 0 ? (
            <ul>
              {books.map((book) => (
                <div key={book.id} className="mb-4 p-4 bg-indigo-100 rounded-lg shadow-md flex justify-between items-baseline">
                  <div>
                    <h3 className="font-semibold text-lg">{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Publisher: {book.publisher}</p>
                    <p>
                      Status:{" "}
                      <button className={`px-2 rounded ${book.status ? "bg-red-500 text-white" : "bg-green-500 text-white"}`} onClick={() => handleUpdateLoan(book.id, book.status, member.id)}>
                        {book.status ? "Dipinjam" : "Dikembalikan"}
                      </button>
                    </p>
                  </div>
                  <button className="text-2xl text-red-600" onClick={() => handleDeleteBook(book.id, member.id)}>
                    <CiTrash />
                  </button>
                </div>
              ))}
            </ul>
          ) : (
            <p>Belum ada buku yang dipinjam.</p>
          )}
        </div>

        {/* Add Book Button */}
        <div className="mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md shadow-lg hover:bg-gradient-to-l hover:from-purple-600 hover:to-indigo-500 transition duration-300"
          >
            Tambah buku yang dipinjam
          </button>
        </div>
        <div className="mt-6 text-center">
          <button
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md shadow-lg hover:bg-gradient-to-l hover:from-purple-600 hover:to-indigo-500 transition duration-300"
            onClick={() => navigate("/anggota")}
          >
            Kembali ke Daftar Anggota
          </button>
        </div>

        {/* Add Book Modal */}
        <ModalAddBook isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddBook} />
      </div>
    </div>
  );
};

export default MemberDetailPage;
