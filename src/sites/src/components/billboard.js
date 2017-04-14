import React from 'react';
import TopicBox from './topicBox'
import Footer from './footer'
import { Constants } from '../constants/constants'

export default class Billboard extends React.Component {

  onAddClick() {
    if (this.validateInput()) {
      this.props.addTopic(this.textInput.value.trim());
      this.clearInput();
    }
  }

  onKeyPress(self, event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      if (self.validateInput()) {
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
    var footer;
    var self = this;
    console.log("Render triggered!");
    if (this.props.data.topicList.length > 0) {
      // Sort topoics
      this.props.data.topicList.sort(function(a,b) {
        return parseInt(b.upvotes) - parseInt(a.upvotes)
      })

      this.props.data.topicList.forEach(function(t) {
        var hideClass = t.hideClass ? t.hideClass : '';
        topicBoxList.push(<TopicBox
          hideClass={hideClass}
          upVote={self.props.upVote}
          downVote={self.props.downVote}
          upvotes={t.upvotes}
          downvotes={t.downvotes} 
          content={t.content}
          id={t.id}
          key={t.id}/>
        )
      })
    } else {
      topicBoxList = (
        <div className="emptyPlaceholder">
          <span className="text">{"--- Be the first one to put topic ---"}</span>
        </div>
      )
    }

    console.log(this.props.data.totalRows);

    if (this.props.data.totalRows > Constants.PAGE_LIMIT) {
      footer = (
        <Footer 
          totalRows={this.props.data.totalRows}
          visibleRows={this.props.data.visibleRows} 
          className="footer"
          toggleVisibilityToAll={this.props.toggleVisibilityToAll}
          toggleVisibilityToPartial={this.props.toggleVisibilityToPartial}
          queryTopics={this.props.queryTopics} />
      )
    }

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
          {footer}
        </div>
      </div>
    )
  }
}