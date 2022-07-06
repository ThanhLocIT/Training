import React from 'react';
import { Navigate } from 'react-router-dom';
import './Team.scss'
import Header from './Header';
import TeamDetail from '../components/Teamdetail';
import { getTeamService } from '../services/TeamService';
import ModalAddTeam from '../components/Modal/ModalAddTeam';
import { emitter } from '../utils/emitter';
class team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalTeam: 0,
            listTeam: [],
            teamDetailId: '',
            isShowDetail: true,
            isShowModalAddTeam: false
        }
    }

    confirmAddTeam = async () => {
        let res = await getTeamService()
        this.setState({
            totalTeam: res.totalItem,
            listTeam: res.listTeam
        })
    }

    setModalShow = () => {
        emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' });
        this.setState({
            isShowModalAddTeam: !this.state.isShowModalAddTeam
        })
    }

    async componentDidMount() {
        let res = await getTeamService()
        let defaultTeamDetail = ''
        if (res && res.listTeam) {
            defaultTeamDetail = res.listTeam[0].id
        }
        this.setState({
            totalTeam: res.totalItem,
            listTeam: res.listTeam,
            teamDetailId: defaultTeamDetail,
        })
    }

    handleDetailTeam = (id) => {
        this.setState({
            teamDetailId: id,
            isShowDetail: true
        })
    }

    render() {
        let { totalTeam, listTeam, isShowModalAddTeam, teamDetailId, isShowDetail } = this.state
        const login = localStorage.getItem('isLogin');
        if (login === 'false' || login === null) {
            return (
                <Navigate to="../../login" replace={true} />
            )
        }
        return (
            <>
                <Header />
                <div className='container-team'>
                    <div className='body-container'>
                        <div className='controller'>
                            <label>Team</label>
                            <div className='button'>
                                <i className="fa fa-plus-circle "
                                    onClick={() => this.setModalShow()}
                                >
                                </i>
                            </div>
                        </div>
                        <div className='content'>
                            <div className='left'>
                                <div>Total {totalTeam} teams</div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Name Team</th>
                                            <th scope="col">Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listTeam && listTeam.length > 0 &&
                                            listTeam.map((item, index) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td><i className="fa fa-info" onClick={() => this.handleDetailTeam(item.id)}></i></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='right'>
                                {teamDetailId !== '' &&
                                    <TeamDetail
                                        isShowDetail={isShowDetail}
                                        id={teamDetailId}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {isShowModalAddTeam &&
                    <ModalAddTeam
                        modalShow={this.state.isShowModalAddTeam}
                        setModalShow={this.setModalShow}
                        confirmAddTeam={this.confirmAddTeam}
                    />
                }
            </>
        )
    }
}

export default team;