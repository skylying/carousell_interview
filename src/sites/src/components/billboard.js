import React from 'react';
import TopicBox from './topicBox'

export default class Billboard extends React.Component {

	// Get all props
	//const { data, addTopic } = props;

	onAddClick() {
		if (this.validateInput()) {
			this.props.addTopic(this.textInput.value.trim());
	  	this.clearInput();
		}
	}

	onKeyPress(self, event) {
		if (event.key == 'Enter') {
			if (this.validateInput()) {
				event.preventDefault();
				self.props.addTopic(self.textInput.value.trim());
				self.clearInput();
			}
		}
	}

	validateInput() {
		var isValid = true;
		var value = this.textInput.value;
		if (value.trim() == '') {
			return false
		}
		return isValid
	}

	clearInput() {
		this.textInput.value = '';
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
	          <h1>Weekly Billboard</h1>
	          <div>
	            <textarea
	            	maxLength="255"
	            	className="form-control custom-textarea"
	            	onKeyPress={this.onKeyPress.bind(null, this)}
	              ref={(input) => { this.textInput = input; }}
	              type="text" placeholder="Put some topic here !" />
	              <button id="add" className="btn btn-success float" type="button" onClick={this.onAddClick.bind(this)}>Add</button>
	          </div>
	        </div>
	        {topicBoxList}
	      </div>
			</div>
		)
	}
}