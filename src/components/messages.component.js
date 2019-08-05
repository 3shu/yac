import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import '../assets/messagelist.css';
import '../assets/message.css';
import '../assets/toolbar.css';
class Messages extends Component {
    render() {
        return (
            <div className="message-list">
                <div className="toolbar">
                    <div className="left-items"></div>
                    <h1 className="toolbar-title">Conversations</h1>
                    <div className="right-items"></div>
                </div>
                <div id="list">
                    <ul>
                        {this.props.messages.filter(message => message.room === this.props.room).map((message, index) => (
                            <li key={index}>

                                {message.url &&
                                    <div key={index} className="message end">
                                        <div className="bubble-container">
                                            <div className="bubble" title={message.createdDate}>
                                                <b>{message.from}:</b> 
                                                <ReactPlayer 
                                                 url={message.url} 
                                                 controls={true}   
                                                 playing />
                                            </div>
                                        </div>
                                    </div>
                                }

                                {!message.url &&
                                    <div key={index} className="message end">
                                        <div className="bubble-container">
                                            <div className="bubble" title={message.createdDate}>
                                             <b>{message.from}:</b> {message.text}
                                            </div>
                                        </div>
                                    </div>
                                }

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Messages;