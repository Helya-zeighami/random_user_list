import { ApiResponse, UserApiParams } from "../types/user";
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://randomuser.me/api/',
  });
  
  export const UserHttp = {
    fetchUsers: async (params: UserApiParams = {}): Promise<ApiResponse> => {
      const response = await api.get('', { params });
      return response.data;
    },
  };