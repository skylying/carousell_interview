import React from 'react';
import TopicBox from './topicBox'

export default class Billboard extends React.Component {

	// Get all props
	//const { data, addTopic } = props;

	onAddClick() {
	  this.props.addTopic(this.textInput.value);
	}

	componentDidMount() {
		this.props.queryTopics()
	}

	render() {
		// TODO: Deal with no topic situation
		var topicBoxList = [];
		var self = this;
		if (this.props.data.length > 0) {
			this.props.data.sort(function(a,b) {
				return a.votes < b.votes
			})
		}
		this.props.data.forEach(function(t) {
			topicBoxList.push(<TopicBox
				upVote={self.props.upVote}
				downVote={self.props.downVote}
			  votes={t.votes} 
			  content={t.content} 
			  id={t.id}
			  key={t.id}/>
		  )
		})

		return (
			<div id="container-fluid">
			  <div id="billboard">
	        <div className="head-box">
	          <h1>Add Topic</h1>
	          <div className="input-group">
	            <input
	              ref={(input) => { this.textInput = input; }}
	              type="text" className="form-control" placeholder="What's on your mind?" />
	            <span className="input-group-btn">
	              <button id="add" className="btn btn-success" type="button" onClick={this.onAddClick.bind(this)}>Add</button>
	            </span>
	          </div>
	        </div>
	        {topicBoxList}
	      </div>
			</div>
		)
	}
}