import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BooksType } from "../../../types/types"; 

interface ModalAddBookProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<BooksType, "id">) => void;
}

interface FormValues {
  title: string;
  author: string;
  publisher: string;
}

const ModalAddBook: React.FC<ModalAddBookProps> = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit({ ...data, status: true }); // Default status as "Dipinjam"
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Tambah Buku</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Judul Buku</label>
            <input
              {...register("title")}
              className="w-full p-2 border rounded"
              placeholder="Masukkan judul buku"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Penulis</label>
            <input
              {...register("author")}
              className="w-full p-2 border rounded"
              placeholder="Masukkan nama penulis"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Penerbit</label>
            <input
              {...register("publisher")}
              className="w-full p-2 border rounded"
              placeholder="Masukkan nama penerbit"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded shadow"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddBook;
