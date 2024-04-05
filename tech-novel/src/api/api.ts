import { UserTypes } from "@/types/User";
import axios from "axios";

interface UsersApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserTypes.User[];
  support: {
    url: string;
    text: string;
  };
}

interface USerApiResponse {
  data: UserTypes.User;
}

export const fetchUsers = async (
  pageNumber: number
): Promise<UserTypes.UserList> => {
  try {
    const response = await axios.get<UsersApiResponse>(
      `https://reqres.in/api/users?page=${pageNumber}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUserDetail = async (id: string): Promise<UserTypes.User> => {
  try {
    const response = await axios.get<USerApiResponse>(
      `https://reqres.in/api/users/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  input: { name: string | null; job: string | null }
) => {
  try {
    const response = await axios.put(
      `https://reqres.in/api/users/${id}`,
      input
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`https://reqres.in/api/users/${id}`);
    return response.statusText;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async (input: { name: string; job: string }) => {
  try {
    const response = await axios.post(`https://reqres.in/api/users`, input);
    return response.statusText;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
