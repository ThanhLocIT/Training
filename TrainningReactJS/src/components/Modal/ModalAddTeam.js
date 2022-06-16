// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ModalProps from 'react-bootstrap/Modal'
import React from 'react';
import { toast } from 'react-toastify'
import { insertTeamService, getTeamService } from '../../services/TeamService'
import { emitter } from '../../utils/emitter'
class ModalAddTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameTeam: '',
            moreInsert: true
        };
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                nameTeam: '',
                moreInsert: true
            })
        })
    }
    componentDidMount() {
        this.listenToEmitter();
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }


    handleSubmit = async () => {
        let arr = ['nameTeam']
        let err = false;
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                toast.error('Missing ' + arr[i]);
                err = true;
                break;
            }
        }
        if (!err) {
            let name = this.state.nameTeam;
            name = name.split(" ");
            let namePost = '';
            name.forEach(element => {
                if (element !== '') {
                    namePost += element + " ";
                }
            });
            namePost = namePost.trim()

            let oldTeam = await getTeamService();
            oldTeam.listTeam.forEach(element => {
                if (element.name === namePost) {
                    err = true;
                    toast.error("The team already exists !")
                }
            });
            if (!err) {
                let res = await insertTeamService({
                    name: namePost
                })
                if (res === 0) {
                    toast.success("Add new team success");
                } else {
                    toast.error("Add new team fail")
                }
            }
        }
        this.setModalShow()
    }

    hanldeCheckedMoreInsert = (event) => {
        this.setState({
            moreInsert: event.target.checked
        })
    }

    setModalShow = () => {
        this.props.confirmAddTeam()
        if (!this.state.moreInsert) {
            this.props.setModalShow()
        } else {
            this.setState({
                nameTeam: ''
            })
        }
    }

    render() {
        let { modalShow } = this.props;
        return (

            <ModalProps
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalProps.Header>
                    <ModalProps.Title id="contained-modal-title-vcenter">
                        Add new team
                    </ModalProps.Title>
                </ModalProps.Header>
                <ModalProps.Body>
                    <div className="row">
                        <div className="form-group col-12">
                            <label>Name</label>
                            <input type="text" className="form-control"
                                value={this.state.nameTeam}
                                onChange={(event) => this.handleOnchangeInput(event, 'nameTeam')}
                            ></input>
                        </div>
                    </div>
                </ModalProps.Body>
                <ModalProps.Footer>
                    <input type="checkbox"
                        onChange={(event) => this.hanldeCheckedMoreInsert(event)}
                        checked={this.state.moreInsert}
                    />
                    <label>More Insert</label>
                    <button className='btn btn-primary' onClick={this.props.setModalShow}>CANCEL</button>
                    <button className='btn btn-success' onClick={() => this.handleSubmit()}>SUBMIT</button>
                </ModalProps.Footer>
            </ModalProps >
        )
    }
}

export default ModalAddTeam;