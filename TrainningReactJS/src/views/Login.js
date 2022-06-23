import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.scss';
import { login } from '../services/EmloyeesService';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            passWord: '',
            errMessage: '',
            isShowPassword: false,
            redirect: false,
        }
    }


    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        var md5 = require('md5');
        let accessToken = await login(this.state.phone, md5(this.state.passWord));
        if (accessToken !== -1) {
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            localStorage.setItem('isLogin', JSON.stringify(true));
            this.setState({
                redirect: true,
                errMessage: 'Incorrect phone number or password !'
            })
        } else {
            localStorage.setItem('accessToken', JSON.stringify({}));
            localStorage.setItem('isLogin', JSON.stringify(false));
            this.setState({
                errMessage: 'Incorrect phone number or password !'
            })
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleFoCus = () => {
        this.setState({
            errMessage: ''
        })
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <Navigate to="../../employee" replace={true} />
            )
        } else {
            return (
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row">
                            <div className="col-12 text-center text-login">LOGIN</div>
                            <div className="col-12 form-group login-input">
                                <label>Phone:</label>
                                <input type="text" className="form-control " placeholder="Enter your phone..." value={this.state.phone} onChange={(event) => this.handleOnChangeInput(event)} name="phone" onFocus={() => this.handleFoCus()}></input>
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Password:</label>
                                <div className="custom-input-password">
                                    <input
                                        className="form-control"
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        placeholder="Enter your password..."
                                        value={this.state.passWord}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        onFocus={() => this.handleFoCus()} name="passWord"
                                        onKeyDown={(event) => this.handleKeyDown(event)}
                                    >
                                    </input>
                                    <span onClick={() => this.handleShowHidePassword()}>
                                        <i className={this.state.isShowPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                                    </span>
                                </div>
                                <div className="col-12 errMessage" style={{ color: 'red' }}>
                                    {this.state.errMessage}
                                </div>
                                <div className="col-12">
                                    <button className="btn-login" onClick={() => this.handleLogin()}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Login;
