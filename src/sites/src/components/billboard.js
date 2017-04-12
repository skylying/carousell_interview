import React from 'react';

export default class Billboard extends React.Component {
	render() {
		return (
			<div id="container-fluid">
			  <div className="row">
			    <div className="col-md-6 col-md-offset-3">
			      <div id="billboard">
			        <div className="head-box">
			          <h1>Add Topic</h1>
			          <div className="input-group">
			            <input type="text" className="form-control" placeholder="What's on your mind?" />
			            <span className="input-group-btn">
			              <button id="add" className="btn btn-success" type="button">Add</button>
			              <button id="get" className="btn btn-success" type="button">Get</button>
			            </span>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}