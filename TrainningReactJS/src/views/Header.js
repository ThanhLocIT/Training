import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: {},
            btnActive: "employee",
        };
    }

    componentDidMount() {
        let active = (window.location.href).slice((window.location.href).lastIndexOf("/") + 1);
        this.setState({
            btnActive: active
        })
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        this.setState({
            accessToken: accessToken
        })
    }

    btnActive = (active) => {
        this.setState({
            btnActive: active
        })
    }

    handleLogOut = () => {
        localStorage.setItem('accessToken', JSON.stringify({}));
        localStorage.setItem('isLogin', JSON.stringify(false));
    }

    render() {
        let { accessToken } = this.state
        const role = accessToken.role ? accessToken.role : ''
        let { btnActive } = this.state
        return (
            <div className='header-container'>
                <div className='left'>
                    <div className='logo'>
                        E
                    </div>
                    <div className='title'>
                        Employee manager
                    </div>
                </div>
                <div className='right'>
                    <Link to="/"><button className={btnActive === "employee" ? 'btn-employee btn-active' : 'btn-employee'} onClick={() => this.btnActive("employee")}>Employee</button></Link>
                    {role === 'R1' && <Link to="/team"><button className={btnActive === "team" ? 'btn-team btn-active' : 'btn-team'} onClick={() => this.btnActive("team")}> Team</button></Link>}
                    <Link to="/login"><i className="fa fa-sign-out log-out" onClick={() => this.handleLogOut()}></i></Link>
                </div>
            </div>
        )
    }
}

export default Header;