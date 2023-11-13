import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image2 from '../../Assets/Images/image 2.jpg';
import Logo from '../../Assets/Images/Logo.jpg';
import styles from './styles.css';

const Signup = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState();
    const navigate = useNavigate();
    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    useEffect(()=> {
        axios.post('http://localhost:8081/users/checklogin')
        .then((response) => {
            if(response.status === 401|| response.status === 408){
                localStorage.removeItem("TOKEN");
            }else if(response.status === 200){
                window.location.href = "/main/students";
            }
        })
        .catch((err)=> {
            console.log(err);
            if(err && err.response && (err.response.status === 401|| err.response.status === 408)){
                localStorage.removeItem("TOKEN");
            }
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/users/signup', data)
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(err => console.log(err));

    }
    return (
        <div className="signUp_container">
            <div className="logo">eSchool</div>
            <div className="content"><div className="log"><img src={Logo} /></div><h5 className='school'>School Management Tool</h5>

                <h3 className='learning'>For Improved Learning and<br></br> Teaching experience !</h3>
                <h6 className='learn'>Learn More</h6></div>
            <div className="im"><img src={Image2} /></div>



            <div className="signup_form_containers">
                {console.log(data)}
                <div className="right">
                    <form className="form_container" onSubmit={handleSubmit}>
                        <div className="ups">
                            <h1 className='account'>Create Account</h1>
                            <input
                                type='text'
                                placeholder='Name'
                                name='name'
                                onChange={handleChange}
                                value={data.name}
                                required
                                className="input1"
                            />
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
                                Create
                            </button>
                        </div>

                    </form>
                    <p className='loginAcc'> Already Have An Account? <Link to={"/login"}>
                        <button type='button' className="white_btn">
                            log in
                        </button>
                    </Link> </p>
                </div>
            </div>
        </div>
    )
}
export default Signup;