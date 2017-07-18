/* eslint-env node */
'use strict';

class File {
  constructor(name, downloadLink, lastUpdatedAt, isFinal) {
    this.name = name;
    this.downloadLink = downloadLink;
    this.lastUpdatedAt = lastUpdatedAt;
    this.isFinal = isFinal;
  }
}

module.exports = File;