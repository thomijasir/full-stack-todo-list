import useStorage from '../hooks/useStorage';
import { ACCESS_TOKEN } from '../constants';
const AuthProtect = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated] = useStorage(ACCESS_TOKEN, '');

  if (!isAuthenticated) {
    // Depend on situation you want show content or you want redirect
    return <p className="unauthorized">Access Unauthorized!</p>;
  }

  return children;
};

export default AuthProtect;
