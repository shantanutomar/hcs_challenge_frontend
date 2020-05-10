import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import { withTheme } from "@material-ui/core/styles";
/*
Component handles Delete Task flow
*/

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  dialogPaper: {
    width: "80%",
    background: grey[200],
    borderRadius: '10px',
  },
  TypographyStyle: {
    "&>span": {
      color: orange[500]
    }
  },
  deleteIcons: {
    margin: '0 16px 13px 0',
    border: '2px solid',
    borderRadius: '5px',
  },
  yesButton: {
    "&:hover": {
      border: '2px solid #f44336',
      borderRadius: '5px',  
      backgroundColor: "#f44336",
      color: "#eee"
    }    
  },
  noButton: {
    "&:hover": {
      border: '2px solid #ff9800',
      borderRadius: '5px',  
      backgroundColor: "#ff9800",
      color: "#eee"
    }
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
            <span>Delete Confirmation?</span>
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
              variant="outlined"
              className={[classes.deleteIcons, classes.noButton]}
            >
              Cancel
            </Button>
            <Button
              onClick={this.props.handleDeleteTask}
              color="secondary"
              autoFocus
              variant="outlined"
              className={[classes.deleteIcons, classes.yesButton]}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withTheme()(withStyles(styles)(DeleteConfirmation));
