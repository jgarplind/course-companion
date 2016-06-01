import '../stylesheets/pure.css';
import '../stylesheets/style.css';
import '../stylesheets/font-awesome.css';

import React, { Component } from 'react';

export default class Course extends Component {

	render() {

		const linkAddress = "http://kdb-5.liu.se/liu/lith//studiehandboken/svkursplan.lasso?k_budget_year=2016&k_kurskod=" + this.props.course.code;

		let typeIconClass = '';

		if(this.props.type === 'master') {
			typeIconClass = 'fa fa-star';
		} else if (this.props.type === 'technical') {
			typeIconClass = 'fa fa-wrench';
		} else if (this.props.type === 'base') {
			typeIconClass = 'fa fa-pencil';
		} else {
			typeIconClass = 'fa fa-question';
		}

		return (
			<li className="pure-g">		
				<a className="pure-u-1-5" href={linkAddress}>
					{this.props.course.code}
				</a>
				
				<span className="pure-u-1-8">
					{this.props.course.points}
				</span>
				
				<span className="pure-u-1-8">
					<i className={typeIconClass} aria-hidden="true"></i>
				</span>
				
				<span className="pure-u-1-2">
					{this.props.course.name}
				</span>
			</li>
		);
	}
}