import React, { useState, useEffect } from 'react';
import './loginForm.css'
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const history = useNavigate()

    useEffect(() => {
        if(auth.token) history("/")
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
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <input type="email" name="email" id="email" onChange={handleChangeInput} className='form-control' value={email} placeholder='Email Address' required /><br />
                </div>
                <div className="mb-1">
                    <input type="password" name="password" onChange={handleChangeInput} id="password" className='form-control' value={password} placeholder='Password' required /><br />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
