import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/notes/alertContext';
require('dotenv').config();

export default function ChangePassword() {
    const navigate = useNavigate();
    const context = useContext(alertContext);
    const { showAlert } = context;

    const [credentials, setCredentials] = useState({ email: "", newPassword: "", cPassword: "" });
    const { email, newPassword, cPassword } = credentials;
    const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword === cPassword) {
            const response = await fetch(`${API_URL}/forgetpwd/changepassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, newPassword: newPassword }),
            });

            const jason = await response.json();
            if (jason.success) {
                showAlert(jason.message, 'success');
                navigate('/login');
            } else {
                showAlert(jason.error, 'danger');
            }
        } else {
            showAlert('Password and Confirm Password does not match!', 'danger');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>

            <div className='container'>
                <h2>Set your new password</h2>
                <form onSubmit={handleSubmit}>
                    <div className='container'>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' value={email} onChange={onChange} aria-describedby="emailHelp" required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="newPassword" name='newPassword' value={newPassword} onChange={onChange} aria-describedby="passwordHelp" min={5} required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cPassword" name='cPassword' value={cPassword} onChange={onChange} aria-describedby="passwordHelp" min={5} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Reset Password</button>
                    </div>
                </form >
            </div >
        </>
    )
}
