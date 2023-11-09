import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.css';

const Signup =() => {
    const [data, setData]= useState({
        name: '',
        email:'',
        password: ''
    })
    const[error, setError]= useState();
    const navigate= useNavigate();
    const handleChange= e => {
        const {name, value} =e.target;
        setData({...data,[name]: value});
    }
    const handleSubmit= (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8081/users/signup', data)
        .then(result=> {console.log(result)
            navigate('/login')
        })
        .catch(err => console.log(err));
    //     const { name, email, password } = data;
    // try {
    // const response = await axios.post('http://localhost:8080/students/signup', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     password,
    //   }),
    // });
    // if (response.status === 201) {
    //   // The sign up was successful Store the JWT token in the local storage
    //   localStorage.setItem('token', response.headers.get('Authorization'));
    //   // Redirect the user to the main page
    //   navigate('/');
    // } else {
    //   // The sign up was unsuccessfu Throw an error
    //   throw new Error('An error occurred while signing up.');
    // }
    // } catch (error) {
    //         if(error.response && error.response.status>=400 && error.response.status<=500){
    //             setError(error.response.data.message);
    //         }
            
    //     }
    }
    return (
        <div className={styles.signUp_container}>
            <div className={styles.signup_form_container}>
                {console.log (data)}
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                    <div className={styles.up}>
                        <h1>Create Account</h1>
                        <input
                            type='text'
                            placeholder='Name'
                            name='name'
                            onChange={handleChange}
                            value={data.name}
                            required
                            className='styles.input'
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className='styles.input'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className='styles.input'
                        />
                    </div>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.blue_btn}>
                            Create
                        </button>
                    </form>
                    <p> Already Have An Account? <Link to={"/login"}>
                        <button type='button' className={styles.white_btn}>
                            log in
                        </button>
                    </Link> </p>
                </div>
            </div>
        </div>
    )
}
export default Signup;