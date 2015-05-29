var util = require('util');
var events = require('events');
var flag = require('chai-nightwatch/lib/chai/utils/flag.js');
var BaseAssertion = require('./_baseAssertion.js');

function VisibleAssertion() {
  BaseAssertion.call(this);

  this.message = 'Expected element <%s> to ' + (this.negate ? 'not be visible' : 'be visible');
  this.start();
}

util.inherits(VisibleAssertion, BaseAssertion);

VisibleAssertion.prototype.executeCommand = function(callback) {
  this.protocol.elementIdDisplayed(this.elementResult.ELEMENT, callback);
};

VisibleAssertion.prototype.elementFound = function() {
  if (this.retries > 0) {
    return;
  }

  this.passed = this.negate ? !this.resultValue : this.resultValue;
  this.expected = this.negate ? 'not visible' : 'visible';
  this.actual = this.resultValue ? 'visible' : 'not visible';

  if (this.passed && this.waitForMs) {
    this.messageParts.push(' - condition was met in ' + this.getElapsedTime() + 'ms');
  }
};

VisibleAssertion.prototype.elementNotFound = function() {
  this.passed = false;
  this.expected = this.negate ? 'not visible' : 'visible';
  this.actual = 'not found';
  this.messageParts.push(' - element was not found');
};

VisibleAssertion.prototype.retryCommand = function() {
  this.onPromiseResolved();
};

module.exports = VisibleAssertion;