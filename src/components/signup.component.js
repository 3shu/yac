import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import SignupOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
//
function MadeMP() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built by the Mario Perez'}
    </Typography>
  );
}
//
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
//
export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeNickName = this.onChangeNickName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            nickname: '',
            email: '',
            password: '',
            openError:false,
            msgError:'',
            openOK:false,
            msgOK:''
        }
    }
    onChangeNickName(e) {
        this.setState({
            nickname: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    //
    onSubmit(e) {
	    e.preventDefault();
	    const obj = {
	      nickname: this.state.nickname,
	      email: this.state.email,
	      password: this.state.password
	    };
        
	    axios.post('http://localhost:4000/users/add', obj)
	        .then((res) => {
                console.log(res.data);
                this.setState({
                  openOK:true,
                  msgOK:res.data.users
                })
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    console.log(error.response.data.error);
                    this.setState({
                      openError:true,
                      msgError:error.response.data.error
                    })
                } else {
                    console.log('Error', error.message);
                }
            });
	    
	    this.setState({
	      nickname: '',
	      email: '',
	      password: ''
	    })
	  }

      handleCloseError =() =>{
        this.setState({
          openError:false,
          msgError:''
        })
      }

      handleCloseOK =() =>{
        this.setState({
          openOK:false,
          msgOK:''
        });
        this.props.history.push('/');
      }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={useStyles.paper}>
                <Avatar className={useStyles.avatar}>
                  <SignupOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Dialog
                    style={{zIndex:9000}}
                    open={this.state.openError}
                    onClose={this.handleCloseError}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">{this.state.msgError}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCloseError} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    style={{zIndex:9000}}
                    open={this.state.openOK}
                    onClose={this.handleCloseOK}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Sign Up"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">{this.state.msgOK}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCloseOK} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                <form onSubmit={this.onSubmit} className={useStyles.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nickname"
                        label="Nickname"
                        name="nickname"
                        type="text"
                        autoComplete="off"
                        value={this.state.nickname}
                        onChange={this.onChangeNickName}
                        autoFocus
                      />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                      />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        autoComplete="off"
                      />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={useStyles.submit}
                      >
                        Sign Up
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Link href="/" variant="body2">
                            {"Already have an account? Sign in"}
                          </Link>
                        </Grid>
                      </Grid>
                </form>
            </div>
            <Box mt={5}>
                <MadeMP />
            </Box>
        </Container>
        )
    }
}