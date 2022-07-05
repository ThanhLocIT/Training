// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ModalProps from 'react-bootstrap/Modal'
import React from 'react';
import { toast } from 'react-toastify'
import { insertWorking } from '../../services/WorkingService'
import { emitter } from '../../utils/emitter'
class ModalAddWorking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            hour: '',
            moreInsert: true
        };
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                date: '',
                hour: '',
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

    handleOnchangeSelect = (selectedOptions) => {
        this.setState({
            sex: selectedOptions.value
        })
    }

    handleSubmit = async () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const idEmployee = params.get('id');
        let arr = ['date', 'hour']
        let err = false;
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                toast.error('Missing ' + arr[i]);
                err = true;
                break;
            }
        }
        if (!err) {
            if (!/^[0-9]+$/.test(this.state.hour)) {
                toast.error("Please only enter numeric characters only for Hour!");
                err = true;
            }
        }
        if (!err) {
            let res = await insertWorking({
                employeeId: idEmployee,
                date: this.state.date,
                hour: this.state.hour,
                status: this.props.roleId === 'R1' ? '1' : '0'
            })
            if (res === 0) {
                toast.success("Add new working success");
                this.props.confirmAddWorking();
            } else {
                toast.error("Add new working fail")
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
        if (!this.state.moreInsert) {
            this.props.setModalShow()
        } else {
            this.setState({
                date: '',
                hour: ''
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
                        Add newworking
                    </ModalProps.Title>
                </ModalProps.Header>
                <ModalProps.Body>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Date</label>
                            <input type="date" className="form-control"
                                value={this.state.date}
                                onChange={(event) => this.handleOnchangeInput(event, 'date')}
                            ></input>
                        </div>
                        <div className="form-group col-6">
                            <label>Hour</label>
                            <input type="text" className="form-control"
                                value={this.state.hour}
                                onChange={(event) => this.handleOnchangeInput(event, 'hour')}
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

export default ModalAddWorking;