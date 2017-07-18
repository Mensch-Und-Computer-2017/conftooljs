/* eslint-env node */
'use strict';

const ConfTool = require('./ConfTool.js'),
  PaperHelper = require('./PaperHelper.js');

class Paper {
  constructor(id, title, abstract, authors, keywords, isAccepted, submittedAt, updatedAt, files, session, positionInSession, raw) {
    this.id = id;
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
    this.raw = raw;
  }

  toString() {
    let string = ConfTool.Papers.TO_STRING_TEMPLATE;
    string = string.replace('{{ID}}', this.id);
    string = string.replace('{{TITLE}}', this.title);
    string = string.replace('{{FIRST_AUTHOR}}', this.authors[0].name);
    string = string.replace('{{KEYWORDS}}', this.keywords.join(','));
    return string;
  }

  // TODO: Check why ConfTools xml output contains duplicated for some nodes (paperID, submitting_author)
  static fromConfTool(data) {
    let id = data.paperID[0],
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
    return new Paper(id, title, abstract, authors, keywords, isAccepted, submittedAt, updatedAt, files, session, positionInSession, data);
  }
}

module.exports = Paper;