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
import { showMessageSnackBottom } from "../../Store/Actions/appActions";
import orange from "@material-ui/core/colors/orange";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";

/*
This is the homepage where user enters when logged in
*/

const styles = theme => ({
  appBarStyles: {
    background: orange[500]
  },
  rootContainer: {
    width: "100%"
  },
  white: {
    color: grey[200]
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
    marginBottom: theme.spacing.unit * 2,
    background: grey[50],
    overflowWrap: "break-word"
  },
  button: {
    color: "#ffffff",
    border: "1px solid #ffffff",
    "&:hover": {
      color: "#000",
      borderColor: "#000"
    }
  },
  addTaskBtn: {
    color: orange[500],
    borderColor: orange[500],
    "&:hover": {
      color: orange[500],
      borderColor: orange[500]
    },
    marginBottom: theme.spacing.unit * 2,
    outline: "none"
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
  },
  loaderStyle: {
    display: "flex",
    justifyContent: "center"
  },
  chipStyle: {
    background: grey[50],
    border: `2px solid ${orange[500]}`
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.2),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.3)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  inputRoot: {
    color: "white",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class HomePage extends React.Component {
  isComponentMounted = false;
  state = {
    isAddOpen: false,
    allUserTasks: [],
    isLoadingTasks: false,
    timeoutId: null,
    searchInputText: "",
    searchedUserTasks: [],
    isSearchingTasks: false
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
      .then(tasks => {
        this.setState({
          allUserTasks: tasks.data,
          isLoadingTasks: false,
          searchedUserTasks: []
        });
      })
      .catch(error => {
        if (this.isComponentMounted)
          this.setState({
            isLoadingTasks: false,
            allUserTasks: [],
            searchedUserTasks: []
          });
      });
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
    this.isComponentMounted = true;
    this.fetchUserTasks();
  };
  componentWillUnmount = () => {
    this.isComponentMounted = false;
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
      .then(response => {
        this.fetchUserTasks();
        this.closeAddModel();
        this.props.taskAddedSuccess();
      })
      .catch(error => {
        if (this.isComponentMounted) {
          // Only if component is mounted and error handling is required
          console.log("In error");
        }
      });

    this.setState({
      isUpdateTaskOpen: true,
      isAddTaskOpen: true
    });
  };
  searchInpChange = event => {
    this.setState({
      isSearchingTasks: true
    });
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
    const newValue = event.target.value;
    const latestTimeoutId = setTimeout(() => {
      let userTasksArray = [];
      userTasksArray = this.state.allUserTasks.filter(ele => {
        return (
          ele.taskDesc
            .toLowerCase()
            .indexOf(this.state.searchInputText.toLowerCase()) !== -1
        );
      });
      this.setState({
        searchedUserTasks: userTasksArray,
        isSearchingTasks: false
      });
    }, 300);
    this.setState({
      timeoutId: latestTimeoutId,
      searchInputText: newValue
    });
  };
  render() {
    const { classes, user } = this.props;
    let displayTasks = [],
      userTasksComponent = null;
    if (this.state.allUserTasks.length) {
      if (this.state.searchedUserTasks.length) {
        displayTasks = this.state.searchedUserTasks;
      }
      if (!this.state.searchInputText) {
        displayTasks = this.state.allUserTasks;
      }
      if (
        this.state.searchedUserTasks.length === 0 &&
        this.state.searchInputText &&
        !this.state.isSearchingTasks
      ) {
        userTasksComponent = (
          <div className={classes.loaderStyle}>
            <Typography variant="h6" gutterBottom className={classes.white}>
              Task not found
            </Typography>
          </div>
        );
      } else {
        userTasksComponent = displayTasks.map(ele => {
          return (
            <TaskDetails
              key={ele._id}
              taskData={ele}
              fetchUserTasks={this.fetchUserTasks}
            />
          );
        });
      }
    } else {
      userTasksComponent = (
        <div className={classes.loaderStyle}>
          <Typography variant="h6" gutterBottom className={classes.white}>
            No tasks available
          </Typography>
        </div>
      );
    }

    return (
      <div className={classes.rootContainer}>
        <AppBar position="fixed">
          <Toolbar className={classes.appBarStyles}>
            <div className={classes.grow}>
              <Typography variant="h6" color="inherit" inline>
                Healthcare Systems
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
            <Paper className={classes.aboutUser} raised="true">
              <div className={classes.chipNameContainer}>
                <Typography variant="h5" inline>
                  {`Welcome ${user.firstName} ${user.lastName}`}
                </Typography>
                <Chip
                  label={`Age: ${user.userAge}`}
                  className={classes.chipStyle}
                />
              </div>

              <Typography variant="body2" gutterBottom>
                {user.userDetails}
              </Typography>
            </Paper>
          )}
          <Typography className={classes.white} variant="h6" gutterBottom>
            Your Tasks
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Tasks"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onChange={this.searchInpChange}
              value={this.state.searchInputText}
              disabled={this.state.allUserTasks.length === 0 ? true : false}
            />
          </div>
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
            {this.state.isLoadingTasks ? (
              <div className={classes.loaderStyle}>
                <Loader />
              </div>
            ) : (
              userTasksComponent
            )}
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
    logout: () => dispatch(userActions.logout("success")),
    taskAddedSuccess: () =>
      dispatch(showMessageSnackBottom("Task Added", "success", 3000))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(HomePage)));
