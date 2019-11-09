import ChatList from './ChatList'
import MessageList from '/.MessageList'
// import MessageList from 'MessageList';

function Body(props) {
	const { mode } = props.state
	switch(mode) {
		case 'chats':
			return ChatList(props);
		case 'messages':
			// return MessageList();
			break;
		default:
			break;
	}
}

export default Body;
