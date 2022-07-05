import React from 'react';
import './InforEmployee.scss';
import Header from './Header';
import { getInforEmployeeServiceById, DelEmployeeService } from '../services/EmloyeesService';
import { Link, Outlet, Navigate } from 'react-router-dom';
import ModalUpSertEmployee from '../components/Modal/ModalUpSertEmployee';
import { toast } from 'react-toastify';
class InforEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: {},
            id: '',
            link_active: 'infor',
            inforEmployee: {},
            modalEdit: false,
            redirect: false,
            isRender: false
        }
    }

    async componentDidMount() {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        const search = window.location.search;
        let active = (window.location.href).slice((window.location.href).lastIndexOf("/") + 1, (window.location.href).lastIndexOf("?"));
        const params = new URLSearchParams(search);
        const id = params.get('id');
        let res = await getInforEmployeeServiceById(id)
        this.setState({
            accessToken: accessToken,
            id: id,
            link_active: active,
            inforEmployee: res
        })
    }

    linkActive = (active) => {
        this.setState({
            link_active: active
        })
    }

    handleOpenModalEdit = () => {
        this.setState({
            modalEdit: true
        })
    }

    setModalShow = () => {
        this.setState({
            modalEdit: false,
            isRender: false
        })
    }

    handleDelEmployee = async (id) => {
        let res = await DelEmployeeService(id);
        if (res && res === 1) {
            toast.success("Delete employee success !");
            this.setState({
                redirect: true
            })
        } else {
            toast.error("Delete employee fail !");
        }
    }

    confirmUpdate = async () => {
        let res = await getInforEmployeeServiceById(this.state.id)
        this.setState({
            inforEmployee: res,
            isRender: true
        })
    }



    render() {
        let { id, link_active, inforEmployee, redirect } = this.state
        let avatar_default = inforEmployee.image !== "" && typeof inforEmployee.image !== "undefined" && inforEmployee.image !== null ? inforEmployee.image : "avatar1.jpg"
        let url = (window.location.href).substring(window.location.href.lastIndexOf("/") + 1);
        const login = localStorage.getItem('isLogin');
        let { accessToken } = this.state
        const role = accessToken.role ? accessToken.role : ''
        if (login === 'false' || login === null) {
            return (
                <Navigate to="../../login" replace={true} />
            )
        }
        if (redirect) {
            return (
                <Navigate to="../../employee" replace={true} />
            )
        }
        return (

            <>
                <Header />
                <div className='employee-infor-container'>
                    <div className='header'>
                        {inforEmployee !== -1 &&
                            <div className='header-left name-employee'>{inforEmployee.fullName}</div>
                        }
                        <div className='header-right'>
                            <i className="fa fa-pencil-square-o btn-update" onClick={() => this.handleOpenModalEdit()}></i>
                            {role === 'R1' && <i className="fa fa-trash btn-delete" onClick={() => this.handleDelEmployee(inforEmployee.id)} ></i>}
                        </div>
                    </div>
                    <div className='body'>
                        <div className='body-left'>
                            {inforEmployee !== -1 &&
                                <>
                                    <div className='avatar' style={{ backgroundImage: "url(" + `http://localhost:8080/upload-file/files/${avatar_default}` + ")" }}></div>
                                    <div className='more-infor'>
                                        <div className='no-age'>
                                            <div className='no'>No: {inforEmployee.id}</div>
                                            <div className='age'>Age: {inforEmployee.age}</div>
                                        </div>
                                        <div className='sex'>sex: {inforEmployee.sex}</div>
                                    </div>
                                </>
                            }

                        </div>
                        <div className='body-right'>
                            <div className='body-nav'>
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <Link className={link_active === 'infor' ? "nav-link active" : "nav-link"} to={`/employee/employee-infor/infor?id=${id}`}
                                            onClick={() => this.linkActive("infor")}
                                        >INFORMATIONS</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={link_active === 'working' ? "nav-link active" : "nav-link"} to={`/employee/employee-infor/working?id=${id}`}
                                            onClick={() => this.linkActive("working")}
                                        >WORKING</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={link_active === 'advances' ? "nav-link active" : "nav-link"} to={`/employee/employee-infor/advances?id=${id}`}
                                            onClick={() => this.linkActive("advances")}
                                        >ADVANCES</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={link_active === 'statistics' ? "nav-link active disabled" : "nav-link"} to={`/employee/employee-infor/statistics?id=${id}`}
                                            onClick={() => this.linkActive("statistics")}
                                        >STATISTICS</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='boby-container'>
                                <Outlet />
                            </div>
                            <ModalUpSertEmployee
                                modalShow={this.state.modalEdit}
                                setModalShow={this.setModalShow}
                                idEmployee={this.state.id}
                                confirmUpdate={this.confirmUpdate}
                                role={role}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default InforEmployee;


