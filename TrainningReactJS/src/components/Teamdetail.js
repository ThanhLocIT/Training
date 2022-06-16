import React from 'react';
import { getEmployeeOfTeamService } from '../services/TeamService';

class TeamDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalEmployee: 0,
            listEmployee: [],
        }
    }
    async componentDidMount() {
        let res = await getEmployeeOfTeamService(this.props.id)
        if (res) {
            this.setState({
                totalEmployee: res.totalItem,
                listEmployee: res.listEmployee
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.id !== this.props.id) {
            let res = await getEmployeeOfTeamService(this.props.id)
            if (res) {
                this.setState({
                    totalEmployee: res.totalItem,
                    listEmployee: res.listEmployee
                })
            }
        }
    }


    render() {
        let { totalEmployee, listEmployee } = this.state
        return (
            <>
                {this.props.isShowDetail &&
                    <>
                        <div>Result all employee team Manage - Total {totalEmployee} employees</div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Full    Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Sex</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listEmployee && listEmployee.length > 0 &&
                                    listEmployee.map((item, idex) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{idex + 1}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.address}</td>
                                                <td>{item.sex}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </>
                }

            </>
        )
    }
}

export default TeamDetail;