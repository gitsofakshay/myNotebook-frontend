import React, { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/notes/alertContext';
import noteContext from '../context/notes/noteContext';

export default function Signup() {
  const navigate = useNavigate();
  const context = useContext(alertContext);
  const { showAlert } = context;
  const context2 = useContext(noteContext);
  const { setLoading } = context2;
  const ref = useRef(null);
  const refClose = useRef(null);

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", otp: "" });
  const { name, email, password, cpassword, otp } = credentials;
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //api request for verification of otp
    setLoading(true);
    const response2 = await fetch(`${API_URL}/auth/verifyotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, otp: otp }),
    });

    const resStatus2 = await response2.json();
    if (resStatus2.success) {
      showAlert('OTP verifiction is successful', 'success');
      refClose.current.click();
      //api request for create user account
      const response3 = await fetch(`${API_URL}/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });

      const resStatus3 = await response3.json();
      setLoading(false);
      if (resStatus3.success) {
        //Redirect to the login page
        showAlert('Account created successfully!', 'success');
        navigate('/login');
      } else {
        showAlert(resStatus3.error, 'danger');
      }
    } else {
      setLoading(false);
      showAlert(resStatus2.error, 'danger');
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
      //api request to send email verification otp
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/sendemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      console.log(email);
      const resStatus = await response.json();
      console.log(resStatus.success);
      setLoading(false);
      if (resStatus.success) {
        showAlert('OTP has been sent to entered email address', 'success');
        ref.current.click();
      } else {
        showAlert(resStatus.error, 'danger');
      }
    } else {
      showAlert('Password and Confirm Password does not match!', 'danger');
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        {/* style={{ display: 'none' }} */}
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Verify OTP sent to your email</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">Enter OTP</label>
                  <input type="number" className="form-control" id="otp" name='otp' value={otp} onChange={onChange} maxLength={6} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={otp.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit}>Verify OTP</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container mb-10' style={{marginTop:"40px",marginBottom:"65px"}}>
        <h2 className='container mt-4'>Signup to create your user account on myNotebook</h2>
        <form className='container my-4'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' value={name} onChange={onChange} aria-describedby="emailHelp" minLength={3} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={email} onChange={onChange} aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={password} onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name='cpassword' value={cpassword} onChange={onChange} minLength={5} required />
          </div>
          <button className="btn btn-primary" onClick={handleClick}>Signup</button>
        </form>
      </div>
    </>
  )
}
