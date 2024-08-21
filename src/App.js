import { useContext } from 'react';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import alertContext from './context/notes/alertContext';
import Footer from './components/Footer';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import ChangePassword from './components/ChangePassword';

function App() {
  const context = useContext(alertContext);
  const { alert } = context;
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
            <Route exact path='/forgetpassword' element={<ForgetPassword />}></Route>
            <Route exact path='/ChangePassword' element={<ChangePassword />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
