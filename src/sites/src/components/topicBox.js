import React from 'react';

export default class TopicBox extends React.Component {

  upVote() {
    this.props.upVote(this.props.id);
  }

  downVote() {
    this.props.downVote(this.props.id);
  }

  render() {
  	return (
  		<div className="topic-box">
      	<div className="col-left">
      		<div className="wrap">
            <div className="wrap-left">
              <div className="counter text-center">{this.props.upvotes}</div>
              <span className="glyphicon glyphicon-thumbs-up" style={{"color": "green"}} onClick={this.upVote.bind(this)} aria-hidden="true"></span>
            </div>
            <div className="wrap-right">
              <div className="counter text-center">{this.props.downvotes}</div>
              <span className="glyphicon glyphicon-thumbs-down" style={{"color": "red"}} onClick={this.downVote.bind(this)}aria-hidden="true"></span>
            </div>
      		</div>
      	</div>
      	<div className="col-right">
          <span className="topic-id">{"id:" + this.props.id}</span>
      		<p>{this.props.content}</p>
      	</div>
      </div>
  	)
  }
}