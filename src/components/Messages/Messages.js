import React from 'react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';
import Message from './Message';

class Messages extends React.Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        messages: [],
        messagesLoading: true,
        user: this.props.currentUser,
        numUnqiueUsers: '',
        searchTerm: '',
        searchLoading: false,
        searchResults: []
    }
    componentDidMount() {
        const { channel, user } = this.state;
        if (channel && user) {
            this.addListenders(channel.id);
        }
    }

    addListenders = (channelId) => {
        this.addMessageListener(channelId);
    }

    addMessageListener = (channelId) => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val());
            this.setState({ messages: loadedMessages, messagesLoading: false });
            this.countUniqueUsers(loadedMessages);
        })
    };

    handleSearchChange = event => {
        this.setState({
            searchTerm: event.target.value,
            searchLoading: true
        }, () => this.handleSearchMessages());
    }

    handleSearchMessages = () => {
        const channelMessages = [...this.state.messages];
        const regex = new RegExp(this.state.searchTerm, 'gi');
        const searchResults = channelMessages.reduce((acc, message) => {
            // eslint-disable-next-line
            if (message.content && message.content.match(regex) || message.user.name.match(regex)) {
                acc.push(message);
            }
            return acc;
        }, []);
        this.setState({ searchResults });
        setTimeout(() => this.setState({ searchLoading: false }), 1000);
    }

    countUniqueUsers = messages => {
        const uniqueUsers = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc;
        }, []);
        const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
        const numUnqiueUsers = `${uniqueUsers.length} user${plural ? 's' : ''}`;
        this.setState({ numUnqiueUsers });
    }

    displayMessages = messages => (
        messages.length > 0 && messages.map(message => (
            <Message
                key={message.timestamp}
                message={message}
                user={this.state.user}
            />
        ))
    );

    displayChannelName = channel => channel ? `#${channel.name}` : '';


    render() {
        const { messagesRef, channel, messages, user, numUnqiueUsers, searchTerm, searchResults, searchLoading } = this.state;
        return (
            <React.Fragment>
                <MessagesHeader channelName={this.displayChannelName(channel)} numUnqiueUsers={numUnqiueUsers} handleSearchChange={this.handleSearchChange} searchLoading={searchLoading} />
                <Segment>
                    <Comment.Group className='messages'>
                        {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>
                <MessageForm messagesRef={messagesRef} currentChannel={channel} currentUser={user} />
            </React.Fragment>
        )
    }
}

export default Messages;