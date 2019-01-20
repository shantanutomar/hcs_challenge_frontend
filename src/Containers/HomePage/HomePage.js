import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Chip from "@material-ui/core/Chip";
import grey from "@material-ui/core/colors/grey";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { userActions } from "../../Store/Actions/userActions";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AddTasks from "../AddTasks/AddTasks";
import customAxios from "../../Helpers/customAxios";
import { API_PATH } from "../../api";
import Loader from "../Loader/Loader";
import TaskDetails from "../TaskDetails/TaskDetails";

const styles = theme => ({
  appBarStyles: {
    background: grey[100]
  },
  rootContainer: {
    width: "100%"
  },
  white: {
    color: grey[50]
  },
  chipNameContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rootSection: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 8
  },
  aboutUser: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  button: {
    color: "#000",
    borderColor: "#000",
    "&:hover": {
      color: "#000",
      borderColor: "#000"
    }
  },
  addTaskBtn: {
    color: grey[50],
    borderColor: grey[50],
    "&:hover": {
      color: grey[50],
      borderColor: grey[50]
    },
    marginBottom: theme.spacing.unit * 2
  },
  horzDivider: {
    height: "1px",
    width: "100%",
    backgroundColor: grey[50],
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: "flex"
  }
});

class HomePage extends React.Component {
  state = {
    isAddOpen: false,
    userTasks: [],
    isLoadingTasks: false
  };
  fetchUserTasks = () => {
    this.setState({
      isLoadingTasks: true
    });
    customAxios
      .get(`${API_PATH.dev.BASE_URL}/users/${this.props.user._id}/tasks/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.user.token
        },
        method: "GET"
      })
      .then(
        tasks => {
          this.setState({ userTasks: tasks.data, isLoadingTasks: false });
        },
        error => {
          this.setState({ isLoadingTasks: false, userTasks: [] });
        }
      );
  };
  openAddModel = () => {
    this.setState({
      isAddOpen: true
    });
  };
  closeAddModel = () => {
    this.setState({
      isAddOpen: false
    });
  };
  componentDidMount = () => {
    this.fetchUserTasks();
  };
  handleLogout = () => {
    this.props.logout();
  };
  handleCreateTask = (event, createTaskData) => {
    event.preventDefault();
    customAxios
      .post(
        `${API_PATH.dev.BASE_URL}/tasks/`,
        { ...createTaskData, userAssigned: this.props.user._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.props.user.token
          },
          method: "POST"
        }
      )
      .then(
        response => {
          this.fetchUserTasks();
          this.closeAddModel();
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
  render() {
    const { classes, user } = this.props;
    let userTasks = [];
    if (this.state.userTasks.length) {
      userTasks = this.state.userTasks.map(ele => {
        return (
          <TaskDetails
            key={ele._id}
            taskData={ele}
            fetchUserTasks={this.fetchUserTasks}
          />
        );
      });
    }

    return (
      <div className={classes.rootContainer}>
        <AppBar position="fixed">
          <Toolbar className={classes.appBarStyles}>
            <div className={classes.grow}>
              <Typography variant="h6" color="inherit" inline>
                HealthCareSystems
              </Typography>
            </div>

            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              size="small"
              onClick={this.handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <section className={classes.rootSection}>
          {user && (
            <Paper className={classes.aboutUser}>
              <div className={classes.chipNameContainer}>
                <Typography variant="h4" inline>
                  {`Welcome ${user.firstName} ${user.lastName}`}
                </Typography>
                <Chip label={`Age: ${user.userAge}`} />
              </div>

              <Typography variant="body2" gutterBottom>
                {user.userDetails}
              </Typography>
            </Paper>
          )}
          <Typography className={classes.white} variant="h4" gutterBottom>
            Your Tasks
          </Typography>
          <div className={classes.horzDivider} />
          <AddTasks
            isAddOpen={this.state.isAddOpen}
            handleCreateTask={this.handleCreateTask}
            closeAddModel={this.closeAddModel}
          />
          <Button
            fullWidth
            variant="outlined"
            className={classes.addTaskBtn}
            onClick={this.openAddModel}
          >
            Add Task
          </Button>
          <section>
            {this.state.isLoadingTasks ? <Loader /> : userTasks}
          </section>
        </section>
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
    logout: () => dispatch(userActions.logout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(HomePage)));
