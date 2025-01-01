import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { MemberType } from "../types/types";
import { getMembers } from "../API/MemberApi";
import axios from "axios";
import { Link } from "react-router-dom";
import { Puff } from "react-loader-spinner";

const API_URL = "http://127.0.0.1:8000/api";

const MemberIndex = () => {
  const [members, setMembers] = useState<MemberType[]>([]);

  // Fetch members from API
  const fetchMembers = async () => {
    try {
      const response = await getMembers();
      setMembers(response);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // Delete member by ID
  const deleteMember = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/member/${id}/delete`);
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
      alert("Anggota berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Gagal menghapus anggota.");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-extrabold text-center my-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">Daftar Anggota Perpustakaan</h1>
        <div className="overflow-x-auto shadow-2xl rounded-lg">
          <table className="table-auto w-full border-collapse bg-gradient-to-br from-gray-50 to-white rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="px-6 py-4 text-left text-lg font-semibold">Nama</th>
                <th className="px-6 py-4 text-left text-lg font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-lg font-semibold">No. HP</th>
                <th className="px-6 py-4 text-left text-lg font-semibold">Alamat</th>
                <th className="px-6 py-4 text-left text-lg font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member, index) => (
                  <tr key={member.id} className={`transition duration-300 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-purple-100`}>
                    <td className="px-6 py-4 text-gray-800 font-medium">{member.name}</td>
                    <td className="px-6 py-4 text-gray-600">{member.email}</td>
                    <td className="px-6 py-4 text-gray-600">{member.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{member.address}</td>
                    <td className="px-6 py-4 text-center">
                      <Link to={`/anggota/${member.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all">
                        Lihat
                      </Link>{" "}
                      <Link to={`/anggota/${member.id}/edit`} className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-all ml-2">
                        Edit
                      </Link>{" "}
                      <button onClick={() => deleteMember(member.id)} className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-all">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center w-full text-gray-500 font-semibold text-xl">
                    <div className="flex flex-col justify-center items-center space-x-2">
                      <Puff color="#6366F1" height={80} width={80} radius={1} visible={true} />
                      <span className="my-2">Loading</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberIndex;
