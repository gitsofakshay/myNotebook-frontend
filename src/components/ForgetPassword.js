import React, { useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/notes/alertContext';
require('dotenv').config();

export default function ForgetPassword() {
    const navigate = useNavigate();
    const context = useContext(alertContext);
    const { showAlert } = context;
    const ref = useRef(null);
    const refClose = useRef(null);

    const [credentials, setCredentials] = useState({ email: "", otp: "" });
    const { email, otp } = credentials;
    const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        //api request for verification of otp
        const response = await fetch(`${API_URL}/forgetpwd/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, otp: otp }),
        });

        const resStatus = await response.json();
        if (resStatus.success) {
            refClose.current.click();
            showAlert(resStatus.message, 'success');
            navigate('/ChangePassword');
        } else {
            showAlert(resStatus.error, 'danger');
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_URL}/forgetpwd/request-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });

        const jason = await response.json();
        if (jason.success) {
            showAlert(jason.message, 'success');
            ref.current.click();
        } else {
            showAlert(jason.error, 'danger');
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
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

            <div className='container' style={{marginTop:"50px",marginBottom:"300px"}}>
                <h2>Forget your password</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={email} onChange={onChange} aria-describedby="emailHelp" required />
                    </div>
                    <button className="btn btn-primary " onClick={handleClick}>Send OTP</button>
                </form>
            </div>
        </>
    )
}
