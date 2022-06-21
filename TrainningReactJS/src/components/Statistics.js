import React from 'react';
import { getHourWorking, getMoneyAdvances, } from '../services/StatisticsService';
import { getInforEmployeeServiceById } from '../services/EmloyeesService';
import e from 'cors';
class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            date: '',
            detailWorking: {},
            detailAdvances: {},
            inforEmployee: {}
        }
    }
    async componentDidMount() {
        let newDate = new Date()
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let monthYear
        let check = month / 10
        if (check < 1) {
            monthYear = year + '-0' + month
        }
        else {
            monthYear = year + "-" + month
        }
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        let res = await getInforEmployeeServiceById(id)
        this.setState({
            id: id,
            inforEmployee: res,
            date: monthYear

        })
        this.getHourWorking(id, month, year)
        this.getMoneyAdvances(id, month, year)
    }

    getHourWorking = async (id, month, year) => {
        let response = await getHourWorking(id, month, year)
        this.setState({
            detailWorking: response
        })

    }

    getMoneyAdvances = async (id, month, year) => {
        let response = await getMoneyAdvances(id, month, year)
        this.setState({
            detailAdvances: response
        })

    }

    handleOnChangeSelect = (event) => {
        let { id } = this.state
        let date = event.target.value
        let month = date.substring(date.indexOf('-') + 1)
        let year = date.substring(0, date.indexOf('-'))
        this.getHourWorking(id, month, year)
        this.getMoneyAdvances(id, month, year)
        this.setState({
            date: date
        })
    }

    render() {
        let { detailAdvances, detailWorking, inforEmployee } = this.state;
        let hour = 0
        let advances = 0
        if (detailWorking.hour) {
            hour = detailWorking.hour
        }
        if (detailAdvances.money) {
            advances = detailAdvances.money
        }
        let sum = '' + (inforEmployee.money * hour - advances)
        return (
            <>
                <div className='container-infor-detail'>
                    <div className='hearder'>
                        <div className='title'>STATISTICS</div>
                        <div>
                            <input type="month" value={this.state.date}
                                onChange={(event) => this.handleOnChangeSelect(event)}
                            />
                        </div>
                    </div>
                    <div className='body'>
                        <div className='infor'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Salary</th>
                                        <th scope="col">Hour</th>
                                        <th scope="col">Advances</th>
                                        <th scope="col">Sum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td>{inforEmployee.money}</td>
                                        <td>{hour}</td>
                                        <td>{advances}</td>
                                        <td style={{ color: 'red' }}>{sum}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Statistics;