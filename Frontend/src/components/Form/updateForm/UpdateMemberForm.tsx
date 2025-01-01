import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Puff } from "react-loader-spinner";

import { MemberType } from "../../../types/types";
import { updateDataMember, getMember } from "../../../API/MemberApi";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";

const MemberEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<MemberType | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberType>();

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

  const onSubmit = async (data: MemberType) => {
    try {
      await updateDataMember(id as string, data);
      navigate(`/anggota/${id}`);
    } catch (error) {
      console.error("Error saat mengupdate data:", error);
    }
  };

  if (!member) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Puff color="#6366F1" height={80} width={80} radius={1} visible={true} />
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Edit Anggota</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField id="name" label="Nama" placeholder="Masukkan nama anggota" error={errors.name?.message} defaultValue={member.name} {...register("name", { required: "Nama wajib diisi" })} />{" "}
          <InputField id="email" label="Email" placeholder="Masukkan email anggota" error={errors.email?.message} defaultValue={member.email} {...register("email")} />
          <InputField id="phone" label="Nomor HP" placeholder="Masukkan nomor HP anggota" error={errors.phone?.message} defaultValue={member.phone} {...register("phone")} />
          <TextAreaField id="address" label="Alamat" placeholder="Masukkan alamat anggota" error={errors.address?.message} defaultValue={member.address} {...register("address", { required: "Alamat wajib diisi" })} />{" "}
          <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-gradient-to-l hover:from-purple-600 hover:to-indigo-500 transition duration-300">
            Update Anggota
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberEditForm;
