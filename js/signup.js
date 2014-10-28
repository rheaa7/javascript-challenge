/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/


'use strict';

function onReady() {

	var select = document.getElementsByName("state");
	for (var i = 0; i < usStates.length; i++) {
		var states = usStates[i].code;
		var names = usStates[i].name;
		var option = document.createElement("OPTION");
		option.value = states;
		option.textContent = names;
		select[0].appendChild(option);
	}

	var occ = document.getElementById("occupation");
	occ.addEventListener('change', otherOccupation);

	var cancel = document.getElementById('cancelButton');
	cancel.addEventListener('click', cancelPage);

	var submit = document.getElementById('signup');
	submit.addEventListener('submit', onSubmit);

}

function onSubmit(eventObject) {
	var valid = true;
	try {
		valid = validateForm(this);
	} catch (exception) {
		console.log(exception);
		valid = false;
	}

	if (!valid && eventObject.preventDefault) {
		eventObject.preventDefault();
	}

	eventObject.returnValue = valid;
	return valid;
}


function cancelPage() {
	if (window.confirm('Are you sure you want to exit this page?')) {
		window.location = 'https://www.google.com';
	}
}

function otherOccupation() {
	var show = document.getElementsByName("occupationOther");
	if (document.getElementById("occupation").value === 'other') {
		show[0].style.display = "block";
	} else {
		show[0].style.display = "none";
	}
}

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state'];

	if (document.getElementById("occupation").value === 'other') {
		requiredFields.push('occupationOther');
	}

	var i;
	var formValid = true;

	for (i = 0; i < requiredFields.length; i++) {
		formValid &= validateRequiredField(form.elements[requiredFields[i]]);
	}

	formValid &= validateZip(form.elements['zip']);
	formValid &= validateBirthday(form.elements['birthdate']);

}

function validateRequiredField(field) {
	var value = field.value.trim();
	var valid = value.length > 0;

	if (valid) {
		field.className = 'form-control';
	} else {
		field.className = 'form-control invalid-field';
	}

	return valid;
}

function validateZip(zip) {
	var zipRegExp = new RegExp('^\\d{5}$');
	var valid = zipRegExp.test(zip.value);

	if (valid) {
		zip.className = 'form-control';
	} else {
		zip.className = 'form-control invalid-field';
	}

	return valid;

}

function validateBirthday(bd) {
	var todaysDate = new Date();
	var birthday = new Date(bd.value);
	var yearsDiff = todaysDate.getFullYear() - birthday.getUTCFullYear();
	var monthsDiff = todaysDate.getMonth() - birthday.getUTCMonth();
	var daysDiff = todaysDate.getDate() - birthday.getUTCDate();

	if (monthsDiff < 0 || (0 === monthsDiff && daysDiff < 0)) {
		yearsDiff--;
	}

	var valid = (yearsDiff >= 13);

	if (valid) {
		bd.className = 'form-control';
	} else {
		bd.className = 'form-control invalid-field';
		document.getElementById("birthdateMessage").innerHTML = "You must be 13 years and over.";
	}

	return valid;

}


document.addEventListener('DOMContentLoaded', onReady());
