import React , {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import alertContext from '../context/notes/alertContext';

export default function Login() {
    const navigate = useNavigate();
    const context = useContext(alertContext);
    const {showAlert} = context;

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
        });
        
        const jason = await response.json();
        if (jason.success) {
            //Save the auth token and redirect
            localStorage.setItem('token',jason.authToken)
            navigate('/');
            showAlert('Login to your account successfully', 'success');
        }else{
            showAlert(jason.error, 'danger');
        }
        setCredentials({email: "",password: ""});
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const forgetpassword = () =>{
        navigate('/forgetpassword');
    }

    return (
        <div className='container' style={{marginTop:"50px",marginBottom:"245px"}}>
            <h2>Login to add and see your notes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary mx-2">Login</button>
                <button className="btn btn-primary" onClick={forgetpassword}>Forget Password</button>
            </form>
        </div>
    )
}
