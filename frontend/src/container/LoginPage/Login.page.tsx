import React, { MouseEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import TodoLogo from '../../assets/image/logo.svg';
import './Login.style.scss';

export const handleRegister = (navigate: any) => (e: MouseEvent) => {
  e.preventDefault();
  navigate('/register');
};

const LoginPage = () => {
  const navigate = useNavigate();

  const makeLogin = useApi('AUTH', 'auth/login', { isLoading: false }, false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getEmail = e.currentTarget.getElementsByTagName('input')[0].value;
    const getPassword = e.currentTarget.getElementsByTagName('input')[1].value;
    makeLogin.onFetch({
      email: getEmail,
      password: getPassword
    });
  };

  if (makeLogin.response.responses) {
    setTimeout(() => {
      window.location.assign('/dashboard');
    }, 1000);
  }
  return (
    <div className="login-page text-center">
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src={TodoLogo} alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Central Login</h1>

          <div className="form-floating">
            <input type="email" name="email" className="form-control" id="emailInput" placeholder="name@example.com" />
            <label htmlFor="emailInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="passwordInput" placeholder="Password" />
            <label htmlFor="passwordInput">Password</label>
          </div>
          {makeLogin.response.error ? (
            <div className="alert alert-danger" role="alert">
              Opps, Credentials not found..
            </div>
          ) : (
            ''
          )}
          {makeLogin.response.responses ? (
            <div className="alert alert-success" role="alert">
              Success login..
            </div>
          ) : (
            ''
          )}
          <div className="row">
            <div className="col-md-6">
              <button className="w-100 btn btn-primary" disabled={makeLogin.response.isLoading} type="submit">
                Sign in {makeLogin.response.isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
              </button>
            </div>
            <div className="col-md-6">
              <button className="w-100 btn btn-secondary" type="button" onClick={handleRegister(navigate)}>
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
