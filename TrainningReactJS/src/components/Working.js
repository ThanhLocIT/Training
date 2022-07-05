import React from 'react';
import './Informations.scss';
import Moment from 'moment';
import ModalAddWorking from './Modal/ModalAddWorking';
import { emitter } from '../utils/emitter';
import { toast } from 'react-toastify';
import { getInforWorkingByEmployee, delWorkingById, approvalWorking } from '../services/WorkingService';
class Working extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: {},
            isShowModalAddWorking: false,
            inforWorking: '',
            idEmployee: ''
        }
    }
    async componentDidMount() {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        let res = await getInforWorkingByEmployee(id);
        this.setState({
            idEmployee: id,
            inforWorking: res,
            accessToken: accessToken
        })
    }

    setModalShow = () => {
        emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' });
        this.setState({
            isShowModalAddWorking: !this.state.isShowModalAddWorking
        })
    }

    handleDeleteWorking = async (id) => {
        let res = await delWorkingById(id);
        if (res === 1) {
            toast.success("Delete working success !")
            let res = await getInforWorkingByEmployee(this.state.idEmployee);
            this.setState({
                inforWorking: res
            })
        } else {
            toast.error("Delete working fail !")
        }
    }

    confirmAddWorking = async () => {
        let res = await getInforWorkingByEmployee(this.state.idEmployee);
        this.setState({
            inforWorking: res
        })
    }

    handleApprovalWorking = async (id) => {
        if (this.state.accessToken.role === 'R1') {
            let approval = await approvalWorking(id)
            if (approval === 0) {
                toast.success("Approval working success !")
                let res = await getInforWorkingByEmployee(this.state.idEmployee);
                this.setState({
                    inforWorking: res
                })
            } else {
                toast.error("Approval working error !")
            }
        }
    }

    render() {
        let { inforWorking, idEmployee, accessToken } = this.state
        const role = accessToken.role ? accessToken.role : ''
        return (
            <>
                <div className='container-infor-detail'>
                    <div className='hearder'>
                        <div className='title'>Working</div>
                        <div className='btn-add' onClick={() => this.setModalShow()}><i className="fa fa-plus-circle"></i></div>
                    </div>
                    <div className='body'>
                        <div className='infor'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Hour</th>
                                        <th scope="col">Approval</th>
                                        {role === 'R1' && <th scope="col">Option</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {inforWorking && inforWorking.length > 0 &&
                                            inforWorking.map((item, idex) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{idex + 1}</td>
                                                        <td>{Moment(item.date).format('DD/MM/YYYY')}</td>
                                                        <td>{item.hour}</td>
                                                        <td>{item.status === 1 ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-hourglass-half" aria-hidden="true" onClick={() => this.handleApprovalWorking(item.id)}></i>}</td>
                                                        {role === 'R1' && <td><i className="fa fa-trash" onClick={() => this.handleDeleteWorking(item.id)}></i></td>}
                                                    </tr>

                                                )
                                            })
                                        }
                                    </>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <ModalAddWorking
                    modalShow={this.state.isShowModalAddWorking}
                    setModalShow={this.setModalShow}
                    idEmployee={idEmployee}
                    confirmAddWorking={this.confirmAddWorking}
                    roleId={role}
                />
            </>
        )
    }
}

export default Working;