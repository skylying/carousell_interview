import React from 'react';

export default class TopicBox extends React.Component {
	render() {
		return (
			<div className="topic-box">
      	<div className="col-left">
      		<div className="wrap">
      			<span className="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
      			<div className="counter text-center">{this.props.count}</div>
      			<span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
      		</div>
      	</div>
      	<div className="col-right">
      		<p>{this.props.content}</p>
      	</div>
      </div>
		)
	}
}