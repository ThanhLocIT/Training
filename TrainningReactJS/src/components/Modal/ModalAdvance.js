// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ModalProps from 'react-bootstrap/Modal'
import React from 'react';
import { toast } from 'react-toastify'
import { insertAdvances } from '../../services/AdvancesService'
import { emitter } from '../../utils/emitter'
class ModalAdvance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idEmployee: '',
            date: '',
            money: '',
            moreInsert: true
        };
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                idEmployee: '',
                date: '',
                money: '',
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
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const idEmployee = params.get('id');
        let arr = ['date', 'money']
        let err = false;
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                toast.error('Missing ' + arr[i]);
                err = true;
                break;
            }
        }
        if (!err) {
            if (!/^[0-9]+$/.test(this.state.money)) {
                toast.error("Please only enter money characters only for Money!");
                err = true;
            }
        }
        if (!err) {
            let res = await insertAdvances({
                employeeId: idEmployee,
                date: this.state.date,
                money: this.state.money,
                status: this.props.roleId === 'R1' ? 1 : 0
            })
            if (res === 0) {
                toast.success("Add new working success");
                this.props.confirmAddAdvances();
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
                money: ''
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
                        Add new advance
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
                            <label>Money</label>
                            <input type="text" className="form-control"
                                value={this.state.money}
                                onChange={(event) => this.handleOnchangeInput(event, 'money')}
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

export default ModalAdvance;