import React from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import TodoLogo from '../../assets/image/logo.svg';
import './Register.style.scss';
const RegisterPage = () => {
  const navigate = useNavigate();
  const makeRegister = useApi('POST', 'user/register', { isLoading: false }, false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.getElementsByTagName('input')[0].value;
    const email = e.currentTarget.getElementsByTagName('input')[1].value;
    const password = e.currentTarget.getElementsByTagName('input')[2].value;
    makeRegister.onFetch({
      username,
      email,
      password
    });
  };

  if (makeRegister.response.responses) {
    setTimeout(() => {
      navigate('/');
    }, 1500);
  }
  return (
    <div className="register-page text-center">
      <main className="form-register">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src={TodoLogo} alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Register new account</h1>

          <div className="form-floating">
            <input type="text" className="form-username form-control" placeholder="username" />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input type="email" className="form-email form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-password form-control" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {makeRegister.response.responses ? (
            <div className="mb-3 alert alert-success" role="alert">
              New user is created...
            </div>
          ) : (
            ''
          )}

          <div className="row">
            <div className="col-md-12">
              <button className="w-100 btn btn-primary" disabled={makeRegister.response.isLoading} type="submit">
                Sign in {makeRegister.response.isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegisterPage;
