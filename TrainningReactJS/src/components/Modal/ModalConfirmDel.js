import React from 'react';
import './ModalConfirmDel.scss';
class ModalConfirmDel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleClose = () => {
        this.props.handleClose()
    }

    handleConfirm = () => {
        this.props.handleConfirmDel()
    }
    render() {
        return (
            <div className="modal modal-confirm-delete" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Are you sure to delete all employee selected ? </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.handleClose()}>No</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.handleConfirm()}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalConfirmDel;