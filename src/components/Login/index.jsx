import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Image2 from '../../Assets/Images/image 2.jpg';
import Logo from '../../Assets/Images/Logo.jpg';
import './styles.css'
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState();
    useEffect(async () => {
        try {
          const response = await axios.post('http://localhost:8081/users/checklogin');
      
          if (response.status === 401 || response.status === 408) {
            localStorage.removeItem('TOKEN');
          } else if (response.status === 200) {
            window.location.href = '/main/students';
          }
        } catch (error) {
          console.error(error);
      
          if (error && error.response && (error.response.status === 401 || error.response.status === 408)) {
            localStorage.removeItem('TOKEN');
          }
        }
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:8081/users/login', data);
          const token = response.data.token;
          const name = response.data.name;
      
          localStorage.setItem('TOKEN', token);
          localStorage.setItem('NAME', name);
          window.location.href = '/main/students';
        } catch (error) {
          console.error(error);
        }
    };
    return (
        <div className="signUp_container">
            <div className="logo">eSchool</div>
            <div className="content"><div className="log"><img src={Logo} /></div><h5 className='school'>School Management Tool</h5>

                <h3 className='learning'>For Improved Learning and<br></br> Teaching experience !</h3>
                <h6 className='learn'>Learn More</h6></div>
            <div className="im"><img src={Image2} /></div>



            <div className="signup_form_container">
                <div className="right">
                    <form className="form_container" onSubmit={handleSubmit}>
                        <div className="up">
                            <h1 className='welcome'>Welcome Back!</h1>
                            <input
                                type='email'
                                placeholder='Email'
                                name='email'
                                onChange={handleChange}
                                value={data.email}
                                required
                                className="input1"
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                onChange={handleChange}
                                value={data.password}
                                required
                                className="input1"
                            />
                            {error && <div className="error_msg">{error}</div>}
                            <button type='submit' className="blue_btn">
                                Login
                            </button>
                        </div>

                    </form>
                    <p className='createAcc'><Link to={"/"}>
                        <button type='button' className="white_btn">
                            Create An Account?
                        </button>
                    </Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;