/* eslint-env node */
'use strict';

const request = require('request'),
  HttpStatus = require('http-status-codes'),
  ConfTool = require('./ConfTool.js'),
  ConfToolClientHelper = require('./ConfToolClientHelper.js');

class ConfToolClient {
  constructor(options) {
    this.key = options.apiKey;
    this.baseUrl = options.baseUrl;
  }

  downloadData(target, options) {
    var that = this;
    return new Promise(function(resolve, reject) {
      let url = ConfToolClientHelper.createDataUrl(target, that.key, that.baseUrl, options);
      request.get(url, function(error, response, body) {
        if (!error && response.statusCode === HttpStatus.OK) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }

  downloadSubmissions(options) {
    return this.downloadData(ConfTool.Papers.TARGET, options);
  }

  downloadSessions(options) {
    return this.downloadData(ConfTool.Sessions.TARGET, options);
  }

}

module.exports = ConfToolClient;