// Bit messy, clean up

import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

//Importing these two for trying courses with search bar
import { Courses } from '../../api/courses/courses.js';

import Course from './Course.jsx';
//

import { addEducation, addTechnical, addMaster, refreshCourses } from '../../api/users/methods.js';

export default class InputField extends TrackerReact(React.Component) {
	// Needed to make sure reloading works
	constructor() {
		super();
		this.state = {
			subscription: {
				user: Meteor.subscribe('user')
			}
		};
	}

	handleInput(event) {
		event.preventDefault();
		
		let text = this.refs.input.value.trim();
		let user = Meteor.user();

		if(user.master) {
			
		} else if (user.technical) {
			addMaster.call({
				userId: Meteor.userId(),
				master: text
			});
		} else if (user.education) {
			addTechnical.call({
				userId: Meteor.userId(),
				technical: text
			});
		} else {
			addEducation.call({
				userId: Meteor.userId(),
				education: text
			});
		}

		refreshCourses.call({
			userId: Meteor.userId()
		});

		this.refs.input.value = "";
	}

	render() {
		if(this.state.subscription.user.ready()) {
			let user = Meteor.user();
			if(user.master) {
				this.refs.input.hidden = true;
			} else if (user.technical) {
				this.refs.input.placeholder = 'Master profile';
			} else if (user.education) {
				this.refs.input.placeholder = 'Technical specialization';
			} else {
				this.refs.input.placeholder = 'Education';
			}
		}

		return (
			<form onSubmit={this.handleInput.bind(this)}> 
				<input
					type="text"
					ref="input"
				/>
			</form>
		);
	}
};
