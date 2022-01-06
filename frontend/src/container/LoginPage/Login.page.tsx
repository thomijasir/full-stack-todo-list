import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// import useLog from '../../hooks/useLog';
import TodoLogo from '../../assets/image/logo.svg';
import './Login.style.scss';

export const handleRegister = (navigate: any) => (e: MouseEvent) => {
  e.preventDefault();
  navigate('/register');
};

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="login-page text-center">
      <main className="form-signin">
        <form>
          <img className="mb-4" src={TodoLogo} alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Central Login</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="alert alert-danger" role="alert">
            Opps, Credentials not found..
          </div>
          <div className="row">
            <div className="col-md-6">
              <button className="w-100 btn btn-primary disabled" type="submit">
                Sign in <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
