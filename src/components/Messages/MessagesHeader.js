import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

class MessagesHeader extends React.Component {
    render() {
        const { channelName, numUnqiueUsers, handleSearchChange, searchLoading, isPrivateChannel, handleStar, isChannelStarred } = this.props;
        return (
            <Segment clearing>
                {/* Channel title */}
                <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
                    <span>
                        {channelName}
                        {!isPrivateChannel && (
                            <Icon name={isChannelStarred ? 'star' : 'star outline'} onClick={handleStar} color={isChannelStarred ? 'yellow' : 'black'} />
                        )}
                    </span>
                    <Header.Subheader>{numUnqiueUsers}</Header.Subheader>
                </Header>
                {/* Channel search input */}
                <Header floated='right'>
                    <Input size='mini' icon='search' name='searchTerm' placeholder='Search Messages' onChange={handleSearchChange} loading={searchLoading} />
                </Header>
            </Segment>
        )
    }
}

export default MessagesHeader;