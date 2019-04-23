import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component{

  componentDidMount(){
    this.props.fetchStreams();
  }

  renderButtons(stream){
    if(stream.user === this.props.currentUserId){
      return(
        <div className="right floated content">
          <Link to={`/streams/edit/${stream._id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream._id}`} className="ui button negative">Delete</Link>
        </div>
      )
    }
  }

  createButton(){
    if(this.props.isSignedIn){
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/add" className="ui button primary">Create a stream</Link>
        </div>
      );
    }
  }

  renderList(){
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream._id}>
          {this.renderButtons(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/show/${stream._id}`} >{stream.title}</Link>
            <div className="description">
              {stream.description}
            </div>
          </div>
        </div>
      );
    })
  }

  render(){
    return(
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
          {this.createButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.user.id,
    isSignedIn: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);
