// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ModalProps from 'react-bootstrap/Modal'
import React from 'react';
import Select from 'react-select'
import { toast } from 'react-toastify'
import { upSertEmployeeService, uploadImage, getInforEmployeeServiceById } from '../../services/EmloyeesService'
import { getTeamService } from '../../services/TeamService';
import { emitter } from '../../utils/emitter'
import validator from 'validator'
class ModalUpSertEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMode: false,
            idEmployee: '',
            fullName: '',
            passWord: '',
            address: '',
            sex: '',
            age: '',
            day: '',
            money: '',
            phone: '',
            role: '',
            team_id: '',
            image: '',
            previewImgURL: '',
            isOpen: false,
            imageData: '',
            listTeam: [],
            selectedTeam: '',
            selectedTeamLabel: '',
            selectedSex: '',
            selectedRole: '',
            listSex: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'FeMale' },
                { value: 'other', label: 'Other' }
            ],
            listRole: [
                { value: 'R1', label: 'Admin' },
                { value: 'R2', label: 'Employee' },
            ]
        };
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                fullName: '',
                passWord: '',
                address: '',
                sex: '',
                age: '',
                day: '',
                money: '',
                phone: '',
                team_id: '',
                previewImgURL: '',
                isOpen: false,
                imageData: '',
                selectedTeam: '',
                selectedSex: '',
                selectedRole: '',
                image: '',
            })
        })
    }

    async componentDidMount() {
        this.setState({
            modalShow: this.props.modalShow
        })
        let res = await getTeamService()
        if (res) {
            this.setState({
                listTeam: this.buildDataSelectTeam(res.listTeam)
            })

        }
        if (this.props.idEmployee) {
            this.setState({
                idEmployee: this.props.idEmployee
            })
            let res = await getInforEmployeeServiceById(this.props.idEmployee);

            let selectedTeam = this.state.listTeam.find(item => {
                return item && item.value === res.team_id
            })

            let selectedSex = this.state.listSex.find(item => {
                return item && item.value === res.sex
            })

            let selectedRole = this.state.listRole.find(item => {
                return item && item.value === res.role
            })

            if (res) {
                this.setState({
                    idEmployee: res.id,
                    fullName: res.fullName,
                    passWord: res.passWord,
                    address: res.address,
                    sex: res.sex,
                    age: res.age,
                    day: res.day,
                    money: res.money,
                    phone: res.phone,
                    team_id: res.team_id,
                    image: res.image,
                    selectedTeam: selectedTeam,
                    selectedSex: selectedSex,
                    selectedRole: selectedRole
                })
            }
        }

        this.listenToEmitter();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.idEmployee !== prevProps.idEmployee) {
            let team = await getTeamService()
            if (team) {
                this.setState({
                    listTeam: this.buildDataSelectTeam(team.listTeam)
                })

            }
            this.setState({
                idEmployee: this.props.idEmployee
            })
            let res = await getInforEmployeeServiceById(this.props.idEmployee);

            let selectedTeam = this.state.listTeam.find(item => {
                return item && item.value === res.team_id
            })

            let selectedSex = this.state.listSex.find(item => {
                return item && item.value === res.sex
            })
            let selectedRole = this.state.listRole.find(item => {
                return item && item.value === res.role
            })

            if (res) {
                this.setState({
                    idEmployee: res.id,
                    fullName: res.fullName,
                    passWord: res.passWord,
                    address: res.address,
                    sex: res.sex,
                    age: res.age,
                    day: res.day,
                    money: res.money,
                    phone: res.phone,
                    role: res.role,
                    team_id: res.team_id,
                    image: res.image,
                    selectedTeam: selectedTeam,
                    selectedSex: selectedSex,
                    selectedRole: selectedRole
                })
            }
        }

        if (this.props.modalShow !== prevProps.modalShow) {
            if (this.props.idEmployee) {
                let team = await getTeamService()
                if (team) {
                    this.setState({
                        listTeam: this.buildDataSelectTeam(team.listTeam)
                    })

                }
                this.setState({
                    idEmployee: this.props.idEmployee
                })
                let res = await getInforEmployeeServiceById(this.props.idEmployee);

                let selectedTeam = this.state.listTeam.find(item => {
                    return item && item.value === res.team_id
                })

                let selectedSex = this.state.listSex.find(item => {
                    return item && item.value === res.sex
                })
                let selectedRole = this.state.listRole.find(item => {
                    return item && item.value === res.role
                })

                if (res) {
                    this.setState({
                        idEmployee: res.id,
                        fullName: res.fullName,
                        passWord: res.passWord,
                        address: res.address,
                        sex: res.sex,
                        age: res.age,
                        day: res.day,
                        money: res.money,
                        phone: res.phone,
                        role: res.role,
                        team_id: res.team_id,
                        image: res.image,
                        selectedTeam: selectedTeam,
                        selectedSex: selectedSex,
                        selectedRole: selectedRole
                    })
                }
            }
        }
    }


    buildDataSelectTeam = (data) => {
        let result = []
        if (data) {
            data.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                result.push(object);
                return result;
            })
        }
        return result;
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeSelectSex = (selectedOptions) => {
        this.setState({
            sex: selectedOptions.value
        })
    }

    handleOnchangeSelectTeam = (selectedOptions) => {
        this.setState({
            team_id: selectedOptions.value,
        })
    }

    handleOnchangeSelectRole = (selectedOptions) => {
        this.setState({
            role: selectedOptions.value,
        })
    }


    handleSubmit = async () => {
        let arr = ['fullName', 'passWord', 'address', 'sex', 'age', 'day', 'money', 'phone', 'role', `team_id`]
        let err = false;
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                if (arr[i] === 'team_id') {
                    toast.error('Missing Team');
                } else {
                    toast.error('Missing ' + arr[i]);
                }
                err = true;
                break;
            }
        }
        if (!err) {
            if (!/^[0-9]+$/.test(this.state.age)) {
                toast.error("Please only enter numeric characters only for Age!");
                err = true;
            }
        }
        if (!err) {
            if (!/^[0-9]+$/.test(this.state.money)) {
                toast.error("Please only enter numeric characters only for Money!");
                err = true;
            }
        }
        if (!err) {
            if (!validator.isMobilePhone(this.state.phone)) {
                toast.error("Invalid Phone !");
                err = true;
            }
        }

        if (!err) {
            let upload = ''
            if (this.state.imageData !== '') {
                upload = await uploadImage(
                    this.state.imageData
                )
                if (upload && upload.data) {
                    this.setState({
                        image: upload.data
                    })
                }

            }
            var md5 = require('md5');
            let res = await upSertEmployeeService({
                id: this.state.idEmployee,
                fullName: this.state.fullName,
                passWord: this.state.idEmployee ? this.state.passWord : md5(this.state.passWord),
                address: this.state.address,
                sex: this.state.sex,
                age: this.state.age,
                day: this.state.day,
                money: this.state.money,
                phone: this.state.phone,
                role: this.state.role,
                team_id: this.state.team_id,
                image: upload.data ? upload.data : this.state.image
            })
            if (res === 0) {
                if (this.state.idEmployee !== "") {
                    toast.success("Update employee success");
                    emitter.emit('EVENT_RELOAD', { 'id': 'your id' });
                    this.props.confirmUpdate()
                } else {
                    toast.success("Add new employee success");
                }
                this.props.setModalShow();
            }
            if (res === 1) {
                toast.error("Phone number already exists !");
            }
            if (res === -1) {
                if (this.state.idEmployee !== "") {
                    toast.error("Update employee fail")
                } else {
                    toast.error("Add new employee fail")
                }
            }
        }
    }

    handleOnchangImage = async (event) => {
        let file = event.target.files[0];
        let imageData = new FormData();
        imageData.append('file', file);
        let objectUrl = URL.createObjectURL(file);
        this.setState({
            previewImgURL: objectUrl,
            imageData: imageData
        })


    }

    openReviewImage = () => {
        this.setState({
            isOpen: true
        })

    }


    render() {
        let { modalShow } = this.props;
        let { listTeam, selectedTeam, listSex, selectedSex, image, listRole, selectedRole, idEmployee } = this.state
        return (

            <ModalProps
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalProps.Header>
                    <ModalProps.Title id="contained-modal-title-vcenter">
                        Add new Employee
                    </ModalProps.Title>
                </ModalProps.Header>
                <ModalProps.Body>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Full name employee</label>
                            <input type="text" className="form-control"
                                value={this.state.fullName}
                                onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                            >
                            </input>
                        </div>
                        <div className="form-group col-6">
                            <label>Password</label>
                            <input type="password" className="form-control"
                                value={this.state.passWord}
                                onChange={(event) => this.handleOnchangeInput(event, 'passWord')}
                                disabled={idEmployee ? true : false}
                            >
                            </input>
                        </div>
                        <div className="form-group col-6">
                            <label>Address</label>
                            <input type="text" className="form-control"
                                value={this.state.address}
                                onChange={(event) => this.handleOnchangeInput(event, 'address')}
                            ></input>
                        </div> <div className="form-group col-6">
                            <label>Sex employee</label>
                            <Select
                                options={listSex}
                                onChange={this.handleOnchangeSelectSex}
                                name={'sex'}
                                defaultValue={selectedSex}
                            />

                        </div> <div className="form-group col-6">
                            <label>Age employee</label>
                            <input type="text" className="form-control"
                                value={this.state.age}
                                onChange={(event) => this.handleOnchangeInput(event, 'age')}
                            ></input>
                        </div>
                        <div className="form-group col-6">
                            <label>Start day</label>
                            <input type="date" className="form-control"
                                value={this.state.day}
                                onChange={(event) => this.handleOnchangeInput(event, 'day')}

                            ></input>
                        </div>
                        <div className="form-group col-6">
                            <label>Money/hour</label>
                            <input type="text" className="form-control"
                                value={this.state.money}
                                onChange={(event) => this.handleOnchangeInput(event, 'money')}
                            ></input>
                        </div>
                        <div className="form-group col-6">
                            <label>Phone number</label>
                            <input type="text" className="form-control"
                                value={this.state.phone}
                                onChange={(event) => this.handleOnchangeInput(event, 'phone')}
                            ></input>
                        </div>
                        <div className="form-group col-6">
                            <label>Team</label>
                            <Select options={listTeam}
                                onChange={this.handleOnchangeSelectTeam}
                                name={'team'}
                                defaultValue={selectedTeam}
                            />

                        </div>
                        <div className="form-group col-6">
                            <label>Role</label>
                            <Select
                                options={listRole}
                                onChange={this.handleOnchangeSelectRole}
                                name={'role'}
                                defaultValue={selectedRole}
                                isDisabled={this.props.role === 'R2' ? true : false}
                            />

                        </div>
                        <div className="form-group col-6 my-3" >
                            <label className='label-upload' htmlFor='previewImg'><i className="fa fa-camera"></i>Tải ảnh</label>
                            <input className='preview-img-input form-control' id='previewImg' type='file'
                                style={{ display: "none" }}
                                onChange={(event) => this.handleOnchangImage(event)}
                            />
                            {
                                this.state.previewImgURL !== '' ?
                                    <>
                                        <div className='preview-img'
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openReviewImage()}
                                        >
                                        </div>
                                    </>
                                    :
                                    <>
                                        {image &&
                                            <div className='preview-img'
                                                style={{ backgroundImage: "url(" + `http://localhost:8080/upload-file/files/${image}` + ")" }}
                                                onClick={() => this.openReviewImage()}
                                            >
                                            </div>
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </ModalProps.Body>
                <ModalProps.Footer>
                    <button className='btn btn-primary' onClick={this.props.setModalShow}>CANCEL</button>
                    <button className='btn btn-success' onClick={() => this.handleSubmit()}>SUBMIT</button>
                </ModalProps.Footer>
            </ModalProps>

        )
    }
}

export default ModalUpSertEmployee;