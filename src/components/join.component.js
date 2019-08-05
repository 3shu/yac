import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import ChatOutlinedIcon from '@material-ui/icons/ChatBubbleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

function MadeMP() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built by the Mario Perez'}
    </Typography>
  );
}
//
const initialState = {
    nickname: '',
    room: ''
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  rootForm: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
  },
}));
//


class Join extends Component {
	constructor() {
        super();
        this.state = {
            nickname: localStorage.getItem('nickname'),
            room: '',
        }
    }

    clearForm() {
        this.setState({
            ...initialState
        });
    }

    inputUpdate(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    join() {
    	const { nickname, room} = this.state;
        if (nickname && room) {
	        this.props.history.push(`/chat/${nickname}/${room}`)
	    }
    }

	render() {
		return (
			<Container component="main" maxWidth="xs">
                <CssBaseline />
            <div className={useStyles.paper}>
                <Avatar className={useStyles.avatar}>
                  <ChatOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Join Us!!
                </Typography>
                <form className={useStyles.rootForm} noValidate>
	                <TextField
	                    variant="outlined"
                        margin="normal"
                        fullWidth
				        id="nickname"
				        label="Nickname"
				        name="nickname"
				        value={this.state.nickname}
				        onChange={this.inputUpdate.bind(this)}
				        InputProps={{
				          readOnly: true,
				        }}
				      />
				   		<FormControl 
				   		    variant="outlined"
				   			fullWidth
				   			className={useStyles.formControl}
				   		 >
					        <Select
					          value={this.state.room}
					          onChange={this.inputUpdate.bind(this)}
					          name="room"
					          displayEmpty
					        >
					          <MenuItem value="" disabled>
					            Choose an option
					          </MenuItem>
					          <MenuItem value={"ReactJS"}>React JS</MenuItem>
						      <MenuItem value={"NodeJS"}>Node JS</MenuItem>
					        </Select>
				    	</FormControl>
				    	<div className={useStyles.rootForm}>
					    <Button 
					       className={useStyles.submit}
					       fullWidth
					       variant="contained" 
					       color="primary" 
					       onClick={() => this.join()}
					     >
					        Join
					    </Button>
					    </div>
				</form>
			</div>
            <Box mt={5}>
                <MadeMP />
            </Box>
        </Container>
        )
    }
}

export default withRouter(Join);  