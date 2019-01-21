import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";
/*
Component handles Delete Task flow
*/

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  dialogPaper: {
    width: "80%",
    background: grey[100]
  }
});

class DeleteConfirmation extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.isDeleteOpen}
          onClose={this.props.closeDeleteConfirmModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{
            paper: classes.dialogPaper
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Confirmation?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The Task will be deleted. Please confrim.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.closeDeleteConfirmModal}
              color="primary"
            >
              No
            </Button>
            <Button
              onClick={this.props.handleDeleteTask}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(DeleteConfirmation);
