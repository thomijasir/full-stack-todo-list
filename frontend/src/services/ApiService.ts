import axios, { AxiosInstance } from 'axios';

class ApiService {
  static INSTANCE: ApiService;
  static getInstance = () => {
    if (!ApiService.INSTANCE) ApiService.INSTANCE = new ApiService();
    return ApiService.INSTANCE;
  };

  todoService: AxiosInstance;

  constructor() {
    this.todoService = axios.create({
      baseURL: 'v1/'
    });

    this.todoService.interceptors.response.use((config: any) => config, this.errorHandle);
  }

  errorHandle = (error: any) => Promise.reject(error);

  setBearer = (token: string): void => {
    this.todoService.defaults.headers.common = {
      Authorization: `Bearer ${token}`
    };
  };
}

export default ApiService;
