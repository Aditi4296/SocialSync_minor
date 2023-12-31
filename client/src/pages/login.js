import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import './login.css'
import loginImg from '../images/login.png'
import logo from '../images/logoSocialSync.png'


const Login = () => {
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typePass, setTypePass] = useState(false)

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(() => {
        if (auth.token) history("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

    return (
        <div className='main-component'>
            <div className="login--div">
                <div className='login--form'>
                    <h4>WELCOME BACK !</h4>
                    <div className="auth_page">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                                    aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />

                                <small id="emailHelp" className="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>

                                <div className="pass">

                                    <input type={typePass ? "text" : "password"}
                                        className="form-control" id="exampleInputPassword1"
                                        onChange={handleChangeInput} value={password} name="password" />

                                    <small onClick={() => setTypePass(!typePass)}>
                                        {typePass ? 'Hide' : 'Show'}
                                    </small>
                                </div>

                            </div>

                            <button type="submit" className="btn btn-dark w-100"
                                disabled={email && password ? false : true}>
                                Login
                            </button>

                            <p className="my-2">
                                Don't have an account? <Link to="/register" style={{ color: "crimson" }}>Register Now</Link>
                            </p>
                        </form>
                    </div>
                </div>
                <div className='login--image'>
                    <div className="logo" style={{ height: '10px', width: '10px' }}>
                        <img src={logo} />
                    </div>
                    <div className="image-r">
                        <img src={loginImg} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login