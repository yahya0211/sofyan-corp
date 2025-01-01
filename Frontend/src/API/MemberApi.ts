import axios from "axios";
import { MemberType } from "../types/types";

export const API_URL = "http://127.0.0.1:8000/api";

type MemberResponse = {
  data: MemberType[];
  success: boolean;
};

export const getMembers = async (): Promise<MemberType[]> => {
  const response = await axios.get<MemberResponse>(`${API_URL}/members`);
  return response.data.data;
};

export const getMember = async (id: string): Promise<MemberType> => {
  const response = await axios.get(`${API_URL}/member/${id}`);
  return response.data.data;
};

export const createDataMember = async (member: Omit<MemberType, "id" | "createdAt" | "updatedAt">): Promise<void> => {
  await axios.post(`${API_URL}/member/addMember`, member);
};


export const updateDataMember = async (id: string, member: MemberType): Promise<void> => {
  return axios.patch(`${API_URL}/member/${id}/edit`, member, {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteDataMember = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/member/${id}/delete`);
};
