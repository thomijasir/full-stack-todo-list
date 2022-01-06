import React from 'react';
import TodoLogo from '../../assets/image/logo.svg';
import './Register.style.scss';
const RegisterPage = () => {
  return (
    <div className="register-page text-center">
      <main className="form-register">
        <form>
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
          <div className="form-floating">
            <input type="password" className="form-password form-control" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-re-password form-control" placeholder="Re Password" />
            <label htmlFor="floatingPassword">Re-Password</label>
          </div>

          <div className="alert alert-danger" role="alert">
            Opps, Credentials not found..
          </div>
          <div className="row">
            <div className="col-md-12">
              <button className="w-100 btn btn-primary disabled" type="submit">
                Sign up <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegisterPage;
