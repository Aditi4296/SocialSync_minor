import React, { useState, useEffect } from 'react';
import './registerForm.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../../redux/actions/authAction';


const RegisterForm = () => {
    const { auth,alert } = useSelector(state => state)

    const dispatch = useDispatch()

    const history = useNavigate()

    const initialState = { 
        fullname: '',
        username: '',
        email: '', 
        password: '',
        confirmpassword: '', 
        gender: 'male'
    }
    const [userData, setUserData] = useState(initialState)
    const { fullname, username, email, password, confirmpassword } = userData

    useEffect(() => {
        if(auth.token) history("/")
    }, [auth.token, history])


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <input type="text" name="fullname" className='form-control' onChange={handleChangeInput} value={fullname} style={{background:`${alert.fullname?'#fd2d6a14':''}`}} placeholder="Full Name" id="fullname" required /><br />
                </div>
                <div className="mb-1">
                    <input type="text" name="username" className='form-control' onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')} placeholder="User Name" id="username" required /><br />
                </div>
                <div className="mb-1">
                    <input type="email" name="email" id="email" className='form-control' onChange={handleChangeInput} value={email} placeholder='Email Address' required /><br />
                </div>
                <div className="mb-1">
                    <input type="password" name="password" id="password" className='form-control' onChange={handleChangeInput} value={password} placeholder='Password' required /><br />
                </div>
                <div className="mb-1">
                    <input type="password" name="confirmpassword" id="confirmpassword" className='form-control' onChange={handleChangeInput} value={confirmpassword} placeholder='Confirm Password' required /><br />
                </div>
                <div className="mb-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Male: <input type="radio" name="gender" id="male" value="male" defaultChecked onChange={handleChangeInput} />
                    Female: <input type="radio" name="gender" id="female" value="female" defaultChecked onChange={handleChangeInput}/>
                    Others: <input type="radio" name="gender" id="other" value="other" defaultChecked onChange={handleChangeInput} />
                </div>

                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </div>
    )
}

export default RegisterForm
