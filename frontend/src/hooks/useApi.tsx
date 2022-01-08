import { useState, useEffect } from 'react';
import useStorage from './useStorage';
import ApiService from '../services/ApiService';
import { ACCESS_TOKEN, ME } from '../constants';

const { todoService, setBearer } = ApiService.getInstance();

const useApi = (type: string, uri: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [token] = useStorage(ACCESS_TOKEN, '');

  useEffect(() => {
    setBearer(token);
  }, []);

  const onFetch = (params?: any, segment?: string) => {
    setLoading(true);
    switch (type) {
      case 'GET':
        return todoService.get(uri);
      case 'POST':
        return todoService.post(uri, params);
      case 'PATCH':
        return todoService.patch(`${uri}/${segment}`, params);
      case 'DELETE':
        return todoService.delete(`${uri}/${segment}`);
    }
  };

  return { loading, onFetch, setLoading, setBearer };
};

export default useApi;
