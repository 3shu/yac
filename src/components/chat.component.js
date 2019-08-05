import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import io from 'socket.io-client';
import ActiveUsers from './activeusers.component';
import Messages from './messages.component';
import moment from 'moment';
import axios from 'axios';
import SendIcon from '@material-ui/icons/Send';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import Config from '../apis/youtube';
import YTSearch from 'youtube-api-search';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
//import Button from '@material-ui/core/Button';
import '../assets/chat.css';
import '../assets/compose.css';
import '../assets/toolbar.css';
//
const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));
var socket;
class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            messages: [],
            newMsg: '',
        }

        //this.videoSearch('surfboards');
    }

    
    componentWillUnmount(){
        const param = {
            room: this.props.match.params.room
        }
        //debugger;
        socket.emit('leave', param);
        this.setState ({
            users: [],
            messages: [],
            newMsg: '',
        });
    }

    componentDidMount() {
        const scopeThis = this;
        const params = {
            nickname: this.props.match.params.nickname,
            room: this.props.match.params.room
        }

        socket = io('http://localhost:4000')
        //debugger;
        socket.emit('join', params, function (err) {
            if (err) {
                this.props.history.push('/');
            }
        });

        socket.on('updateUserList', function (users) {
            //debugger;
            scopeThis.setState({
                users
            });
        });

        socket.on('newMessage', (message) => {
            var formattedTime = moment(message.createdDate).format('h:mm a');
            let newMsg = {
                text: message.text,
                from: message.from,
                room: message.room,
                createdDate: formattedTime
            }
            //console.log(newMsgDB);
            let results = scopeThis.state.messages;
            results.push(newMsg);
            scopeThis.setState({
                messages: results
            });
            //DB
            if (message.from !== "Admin") {
                let newMsgDB = {
                    from: message.from,
                    room: message.room,
                    text: message.text
                }
                axios.post('http://localhost:4000/chat/add', newMsgDB).then(res => console.log(res.data));
            }
            var msgArr = scopeThis.state.messages.filter(message => message.room === this.props.match.params.room);
            if (msgArr.length > 3) {
                scopeThis.scrollToBottom();
            }
        });
        //Youtube
        socket.on('newMessageYT', (message) => {
            var formattedTime = moment(message.createdDate).format('h:mm a');
            let newMsg = {
                url: message.url,
                from: message.from,
                room: message.room,
                createdDate: formattedTime
            }
            let results = scopeThis.state.messages;
            results.push(newMsg);
            scopeThis.setState({
                messages: results
            });
            //DB
            if (message.from !== "Admin") {
                let newMsgDB = {
                    from: message.from,
                    room: message.room,
                    text: message.url
                }
                axios.post('http://localhost:4000/chat/add', newMsgDB).then(res => console.log(res.data));
            }
            // var msgArr = scopeThis.state.messages.filter(message => message.room === this.props.match.params.room);
            // if (msgArr.length > 3) {
            //     scopeThis.scrollToBottom();
            // }
        });

        socket.on('disconnect', function () {
            console.log('Connection lost from server.');
        });

    }

    scrollToBottom() {
        // selectors
        // var listHeight = document.querySelector('.message-list #list ul');
        // var messagesList = document.querySelector('.message-list #list');
        // var newMessage = document.querySelector('.message-list #list ul li:last-child');
        // // heights
        // var messagesWrapperHeight = listHeight.clientHeight;
        
        // var clientHeight = messagesList.clientHeight;
        // var scrollTop = messagesList.scrollTop;
        // var scrollHeight = messagesList.scrollHeight;
        // var newMessageHeight = newMessage.offsetHeight;
        // var lastMessageHeight = newMessage.previousSibling.offsetHeight;
        // var v_scrollHeight = clientHeight + scrollTop + newMessageHeight + lastMessageHeight;
        // console.log(scrollHeight);
        // console.log(v_scrollHeight);
        // if (v_scrollHeight >= scrollHeight) {
        //     console.log(messagesList);
        //     messagesList.scrollTo(0, messagesWrapperHeight)
        // }
        const objDiv =document.getElementById('scrollmsg');
        console.log(objDiv.scrollHeight);
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    clearForm() {
        this.setState({
            newMsg: ''
        });
    }


    inputUpdate(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }
    videoSearch(term){
        YTSearch(
          { key: Config.API_KEY, term }
          , (videos) =>{
              socket.emit('createYouTubeMsg', {'video': videos[0].id.videoId}, function (data) { })
            });
    }

    newMessage(e) {
        e.preventDefault()
        var v_newMsg = this.state.newMsg;
        var n = v_newMsg.indexOf("/youtube");
        const vSearchVideo = v_newMsg.substring(9);
        var obj = {
            'text': v_newMsg
        };
        //var listHeight = document.querySelector('.message-list #list ul');
        //console.log(listHeight);

        if (n === 0) {
            console.log('Search youtube...');

            //debugger;
            //console.log(this.state.searchVideo);
            this.videoSearch(vSearchVideo);
        }else{
            socket.emit('createMessage', obj, function (data) { });
        }
        //console.log(this.state.newMsg);
        this.clearForm();
    }
    

    render() {

        const { newMsg } = this.state;

        return (
            <div className="messenger">
                <div className="scrollable sidebar">
                    <ActiveUsers users={this.state.users} />
                </div>
                <div id='scrollmsg' className="scrollable content">
                    <h1>
                        <Link to="/" refresh="true">
                            <LeftIcon className={useStyles.submit} />
                        </Link>
                        {this.props.match.params.room}
                    </h1>
                    <div className="message-list-container">
                        <Messages messages={this.state.messages} room={this.props.match.params.room} />
                    </div>

                    <div className="compose">
                        <form className="composeForm" onSubmit={(e) => this.newMessage(e)}>
                            <TextField
                                className="compose-input"
                                margin="normal"
                                id="newMsg"
                                placeholder="Type your message..."
                                name="newMsg"
                                autoComplete="off"
                                value={newMsg} 
                                onChange={this.inputUpdate.bind(this)}
                                autoFocus
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        edge="end"
                                        aria-label="send"
                                        onClick={(e) => this.newMessage(e)}
                                      >
                                      <SendIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                        </form>
                    </div>   
                </div>
            </div>
        )
    }
}

export default withRouter(Chat);