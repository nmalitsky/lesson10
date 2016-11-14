'use strict';

module.exports = class Contact {
	constructor (contact) {
		this.firstName = contact.firstName;
		this.middleName = contact.middleName;
		this.secondName = contact.secondName;
		this.phone = contact.phone;
	}

	show() {
		console.log(`ФИО: ${this.secondName} ${this.firstName} ${this.middleName}, телефон: ${this.phone}`);
	}

	get obj() {
		return {firstName: this.firstName, middleName: this.middleName, secondName: this.secondName, phone: this.phone};
	}
}

