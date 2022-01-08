import { useState } from 'react';
import useStorage from './useStorage';
import ApiService from '../services/ApiService';
import { ACCESS_TOKEN } from '../constants';

export interface IAPIResponses {
  isLoading: boolean;
  responses?: any;
  error?: any;
}

const { todoService, setBearer } = ApiService.getInstance();

const useApi = (type: string, uri: string, defaultResponses: IAPIResponses, first?: boolean) => {
  const [response, setResponse] = useState<IAPIResponses>(defaultResponses);
  const [token, setToken] = useStorage(ACCESS_TOKEN, '');
  const setSuccess = (res: any) => {
    setResponse({
      isLoading: false,
      responses: res.data
    });
  };

  const setFailure = (error: any) => {
    setResponse({
      isLoading: false,
      error
    });
  };

  const setAuth = (res: any) => {
    const { token } = res.data;
    setToken(token);
    setBearer(token);
    setResponse({
      isLoading: false,
      responses: res.data
    });
  };

  const onFetch = (params?: any) => {
    setResponse({ isLoading: true });
    switch (type) {
      case 'GET':
        todoService.get(uri).then(setSuccess).catch(setFailure);
        break;
      case 'POST':
        todoService.post(uri, params).then(setSuccess).catch(setFailure);
        break;
      case 'PATCH':
        todoService.patch(uri).then(setSuccess).catch(setFailure);
        break;
      case 'DELETE':
        todoService.delete(uri).then(setSuccess).catch(setFailure);
        break;
      case 'AUTH':
        todoService.post(uri, params).then(setAuth).catch(setFailure);
        break;
    }
  };

  return { response, onFetch };
};

export default useApi;
