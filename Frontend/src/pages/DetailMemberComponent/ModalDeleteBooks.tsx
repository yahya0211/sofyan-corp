
const ModalDeleteBook = ({ isOpen, onClose, onSubmit }: any) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Apakah Anda yakin ingin menghapus buku ini?</h2>
        <button onClick={onSubmit}>Hapus</button>
        <button onClick={onClose}>Batal</button>
      </div>
    </div>
  );
};

export default ModalDeleteBook;
