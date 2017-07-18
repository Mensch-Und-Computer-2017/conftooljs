/* eslint-env node */
'use strict';

const request = require('request'),
  HttpStatus = require('http-status-codes'),
  ConfToolClientHelper = require('./ConfToolClientHelper.js');

class ConfToolClient {
  constructor(options) {
    this.key = options.apiKey;
    this.baseUrl = options.baseUrl;
  }

  downloadSubmissions(options) {
    var that = this;
    return new Promise(function(resolve, reject) {
      let url = ConfToolClientHelper.createDataUrl(that.key, that.baseUrl, options);
      request.get(url, function(error, response, body) {
        if (!error && response.statusCode === HttpStatus.OK) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
}

module.exports = ConfToolClient;