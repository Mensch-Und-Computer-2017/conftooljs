/* eslint-env node */
'use strict';

const ConfTool = require('./ConfTool.js'),
  PaperHelper = require('./PaperHelper.js'),
  EasyXml = require('easyxml');

var XMLSerializer = new EasyXml({
  singularize: true,
  dateFormat: 'JS',
  rootElement: 'paper'
});

class Paper {
  constructor(id, type, title, abstract, authors, keywords, isAccepted, submittedAt, updatedAt, files, session, positionInSession, raw) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.abstract = abstract;
    this.authors = authors;
    this.keywords = keywords;
    this.isAccepted = isAccepted;
    this.submittedAt = submittedAt;
    this.updatedAt = updatedAt;
    this.files = files;
    this.session = session;
    this.positionInSession = positionInSession;
    this.exportedProperties = ['id', 'type', 'title', 'abstract', 'authors', 'keywords', 'isAccepted', 'submittedAt', 'updatedAt', 'files', 'session', 'positionInSession'];
    this.raw = raw;
  }

  getExportObject() {
    var obj = {};
    for (let i = 0; i < this.exportedProperties.length; i++) {
      let key = this.exportedProperties[i];
      if (this.hasOwnProperty(key)) {
        obj[key] = this[key];
      }
    }
    return obj;
  }

  toString() {
    let string = ConfTool.Papers.TO_STRING_TEMPLATE;
    string = string.replace('{{ID}}', this.id);
    string = string.replace('{{TITLE}}', this.title);
    string = string.replace('{{FIRST_AUTHOR}}', this.authors[0].name);
    string = string.replace('{{KEYWORDS}}', this.keywords.join(','));
    return string;
  }

  toJSON() {
    return JSON.stringify(this.getExportObject());
  }

  toXML() {
    var obj = this.getExportObject();
    return XMLSerializer.render(obj);
  }

  addPropertyToExport(property) {
    if (this.exportedProperties.includes(property)) {
      return;
    }
    if (this.hasOwnProperty(property)) {
      this.exportedProperties.push(property);
    }
  }

  export (format) {
    switch (format) {
      case ConfTool.Exports.JSON:
        return this.toJSON();
      case ConfTool.Exports.XML:
        return this.toXML();
      default:
        return undefined;
    }
  }

  // TODO: Check why ConfTools xml output contains duplicated for some nodes (paperID, submitting_author)
  static fromConfTool(data) {
    let id = data.paperID[0],
      type = data.contribution_type,
      title = data.title,
      abstract = data.abstract,
      authors = PaperHelper.extractAuthors(data),
      keywords = PaperHelper.extractKeywords(data),
      isAccepted = data.acceptance === 'Accepted' ? true : false,
      submittedAt = PaperHelper.parseDate(data.paper_submitted),
      updatedAt = PaperHelper.parseDate(data.paper_last_update),
      files = PaperHelper.extractFiles(data),
      session = PaperHelper.extractSession(data),
      positionInSession = data.session_numberInSession;
    return new Paper(id, type, title, abstract, authors, keywords, isAccepted, submittedAt, updatedAt, files, session, positionInSession, data);
  }
}

module.exports = Paper;