import React, { useState, MouseEvent, FormEvent } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import useStorage from '../../hooks/useStorage';
import { ACCESS_TOKEN, ME } from '../../constants';
import { IResponsesAuth } from '../../interfaces/General';
import { AxiosResponse } from 'axios';
import TodoLogo from '../../assets/image/logo.svg';
import './Login.style.scss';

export const handleRegister = (navigate: NavigateFunction) => (e: MouseEvent) => {
  e.preventDefault();
  navigate('/register');
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useStorage(ACCESS_TOKEN, '');
  const [identity, setIdentity] = useStorage(ME, '');
  const makeLogin = useApi('POST', 'auth/login');

  const [statusLogin, setStatusLogin] = useState(0);

  const setUserAuth = (res: any) => {
    setToken(res.data.token);
    setIdentity(res.data.user);
    makeLogin.setBearer(token);
  };

  const handleSuccessLogin = (res: AxiosResponse<IResponsesAuth>) => {
    console.log('SUCCESS LOGIN: ', res);
    setStatusLogin(200);
    setUserAuth(res);
    setTimeout(() => {
      makeLogin.setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };
  const handleFailureLogin = (res: AxiosResponse<any, any>) => {
    setStatusLogin(401);
    makeLogin.setLoading(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getEmail = e.currentTarget.getElementsByTagName('input')[0].value;
    const getPassword = e.currentTarget.getElementsByTagName('input')[1].value;
    makeLogin
      .onFetch({
        email: getEmail,
        password: getPassword
      })
      ?.then(handleSuccessLogin)
      .catch(handleFailureLogin);
  };

  return (
    <div className="login-page text-center">
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src={TodoLogo} alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Central Login</h1>

          <div className="form-floating">
            <input
              type="email"
              name="email"
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
            />
            <label htmlFor="emailInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
            />
            <label htmlFor="passwordInput">Password</label>
          </div>
          {statusLogin === 401 ? (
            <div className="alert alert-danger" role="alert">
              Opps, Credentials not found..
            </div>
          ) : (
            ''
          )}
          {statusLogin === 200 ? (
            <div className="alert alert-success" role="alert">
              Success login..
            </div>
          ) : (
            ''
          )}
          <div className="row">
            <div className="col-md-6">
              <button className="w-100 btn btn-primary" disabled={makeLogin.loading} type="submit">
                Sign in{' '}
                {makeLogin.loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  ''
                )}
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="w-100 btn btn-secondary"
                type="button"
                onClick={handleRegister(navigate)}
              >
                Register
              </button>
            </div>
          </div>

          <p className="mt-5 mb-3 text-muted">Full Stack TodoList</p>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
