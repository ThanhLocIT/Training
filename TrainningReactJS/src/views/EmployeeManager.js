import React from 'react';
import './EmployeeManager.scss';
import ModalUpSertEmployee from '../components/Modal/ModalUpSertEmployee';
import Header from './Header';
import ModalConfirmDel from '../components/Modal/ModalConfirmDel';
import { Navigate } from 'react-router-dom';
import { getInforEmployeeService, getEmployeeByNameService, DelListEmployeeService, getEmployeeService, DelEmployeeService, totalEmployeeByNameService } from '../services/EmloyeesService';
import { toast } from 'react-toastify';
import { emitter } from '../utils/emitter';
import { Link } from 'react-router-dom';
class EmployeeManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: {},
            listEmployees: [],
            idEmployeeDel: [],
            modalShow: false,
            currentPage: 1,
            totalPage: [],
            totalEmployee: 0,
            search: '',
            delListEmployeeId: [],
            delAll: false,
            modalConfirmDel: false,
            sortSelected: '1',
            sort: [
                { "name": "Latest", "value": 1 },
                { "name": "Oldest", "value": 2 },
                { "name": "Name", "value": 3 },
            ]
        };
    }

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        if (token) {
            this.setState({
                accessToken: token
            })
        }
        this.getAllEmployee(this.state.currentPage, this.state.sortSelected)
        this.getTotalEmployee();
    }


    getAllEmployee = async (currentPage, sort) => {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        if (token && token.length > 0 && token.role !== null && token.role === 'R2') {
            let arr = [];
            arr.push(token)
            this.setState({
                listEmployees: arr
            })
        } else {
            let res = await getEmployeeService(currentPage, sort);
            if (res === -1) {
                res = []
            }
            this.setState({
                listEmployees: res
            })
        }
    }

    getAllEmployeeByName = async (name, page, sort) => {
        let res = await getEmployeeByNameService(name, page, sort);
        let total = await totalEmployeeByNameService(name)
        if (res === -1) {
            res = []
        }
        let totalEmployee = 0;
        let totalPage = [];
        if (total && total !== -1) {
            totalEmployee = total
        }
        if (totalEmployee > 0) {
            if (totalEmployee % 6 === 0) {
                for (let i = 0; i < (totalEmployee / 6); i++) {
                    totalPage.push(i + 1);
                }
            } else {
                for (let i = 0; i < (totalEmployee / 6); i++) {
                    totalPage.push(i + 1);
                }
            }
        }
        this.setState({
            currentPage: page,
            listEmployees: res,
            totalEmployee: totalEmployee,
            totalPage: totalPage
        })
    }


    getTotalEmployee = async () => {
        let res = await getInforEmployeeService();
        let totalEmployee = 0;
        let totalPage = [];
        if (res && res.length > 0 && res !== '-1') {
            totalEmployee = res.length
        }
        if (totalEmployee > 0) {
            if (totalEmployee % 6 === 0) {
                for (let i = 0; i < (totalEmployee / 6); i++) {
                    totalPage.push(i + 1);
                }
            } else {
                for (let i = 0; i < (totalEmployee / 6); i++) {
                    totalPage.push(i + 1);
                }
            }
        }
        this.setState({
            totalEmployee: totalEmployee,
            totalPage: totalPage
        })
    }

    setModalShow = () => {
        emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' });
        this.setState({
            modalShow: !this.state.modalShow
        })
        let { currentPage } = this.state;
        this.getAllEmployee(currentPage, this.state.sortSelected);
        this.getTotalEmployee();
    }

    handleOpenModal = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    handleChangeCurrentPageBtn = (type) => {
        if (type === "Previous") {
            if (this.state.currentPage > 1) {
                let current = this.state.currentPage - 1;
                this.setState({
                    currentPage: this.state.currentPage - 1
                })
                if (this.state.search !== '') {
                    this.getAllEmployeeByName(this.state.search, current, this.state.sortSelected)
                } else {
                    this.getAllEmployee(current, this.state.sortSelected)
                }

            }
        }
        if (type === "Next") {
            if (this.state.currentPage < this.state.totalPage.length) {
                let current = this.state.currentPage + 1;
                this.setState({
                    currentPage: this.state.currentPage + 1
                })
                if (this.state.search !== '') {
                    this.getAllEmployeeByName(this.state.search, current, this.state.sortSelected)
                } else {
                    this.getAllEmployee(current, this.state.sortSelected)
                }
            }
        }
    }

    handleChangeCurrentPage = (current) => {
        this.setState({
            currentPage: current
        })
        if (this.state.search !== '') {
            this.getAllEmployeeByName(this.state.search, current, this.state.sortSelected)
        } else {
            this.getAllEmployee(current, this.state.sortSelected)
        }
    }

    handleOnchangeCheckbox = async (event) => {
        let stateDelEmployeeCopy = []
        stateDelEmployeeCopy = this.state.delListEmployeeId
        let value = event.target.value
        if (event.target.checked) {
            if (typeof stateDelEmployeeCopy[value] === 'undefined') {
                stateDelEmployeeCopy.push(+value)
            }
        }
        else {
            let tempt = []
            tempt = stateDelEmployeeCopy.filter(item => item !== +value)
            stateDelEmployeeCopy = tempt
        }
        this.setState({
            delListEmployeeId: stateDelEmployeeCopy
        })

    }

    handleDelListEmployee = () => {
        this.setState({
            modalConfirmDel: true
        })
    }

    confirmDel = async () => {
        let { delListEmployeeId, currentPage } = this.state;
        let current = currentPage;
        if (delListEmployeeId.length > 0) {
            let result = await DelListEmployeeService(delListEmployeeId);
            if (result && result === 1) {
                this.confirmDelEmployee(currentPage);
                toast.success("Delete list employee success !");
                let totalEmployee = 0;
                let res = await getInforEmployeeService();
                if (res && res.length > 0 && res !== '-1') {
                    totalEmployee = res.length
                }
                if (totalEmployee / 6 === currentPage - 1) {
                    current = currentPage > 1 ? currentPage - 1 : 1
                } else {
                    if (totalEmployee / 6 > currentPage - 1 && totalEmployee / 6 < currentPage) {
                        current = currentPage
                    }
                }
                this.getAllEmployee(current, this.state.sortSelected);
            } else {
                toast.err("Delete list employee fail !")
            }
        } else {
            toast.error("Please select employee !")
        }
    }

    handleDelEmployee = async (id) => {
        if (id && id !== '') {
            let { currentPage } = this.state;
            let current = currentPage;
            let res = await DelEmployeeService(id);
            if (res && res === 1) {
                this.confirmDelEmployee(currentPage);
                toast.success("Delete employee success !");
                let totalEmployee = 0;
                let res = await getInforEmployeeService();
                if (res && res.length > 0 && res !== '-1') {
                    totalEmployee = res.length
                }
                if (totalEmployee / 6 === currentPage - 1) {
                    current = currentPage > 1 ? currentPage - 1 : 1
                } else {
                    if (totalEmployee / 6 > currentPage - 1 && totalEmployee / 6 < currentPage) {
                        current = currentPage
                    }
                }
                this.getAllEmployee(current, this.state.sortSelected);
            } else {
                toast.error("Delete employee fail !");
            }
        }

    }

    confirmDelEmployee = async (currentPage) => {
        let totalEmployee = 0;
        let res = await getInforEmployeeService();
        if (res && res.length > 0 && res !== '-1') {
            totalEmployee = res.length
        }
        if (totalEmployee / 6 === currentPage - 1) {
            if (this.state.currentPage === currentPage) {
                this.setState({
                    currentPage: currentPage > 1 ? currentPage - 1 : 1,
                    delListEmployeeId: []
                })
            }
        } else {
            if (totalEmployee / 6 > currentPage - 1 && totalEmployee / 6 < currentPage) {
                this.setState({
                    currentPage: currentPage,
                    delListEmployeeId: []
                })
            }
        }

        this.getTotalEmployee();

    }

    hanldeCheckDelAll = async (event) => {
        if (event.target.checked) {
            let stateDelEmployeeCopy = []
            this.setState({
                delListEmployeeId: []
            })

            let res = await getInforEmployeeService();
            if (res && res.length > 0 && res !== '-1') {
                res.forEach(element => {
                    if (typeof stateDelEmployeeCopy[element.id] === 'undefined') {
                        stateDelEmployeeCopy.push(element.id)
                    } else {
                        let tempt = stateDelEmployeeCopy.filter(item => item !== event.target.value)
                        stateDelEmployeeCopy = tempt
                    }
                });
            }
            await this.setState({
                delAll: true,
                delListEmployeeId: stateDelEmployeeCopy
            })

        } else {
            this.setState({
                delAll: false,
                delListEmployeeId: []
            })
        }
    }

    handleSearch = async (event) => {
        let name = event.target.value;
        this.getAllEmployeeByName(name, 1, this.state.sortSelected);
        this.setState({
            search: name
        })
    }

    handleCloseModalConfirm = () => {
        this.setState({
            modalConfirmDel: false,
        })
    }

    handleConfirmDel = () => {
        this.confirmDel();
        this.setState({
            modalConfirmDel: false,
        })
    }

    handleOnChangeSelectSort = (event) => {
        let value = event.target.value
        console.log(this.state.search)
        if (this.state.search === '') {
            this.getAllEmployee(this.state.currentPage, value)
        } else {
            this.getAllEmployeeByName(this.state.search, 1, value);
        }
        this.setState({
            sortSelected: value
        })
    }

    render() {

        let { totalPage, listEmployees, delAll, modalConfirmDel, accessToken, sort, sortSelected } = this.state;
        const role = accessToken && accessToken.role !== null ? accessToken.role : ''
        const login = localStorage.getItem('isLogin');
        if (login === 'false' || login === null) {
            return (
                <Navigate to="../../login" replace={true} />
            )
        }
        return (
            <>
                <Header />
                <div className='employeeManager-container'>
                    <div className='body-container'>
                        <div className='controller'>
                            <label>Employee</label>
                            {role === 'R1' &&
                                <div className='button'>
                                    <i className="fa fa-plus-circle"
                                        onClick={() => this.handleOpenModal()}
                                    >
                                    </i>
                                    <i className="fa fa-trash" onClick={() => this.handleDelListEmployee()}></i>
                                </div>
                            }
                        </div>
                        {role === 'R1' &&
                            <div className='search'>
                                <label className='total-employees'>Total {this.state.totalEmployee} employees</label>
                                <div className='search-input-box'>
                                    <i className="fa fa-search"></i>
                                    <input className='input' placeholder='Search employes by name'
                                        onChange={(event) => this.handleSearch(event)}
                                    ></input>
                                </div>
                                <div className='sort'>
                                    <label>Sort by:</label>
                                    <select className='sort-option'
                                        onChange={(event) => this.handleOnChangeSelectSort(event)}
                                        value={sortSelected}
                                    >
                                        {sort.map((item, index) => {
                                            return (
                                                <option value={item.value} key={item.value} >{item.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        }

                        {/* ------------------------------------------------------ */}

                        <div className='list-employees'>
                            <div className='label'>Search result</div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        {role === 'R1' &&
                                            <th>
                                                <input type="checkbox" onChange={(event) => this.hanldeCheckDelAll(event)} />
                                            </th>
                                        }
                                        <th scope="col">No</th>
                                        <th scope="col">FullName</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Team</th>
                                        <th scope="col">Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listEmployees && listEmployees.length > 0 &&
                                        listEmployees.map((elenment, index) => {
                                            return (
                                                <tr key={`${delAll}${elenment.id}`}>
                                                    {role === 'R1' &&
                                                        <td><input type="checkbox"
                                                            onChange={(event) => this.handleOnchangeCheckbox(event)}
                                                            value={elenment.id}
                                                            defaultChecked={delAll}

                                                        /></td>
                                                    }
                                                    <td>{index + 1}</td>
                                                    <td>{elenment.fullName}</td>
                                                    <td>{elenment.phone}</td>
                                                    <td>{elenment.teamName}</td>
                                                    <td>
                                                        <Link to={`/employee/employee-infor/infor?id=${elenment.id}`}><i className="fa fa-info"></i></Link>
                                                        {role === 'R1' && <i className="fa fa-trash" onClick={() => this.handleDelEmployee(elenment.id)} ></i>}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {role === 'R1' &&
                            <div className='navigation-box'>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <button className="page-link" aria-label="Previous"
                                                onClick={() => this.handleChangeCurrentPageBtn("Previous")}>
                                                <span aria-hidden="true">&laquo;</span>
                                                <span className="sr-only">Previous</span>
                                            </button>
                                        </li>

                                        {
                                            totalPage && totalPage.length > 0 &&
                                            totalPage.map((item, index) => {
                                                return (
                                                    <li key={index} className="page-item"><button className="page-link" onClick={() => this.handleChangeCurrentPage(item)}>{item}</button></li>
                                                )
                                            })
                                        }

                                        <li className="page-item">
                                            <button className="page-link" aria-label="Next"
                                                onClick={() => this.handleChangeCurrentPageBtn("Next")}>
                                                <span aria-hidden="true">&raquo;</span>
                                                <span className="sr-only">Next</span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        }
                    </div>
                </div>
                {
                    modalConfirmDel === true &&
                    <ModalConfirmDel
                        handleClose={this.handleCloseModalConfirm}
                        handleConfirmDel={this.handleConfirmDel}
                    />
                }
                <ModalUpSertEmployee
                    modalShow={this.state.modalShow}
                    setModalShow={this.setModalShow}
                />
            </>
        )
    }
}

export default EmployeeManager;