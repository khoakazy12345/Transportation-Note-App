import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './AlertBox.css';

class AlertDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Looks like there is no driving route through all you destination. Consider dropping some of them.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            I Understand
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default AlertDialog;