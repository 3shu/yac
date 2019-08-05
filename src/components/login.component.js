import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

function MadeMP() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built by the Mario Perez'}
    </Typography>
  );
}

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
class Login extends Component {
  constructor(props) {
        super(props);
        this.onChangeNickName = this.onChangeNickName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            lnickname: '',
            lpassword: '',
            openError:false,
            vnickname:null,
        }
    }

    onChangeNickName(e) {
        this.setState({
            lnickname: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            lpassword: e.target.value
        })
    }
    //
    onSubmit(e) {
      e.preventDefault();
      const  nickname = this.state.lnickname;
      const  password = this.state.lpassword;
      axios.get('http://localhost:4000/users/login', {params: { nickname: nickname, password: password }})
        .then(response => {
          //this.setState({ business: response.data });
          if (response.data.length > 0) {
            console.log('Login success..');
            //debugger;
            localStorage.setItem('nickname', nickname);
            this.setState({
              vnickname:nickname,
            })
            this.props.history.push('/join');
          }else{
            console.log('Login Wrong...');
            this.setState({
              openError:true,
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        })

      this.setState({
        lnickname: '',
        lpassword: ''
      })
    }

    handleCloseError =() =>{
        this.setState({
          openError:false,
        })
      }
  render() {
      return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
          <div className={useStyles.paper}>
            <Avatar className={useStyles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Dialog
                style={{zIndex:9000}}
                open={this.state.openError}
                onClose={this.handleCloseError}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Login"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    User or Password wrong...
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseError} color="primary">
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
                    value={this.state.lnickname}
                    onChange={this.onChangeNickName}
                    autoFocus
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
                    value={this.state.lpassword}
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
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
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
  
export default withRouter(Login);  