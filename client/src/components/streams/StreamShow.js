import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import Chat from '../Chat';

class StreamShow extends React.Component {

  constructor(props){
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount(){

    const { id } = this.props.match.params;

    this.props.fetchStream(id)
    this.buildPlayer()
  }

  componentDidUpdate(){
    this.buildPlayer();
  }

  componentWillUnmount(){
    this.player.destroy();
  }

  buildPlayer(){
    const { id } = this.props.match.params;

    if(this.player || !this.props.stream){return;}

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}`
    });
    this.player.attachMediaElement(this.videoRef.current)
    this.player.load();
  }

  render(){

    if(!this.props.stream){
      return <div>loading...</div>
    }
    console.log(this.props)
    return(
      <div>
        <video
          ref={this.videoRef}
          style={{width: '100%'}}
          controls
        />
        <h1>{this.props.stream.title}</h1>
        <p>{this.props.stream.description}</p>
        <p>{this.props.stream.user.name}</p>

        <div>
          <Chat />
        </div>

      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);
