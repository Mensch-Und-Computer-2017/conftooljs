/* eslint-env node */
'use strict';

const Person = require('./Person.js');

class Author extends Person() {
  constructor(name, mail, organisation, isSubmitting, isPresenting) {
    super(name);
    this.mail = mail;
    this.organisation = organisation;
    this.isSubmitting = isSubmitting;
    this.isPresenting = isPresenting;
  }
}

module.exports = Author;