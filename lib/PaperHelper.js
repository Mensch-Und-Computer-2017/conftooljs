/* eslint-env node */
'use strict';

const ConfTool = require('./ConfTool.js'),
  File = require('./File.js'),
  Session = require('./Session.js');

class PaperHelper {
  static extractAuthors(paper) {
    var authors = [];
    for (let i = 0; i < ConfTool.Papers.MAX_AUTHORS; i++) {
      let nameKey = ConfTool.Papers.AUTHOR_NAME_TEMPLATE.replace('{{ID}}', i),
        organisationKey = ConfTool.Papers.AUTHOR_ORGANISATION_TEMPLATE.replace('{{ID}}', i),
        mailKey = ConfTool.Papers.AUTHOR_MAIL_TEMPLATE.replace('{{ID}}', i),
        isSubmitting = false,
        isPresenting = false;
      if (paper[nameKey] === undefined || paper[nameKey] === '') {
        continue;
      }

      if (paper[ConfTool.Papers.SUBMITTING_AUTHOR_KEY]) {
        if (paper[ConfTool.Papers.SUBMITTING_AUTHOR_KEY][0] === paper[nameKey]) {
          isSubmitting = true;
        }
      }

      if (paper[ConfTool.Papers.PRESENTING_AUTHOR_KEY]) {
        if (paper[ConfTool.Papers.PRESENTING_AUTHOR_KEY] === paper[nameKey].replace('*', '')) {
          isPresenting = true;
        }
      }

      authors.push({
        name: paper[nameKey].replace('*', ''),
        organisation: paper[organisationKey],
        mail: paper[mailKey],
        isSubmitting: isSubmitting,
        isPresenting: isPresenting
      });
    }

    return authors;
  }

  static extractKeywords(paper) {
    var keywords = [];
    if (paper.keywords !== undefined && typeof paper.keywords === 'string') {
      keywords = paper.keywords.split(',');
    }
    return keywords;
  }

  static extractFiles(paper) {
    var files = [];
    for (let i = 0; i < ConfTool.Files.FILE_IDS.length; i++) {
      let id = ConfTool.Files.FILE_IDS[i],
        filenameKey = ConfTool.Files.ORIGINAL_FILENAME_TEMPLATE.replace('{{ID}}', id),
        downloadKey = ConfTool.Files.DOWNLOAD_LINK_TEMPLATE.replace('{{ID}}', id),
        updateKey = ConfTool.Files.LAST_UPLOAD_TEMPLATE.replace('{{ID}}', id),
        isFinal = false;
      if (paper[filenameKey] !== undefined) {
        if(id.includes(ConfTool.Files.ID_MODIFICATOR_FOR_FINAL)) {
          isFinal = true;
        }
        files.push(new File(paper[filenameKey], paper[downloadKey], PaperHelper.parseDate(paper[updateKey]), isFinal));
      }
    }
    return undefined;
  }

  static extractSession(paper) {
    var session,
      id = paper.session_ID,
      title = paper.session_title,
      shortTitle = paper.session_short,
      startsAt = PaperHelper.parseDate(paper.session_start),
      endsAt = PaperHelper.parseDate(paper.session_end),
      sessionInfo = paper.session_info,
      chairs = [];

    for (let i = 1; i <= ConfTool.Papers.MAX_CHAIRS; i++) {
      let chairKey = ConfTool.Papers.SESSION_CHAIR_KEY_TEMPLATE.replace('{{ID}}, i');
      if (paper[chairKey] !== undefined) {
        chairs.push({
          name: paper[chairKey]
        });
      }
    }
    session = new Session(id, title, shortTitle, startsAt, endsAt, sessionInfo, chairs);
    return session;
  }

  static parseDate(date) {
    if (typeof date === 'string') {
      return new Date(date);
    }
    return undefined;
  }
}

module.exports = PaperHelper;