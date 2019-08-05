import React, { Component } from 'react';
import '../assets/activeusers.css';
import '../assets/toolbar.css';
import '../assets/ConversationListItem.css';

class ActiveUsers extends Component {
    render() {
        
        return (
            <div className="conversation-list">
                <div className="toolbar">
                    <div className="left-items"></div>
                    <h1 className="toolbar-title">Active users</h1>
                    <div className="right-items"></div>
                </div>
                {this.props.users.map((user, index) => (
                    <div className="conversation-list-item">
                        <img className="conversation-photo" src="https://pickaface.net/gallery/avatar/20120414_203922_1353_bira.png" alt="conversation" />
                        <div className="conversation-info">
                            <h1 className="conversation-title">{ user }</h1>
                        </div>
                    </div>
                ))}

            </div>
        )
    }
}

export default ActiveUsers;