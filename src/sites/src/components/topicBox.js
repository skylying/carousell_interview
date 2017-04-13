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
      			<span className="glyphicon glyphicon-menu-up" onClick={this.upVote.bind(this)} aria-hidden="true"></span>
      			<div className="counter text-center">{this.props.votes}</div>
      			<span className="glyphicon glyphicon-menu-down" onClick={this.downVote.bind(this)}aria-hidden="true"></span>
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