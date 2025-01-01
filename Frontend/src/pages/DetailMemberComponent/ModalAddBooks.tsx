import React, { useState, useEffect } from "react";

interface ModalBooksProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  actionType: "add" | "update" | "delete";
  initialValues?: any;
}

const ModalBooks: React.FC<ModalBooksProps> = ({ isOpen, onClose, onSubmit, title, actionType, initialValues }) => {
  const [bookId, setBookId] = useState<string | "">("");
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    if (initialValues) {
      setBookId(initialValues.id);
      setStatus(initialValues.status);
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      bookId,
      status
    };
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          {actionType !== "delete" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Book ID</label>
              <input
                type="text"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          )}
          {actionType === "update" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={status ? "Dipinjam" : "Dikembalikan"}
                onChange={(e) => setStatus(e.target.value === "Dipinjam")}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="Dipinjam">Dipinjam</option>
                <option value="Dikembalikan">Dikembalikan</option>
              </select>
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBooks;
