import { UserTypes } from "@/types/User";
import axios from "axios";

interface ApiResponse {
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

export const fetchUsers = async (
  pageNumber: number
): Promise<UserTypes.UserList> => {
  try {
    const response = await axios.get<ApiResponse>(
      `https://reqres.in/api/users?page=${pageNumber}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
