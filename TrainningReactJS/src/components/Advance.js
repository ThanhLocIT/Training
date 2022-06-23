import React from 'react';
import ModalAdvance from './Modal/ModalAdvance';
import { getInforAdvancesByEmployee, delAdvancesById } from "../services/AdvancesService"
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
    render() {
        let { inforAdvances, accessToken } = this.state;
        const role = accessToken.role ? accessToken.role : ''
        return (
            <>
                <div className='container-infor-detail'>
                    <div className='hearder'>
                        <div className='title'>ADVANCES</div>
                        {role === 'R1' && <div className='btn-add' onClick={() => this.setModalShow()}><i className="fa fa-plus-circle"></i></div>}
                    </div>
                    <div className='body'>
                        <div className='infor'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Money</th>
                                        {role === 'R1' && <th scope="col">Option</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {inforAdvances && inforAdvances.length > 0 &&
                                            inforAdvances.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{Moment(item.date).format('DD/MM/YYYY')}</td>
                                                        <td>{item.money}</td>
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
                />
            </>
        )
    }
}

export default Advance;