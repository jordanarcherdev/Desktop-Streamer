import React from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions';

class Chat extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name: 'Name in state',
      message: 'Message in state',
      messages: [],
      endpoint: 'http://192.168.0.13:5000'
    };

    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on('output', (data) => {
      addMessage(data);
    });

    const addMessage = (data) => {
      this.setState({messages: [...this.state.messages, data]});
    };

    this.send = (e) => {
      e.preventDefault();
      this.socket.emit('input',{
        name: this.props.userName,
        message:this.state.message
      })
    }
  }

  componentDidMount(){
    console.log(this.props.currentUserId)
    if(this.props.userName){console.log(this.props.userName)}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render(){
    if (!this.state.messages[0]){
      return (
        <div>
          <form>

            <input name="message" type="text" value={this.state.message} onChange={this.onChange} />
            <button onClick={this.send}>ClickMe</button>
        </form>

        </div>
      );
    }
    return (
      <div>
        <div style={{height:'250px',overflow: 'scroll'}} className="ui celled list">{this.state.messages.map(message => {
            return(
              <div className="item" key={message[0].name}><div className="header">{message[0].name}</div> - {message[0].message}</div>
            )
          })}</div>
        <form>

          <input name="message" type="text" value={this.state.message} onChange={this.onChange} />
        </form>
        <button onClick={this.send}>ClickMe</button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userName: state.auth.user.name
  }
}

export default connect(mapStateToProps, { getCurrentUser })(Chat);
