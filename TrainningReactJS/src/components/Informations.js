import React from 'react';
import './Informations.scss';
import Moment from 'moment';
import { emitter } from '../utils/emitter';
import { getInforEmployeeServiceById } from '../services/EmloyeesService';

class Informations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            inforEmployee: '',
        }
    }

    listenToEmitter() {
        emitter.on('EVENT_RELOAD', async () => {
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const id = params.get('id');
            let res = await getInforEmployeeServiceById(id)
            this.setState({
                id: id,
                inforEmployee: res
            })
        })
    }

    async componentDidMount() {
        this.listenToEmitter()
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        let res = await getInforEmployeeServiceById(id)
        this.setState({
            id: id,
            inforEmployee: res
        })
    }


    render() {
        let { inforEmployee } = this.state;
        return (
            <>
                <div className='container-infor-detail'>
                    <div className='hearder'>
                        <div className='title'>
                            INFORMATIONS
                        </div>
                    </div>
                    <div className='body'>
                        <div className='infor'>
                            {inforEmployee !== -1 &&
                                <>
                                    <div className='detail'>Start Date: {Moment(inforEmployee.day).format('DD/MM/YYYY')}</div>
                                    <div className='detail'>Team: {inforEmployee.teamName}</div>
                                    <div className='detail'>Address: {inforEmployee.address}</div>
                                    <div className='detail'>Salary per hour: {inforEmployee.money} $</div>
                                </>
                            }
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Informations;