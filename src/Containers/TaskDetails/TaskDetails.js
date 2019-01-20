import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import UpdateTask from "../UpdateTask/UpdateTask";
import customAxios from "../../Helpers/customAxios";
import { API_PATH } from "../../api";
import { connect } from "react-redux";
import { withTheme } from "@material-ui/core/styles";

const styles = theme => ({
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
  }
});

class TaskDetails extends React.Component {
  state = {
    isEditModelOpen: false
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
  render() {
    const { classes } = this.props;

    return (
      <div>
        <UpdateTask
          isUpdateOpen={this.state.isEditModelOpen}
          handleUpdateTask={this.handleTaskUpdate}
          closeUpdateModel={this.closeUpdateModal}
          taskData={this.props.taskData}
        />

        <Card className={classes.card} raised>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Task
            </Typography>
            <Typography component="p">
              Details : {this.props.taskData.taskDesc}
            </Typography>
            <Typography component="p">
              Due Date : {this.props.taskData.taskDueDate}
            </Typography>
            <Typography component="p">
              Created On : {this.props.taskData.taskCreatedOn}
            </Typography>
            <IconButton
              className={classes.button}
              aria-label="Delete"
              onClick={this.handleTaskDelete}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              className={classes.button}
              aria-label="Edit"
              onClick={this.openUpdateModel}
            >
              <EditIcon />
            </IconButton>
          </CardContent>
        </Card>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    user: state.userReducer.user.data
  };
};
export default connect(
  mapStateToProps,
  null
)(withTheme()(withStyles(styles)(TaskDetails)));
