import React from 'react';
import { Constants } from '../constants/constants'

export default class TopicBox extends React.Component {

  onToggleShowAll() {
    this.props.toggleVisibilityToAll()
  }

  onToggleShowTop() {
    this.props.toggleVisibilityToPartial()
  }

  render() {
    var toggleBtn = null;
    if (this.props.visibleRows < this.props.totalRows) {
      toggleBtn = (
        <button onClick={this.onToggleShowAll.bind(this)} className="btn btn-default">{"Show All Topics"}</button>
      )
    } else {
      toggleBtn = (
        <button onClick={this.onToggleShowTop.bind(this)} className="btn btn-default">{"Show Top " + Constants.PAGE_LIMIT + " Topics"}</button>
      )
    }
    return (
      <div className="footer">
        <div className="rows-text">
          {"You are seeing " + this.props.visibleRows + " of " + this.props.totalRows + " topics"}
        </div>
        {toggleBtn}
      </div>
    )
  }
}