import React from "react";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <>
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between">
          <Link to="/anggota" className="font-bold text-lg">
            Perpustakaan
          </Link>
          <Link to="/anggota/create" className="bg-white text-blue-500 px-4 py-2 rounded">
            Tambah Anggota
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
