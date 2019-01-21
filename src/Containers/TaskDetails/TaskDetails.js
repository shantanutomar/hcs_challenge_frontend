import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import UpdateTask from "../UpdateTask/UpdateTask";
import customAxios from "../../Helpers/customAxios";
import { API_PATH } from "../../api";
import { connect } from "react-redux";
import { withTheme } from "@material-ui/core/styles";
import format from "date-fns/format";
import { showMessageSnackBottom } from "../../Store/Actions/appActions";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import grey from "@material-ui/core/colors/grey";

/*
Component that renders each Task details
*/

const styles = theme => ({
  paper: {
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    overflowWrap: "break-word",
    background: grey[200]
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

class TaskDetails extends React.Component {
  state = {
    isEditModelOpen: false,
    isDeleteConfirmOpen: false
  };
  handleTaskDelete = () => {
    customAxios
      .delete(`${API_PATH.dev.BASE_URL}/tasks/${this.props.taskData._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.user.token
        },
        method: "DELETE"
      })
      .then(
        () => {
          console.log("Task Deleted");
          this.props.taskDeletedSuccess();
          this.props.fetchUserTasks();
        },
        error => {
          console.log("In error");
        }
      );
  };
  handleTaskUpdate = (event, updateData) => {
    event.preventDefault();

    customAxios
      .put(
        `${API_PATH.dev.BASE_URL}/tasks/${this.props.taskData._id}`,
        { ...this.props.taskData, ...updateData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.props.user.token
          },
          method: "PUT"
        }
      )
      .then(
        () => {
          console.log("Task Updated");
          this.props.taskUpdatedSuccess();
          this.props.fetchUserTasks();
        },
        error => {
          console.log("In error");
        }
      );

    this.setState({
      isUpdateTaskOpen: true,
      isAddTaskOpen: true
    });
  };
  openUpdateModel = () => {
    this.setState({
      isEditModelOpen: true
    });
  };
  closeUpdateModal = () => {
    this.setState({
      isEditModelOpen: false
    });
  };
  closeDeleteModal = () => {
    this.setState({
      isDeleteConfirmOpen: false
    });
  };
  openDeleteModel = () => {
    this.setState({
      isDeleteConfirmOpen: true
    });
  };

  render() {
    const { classes, taskData } = this.props;

    return (
      <div>
        <UpdateTask
          isUpdateOpen={this.state.isEditModelOpen}
          handleUpdateTask={this.handleTaskUpdate}
          closeUpdateModel={this.closeUpdateModal}
          taskData={this.props.taskData}
        />
        <DeleteConfirmation
          isDeleteOpen={this.state.isDeleteConfirmOpen}
          handleDeleteTask={this.handleTaskDelete}
          closeDeleteConfirmModal={this.closeDeleteModal}
        />
        <Paper className={classes.paper} raised="true">
          <Typography variant="body1">{taskData.taskDesc}</Typography>
          <div className={classes.cardFooter}>
            <Typography variant="caption" inline>
              {`Due on ${format(
                new Date(taskData.taskDueDate),
                "Do MMM YYYY"
              )}`}
            </Typography>
            <span>
              <IconButton aria-label="Delete" onClick={this.openDeleteModel}>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="Edit" onClick={this.openUpdateModel}>
                <EditIcon />
              </IconButton>
            </span>
          </div>
        </Paper>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    user: state.userReducer.user.data
  };
};

var mapDispatchToProps = dispatch => {
  return {
    taskDeletedSuccess: () =>
      dispatch(showMessageSnackBottom("Task Deleted", "success", 3000)),
    taskUpdatedSuccess: () =>
      dispatch(showMessageSnackBottom("Task Updated", "success", 3000))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(TaskDetails)));
