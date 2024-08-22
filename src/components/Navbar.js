import { React } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();

    const keepAlive = () => {
        // Ping a lightweight endpoint
        fetch(`${API_URL}/keep-alive`)
            .then(response => response.json())
            .then(data => console.log('Keep-alive response:', data))
            .catch(error => console.error('Error:', error));
    };

    // Schedule keep-alive during active hours (e.g., 8 AM to 10 PM IST)
    setInterval(() => {
        const now = new Date();
        const hours = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
        if (hours >= 8 && hours <= 22) {
            keepAlive();
        }
    }, 600000); // 10-minute interval

    const handaleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">myNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">About Us</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                        </form> : <button className='btn btn-primary mx-1' onClick={handaleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;