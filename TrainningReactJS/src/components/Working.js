import React from 'react';
import './Informations.scss';
import Moment from 'moment';
import ModalAddWorking from './Modal/ModalAddWorking';
import { emitter } from '../utils/emitter';
import { toast } from 'react-toastify';
import { getInforWorkingByEmployee, delWorkingById } from '../services/WorkingService';
class Working extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModalAddWorking: false,
            inforWorking: '',
            idEmployee: ''
        }
    }
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        let res = await getInforWorkingByEmployee(id);
        this.setState({
            idEmployee: id,
            inforWorking: res
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

    render() {
        let { inforWorking, idEmployee } = this.state
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
                                        <th scope="col">Option</th>
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
                                                        <td><i className="fa fa-trash" onClick={() => this.handleDeleteWorking(item.id)}></i></td>
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
                />
            </>
        )
    }
}

export default Working;