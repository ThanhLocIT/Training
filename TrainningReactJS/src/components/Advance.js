import React from 'react';
import ModalAdvance from './Modal/ModalAdvance';
import { getInforAdvancesByEmployee, delAdvancesById, approvalAdvance } from "../services/AdvancesService"
import { emitter } from '../utils/emitter';
import { toast } from 'react-toastify';
import Moment from 'moment';
class Advance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: {},
            isShowModalAddAdvance: false,
            inforAdvances: '',
            idEmployee: ''
        }
    }
    async componentDidMount() {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        let res = await getInforAdvancesByEmployee(id);
        this.setState({
            idEmployee: id,
            inforAdvances: res,
            accessToken: accessToken
        })

    }

    handleDeleteAdvances = async (id) => {
        let res = await delAdvancesById(id);
        if (res === 1) {
            toast.success("Delete advances success !")
            let res = await getInforAdvancesByEmployee(this.state.idEmployee);
            this.setState({
                inforAdvances: res
            })
        } else {
            toast.error("Delete advances fail !")
        }
    }


    setModalShow = () => {
        emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' });
        this.setState({
            isShowModalAddAdvance: !this.state.isShowModalAddAdvance
        })
    }

    confirmAddAdvances = async () => {
        let res = await getInforAdvancesByEmployee(this.state.idEmployee);
        this.setState({
            inforAdvances: res
        })
    }

    handleApprovalAdvance = async (id) => {
        if (this.state.accessToken.role === 'R1') {
            let approval = await approvalAdvance(id)
            if (approval === 0) {
                toast.success("Approval advance success !")
                let res = await getInforAdvancesByEmployee(this.state.idEmployee);
                this.setState({
                    inforAdvances: res
                })
            } else {
                toast.error("Approval advance error !")
            }

        }
    }

    render() {
        let { inforAdvances, accessToken } = this.state;
        const role = accessToken.role ? accessToken.role : ''
        return (
            <>
                <div className='container-infor-detail'>
                    <div className='hearder'>
                        <div className='title'>ADVANCES</div>
                        <div className='btn-add' onClick={() => this.setModalShow()}><i className="fa fa-plus-circle"></i></div>
                    </div>
                    <div className='body'>
                        <div className='infor'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Money</th>
                                        <th scope="col">Approval</th>
                                        {role === 'R1' && <th scope="col">Option</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {inforAdvances && inforAdvances.length > 0 &&
                                            inforAdvances.map((item, index) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{Moment(item.date).format('DD/MM/YYYY')}</td>
                                                        <td>{item.money}</td>
                                                        <td>{item.status === 1 ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-hourglass-half" aria-hidden="true" onClick={() => this.handleApprovalAdvance(item.id)}></i>}</td>
                                                        {role === 'R1' && <td><i className="fa fa-trash" onClick={() => this.handleDeleteAdvances(item.id)}></i></td>}
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
                <ModalAdvance
                    modalShow={this.state.isShowModalAddAdvance}
                    setModalShow={this.setModalShow}
                    confirmAddAdvances={this.confirmAddAdvances}
                    roleId={role}
                />
            </>
        )
    }
}

export default Advance;