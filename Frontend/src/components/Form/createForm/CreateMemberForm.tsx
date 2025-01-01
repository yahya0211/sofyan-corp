import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import { createDataMember } from "../../../API/MemberApi";
import { MemberType } from "../../../types/types";

const CreateMemberForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberType>();

  const onSubmit = async (data: MemberType) => {
    setLoading(true);
    setError(null);
    try {
      await createDataMember(data);
      // After successful submission, navigate to /anggota
      navigate("/anggota");
    } catch (err) {
      setError("Gagal mengirim data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Tambah Anggota</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField id="name" label="Nama" placeholder="Masukkan nama anggota" error={errors.name?.message} {...register("name", { required: "Nama wajib diisi" })} />
          <InputField
            id="email"
            label="Email"
            placeholder="Masukkan email anggota"
            error={errors.email?.message}
            {...register("email", {
              required: "Email wajib diisi",
              pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: "Email tidak valid" },
            })}
          />
          <InputField
            id="phone"
            label="Nomor HP"
            placeholder="Masukkan nomor HP anggota"
            error={errors.phone?.message}
            {...register("phone", {
              required: "Nomor HP wajib diisi",
              pattern: { value: /^[0-9]{10,15}$/, message: "Nomor HP tidak valid" },
            })}
          />
          <TextAreaField id="address" label="Alamat" placeholder="Masukkan alamat anggota" error={errors.address?.message} {...register("address", { required: "Alamat wajib diisi" })} />

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-300" disabled={loading}>
            {loading ? "Loading..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMemberForm;
