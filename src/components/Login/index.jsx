import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login =() => {
    const [data, setData]= useState({
        email:'',
        password: ''
    })
    const[error, setError]= useState();
    
    useEffect(()=> {
        axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('TOKEN');
        
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
        
            return config;
        });
        axios.post('http://localhost:8081/users/checklogin')
        .then((response) => {
            if(response.status === 401|| response.status === 408){
                localStorage.removeItem("TOKEN");
            }else if(response.status === 200){
                window.location.href = "/main";
            }
        })
        .catch((err)=> {
            console.log(err);
            if(err && err.response && (err.response.status === 401|| err.response.status === 408)){
                localStorage.removeItem("TOKEN");
            }
        })
    },[])

    const handleChange= e => {
        const{name, value}= e.target;
        setData({...data,[name]: value});
    }
    const handleSubmit= async(e) =>{
        e.preventDefault();
        axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('TOKEN');
        
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
        
            return config;
        });
        axios.post('http://localhost:8081/users/login', data) 
        .then((response) => {
            localStorage.setItem("TOKEN", response.data.token);
            // Navigate('/main');
            window.location.href = "/main";
                // localStorage.setItem('token', response.data.token);
                // navigate('/')
        })
        .catch (err => console.log(err));
        // axios.post('http://localhost:8081/students/login', data)
        // .then(result=> {console.log(result)
        //     navigate('/')
        // })
        // .catch(error){

        // };
    }
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-6'>
                        <h1>Login</h1>
                        <form className="form-group" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className="form-control"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className="form-control"
                            />
                            <button type="submit" className="btn btn-success">
                                 Login
                            </button>
                        </form>
                    </div>
                    <div className='col-md-6'>
                    {error && <p className="text-danger">{error}</p>}
                        <Link to={"/"}>
                            <p> Create An Account?</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
};

export default Login;