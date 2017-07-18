/* eslint-env node */
'use strict';

class PaperHelper {
  static extractAuthors(paper) {
    var authors = [];
    for (let i = 0; i < PaperHelper.MAX_AUTHORS; i++) {
      let nameKey = PaperHelper.AUTHOR_NAME_TEMPLATE.replace('{{ID}}', i),
        organisationKey = PaperHelper.AUTHOR_ORGANISATION_TEMPLATE.replace('{{ID}}', i),
        mailKey = PaperHelper.AUTHOR_MAIL_TEMPLATE.replace('{{ID}}', i),
        isSubmitting = false,
        isPresenting = false;
      if (paper[nameKey] === undefined || paper[nameKey] === '') {
        continue;
      }

      if (paper[PaperHelper.SUBMITTING_AUTHOR_KEY]) {
        if (paper[PaperHelper.SUBMITTING_AUTHOR_KEY][0] === paper[nameKey]) {
          isSubmitting = true;
        }
      }

      if (paper[PaperHelper.PRESENTING_AUTHOR_KEY]) {
        if (paper[PaperHelper.PRESENTING_AUTHOR_KEY] === paper[nameKey].replace('*', '')) {
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

    return keywords;
  }

  static extractFiles(paper) {
    return undefined;
  }

  static extractSession(paper) {
    return undefined;
  }

  static parseDate(date) {
    return undefined;
  }
}

PaperHelper.MAX_AUTHORS = 15;
PaperHelper.AUTHOR_NAME_TEMPLATE = 'authors_formatted_{{ID}}_name';
PaperHelper.AUTHOR_ORGANISATION_TEMPLATE = 'authors_formatted_{{ID}}_organisation';
PaperHelper.AUTHOR_MAIL_TEMPLATE = 'authors_formatted_{{ID}}_email';
PaperHelper.SUBMITTING_AUTHOR_KEY = 'submitting_author';
PaperHelper.PRESENTING_AUTHOR_KEY = 'presenting_author';

module.exports = PaperHelper;