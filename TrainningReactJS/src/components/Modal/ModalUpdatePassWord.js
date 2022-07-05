import ModalProps from 'react-bootstrap/Modal'
import React from 'react';
import { toast } from 'react-toastify'
import { emitter } from '../../utils/emitter'
import './ModalUpdatePassWord.scss';
class ModalUpdatePassWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            checkNewPassword: '',
            isShowPassword: false,
            isShowConfirmPassword: false,
        };
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_UPDATE_PASSWORD', () => {
            this.setState({
                oldPassword: '',
                newPassword: '',
                checkNewPassword: '',
                isShowPassword: false,
                isShowConfirmPassword: false,
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

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleShowHideConfirmPassword = () => {
        this.setState({
            isShowConfirmPassword: !this.state.isShowConfirmPassword
        })
    }


    handleSubmit = async () => {
        var md5 = require('md5');
        let err = false
        let oldPassWord = md5(this.state.oldPassword)
        if (this.props.oldPassWord !== oldPassWord && this.props.roleId === 'R2') {
            toast.error('Old password does not match !')
            err = true
        } else {
            if (this.state.newPassword === '') {
                toast.error('Password can not empty !')
                err = true
            } else {
                if (this.state.newPassword !== this.state.checkNewPassword) {
                    toast.error('New password validation error !')
                    err = true
                }
            }
        }
        if (err === false) {
            this.props.changePassWord(this.state.newPassword)
            this.props.setModalShow()
        }
    }


    render() {
        let { modalShow, roleId } = this.props;
        return (
            <ModalProps
                show={modalShow}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalProps.Header>
                    <ModalProps.Title id="contained-modal-title-vcenter">
                        Change password
                    </ModalProps.Title>
                </ModalProps.Header>
                <ModalProps.Body>
                    <div className="row">
                        {roleId !== 'R1' &&
                            <div className="form-group col-12">
                                <label>Old password</label>
                                <input type="text" className="form-control"
                                    value={this.state.oldPassword}
                                    onChange={(event) => this.handleOnchangeInput(event, 'oldPassword')}
                                ></input>
                            </div>
                        }
                        <div className="form-group col-12">
                            <label>New password</label>
                            <div className="custom-input-password">
                                <input className="form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    value={this.state.newPassword}
                                    onChange={(event) => this.handleOnchangeInput(event, 'newPassword')}
                                ></input>
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="form-group col-12">
                            <label>Confirm new password</label>
                            <div className="custom-input-password">
                                <input className="form-control"
                                    type={this.state.isShowConfirmPassword ? 'text' : 'password'}
                                    value={this.state.checkNewPassword}
                                    onChange={(event) => this.handleOnchangeInput(event, 'checkNewPassword')}
                                ></input>
                                <span onClick={() => this.handleShowHideConfirmPassword()}>
                                    <i className={this.state.isShowConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </ModalProps.Body>
                <ModalProps.Footer>
                    <button className='btn btn-primary' onClick={this.props.setModalShow}>CANCEL</button>
                    <button className='btn btn-success' onClick={() => this.handleSubmit()}>CONTINUE</button>
                </ModalProps.Footer>
            </ModalProps>

        )
    }
}

export default ModalUpdatePassWord;