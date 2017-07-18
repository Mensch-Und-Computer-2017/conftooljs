/* eslint-env node */
'use strict';

const sha256 = require('sha256');

class ConfToolClientHelper {

  static getPasshash(nonce, key) {
    var hash = sha256(nonce + key);
    return hash;
  }

  static selectBasicOptions(defaultOptions, customOptions) {
    var options = [];
    for (let key in defaultOptions) {
      if (defaultOptions.hasOwnProperty(key)) {
        options.push({
          option: key,
          value: customOptions[key] || defaultOptions[key]
        });
      }
    }
    return options;
  }

  static selectExtendedOptions(defaultOptions, customOptions) {
    var options = [];
    if (!customOptions) {
      return options;
    }
    for (let i = 0; i < customOptions.length; i++) {
      let option = customOptions[i];
      if (defaultOptions.options.includes(option)) {
        options.push({
          option: defaultOptions.base,
          value: option
        });
      }
    }
    return options;
  }

  static createDataUrl(key, url, options) {
    var customOptions = options || {},
      dataUrl = url + '?',
      basicOptions = ConfToolClientHelper.selectBasicOptions(ConfToolClientHelper.DEFAULT_DATA_REQUEST_OPTIONS, customOptions),
      extendedOptions = ConfToolClientHelper.selectExtendedOptions(ConfToolClientHelper.EXTENDED_PAPER_REQUEST_OPTIONS, customOptions.extended),
      combinedOptions = basicOptions.concat(extendedOptions),
      timestamp = Date.now(),
      passhash = ConfToolClientHelper.getPasshash(timestamp, key);

    combinedOptions.push({
      option: 'nonce',
      value: timestamp
    });
    combinedOptions.push({
      option: 'passhash',
      value: passhash
    });
    for (let i = 0; i < combinedOptions.length; i++) {
      let option = combinedOptions[i];
      dataUrl += '&' + option.option + '=' + option.value;
    }
    return dataUrl;
  }

  static createFileUrl(options) {
    return options;
  }
}

ConfToolClientHelper.DEFAULT_DATA_REQUEST_OPTIONS = {
  page: 'adminExport',
  export_select: 'papers',
  form_include_deleted: '0',
  form_export_format: 'xml',
  form_export_header: 'default',
  cmd_create_export: 'true'
};

ConfToolClientHelper.EXTENDED_PAPER_REQUEST_OPTIONS = {
  base: 'form_export_papers_options%5B%5D',
  options: ['authors_extended', 'authors_extended_presenters', 'authors_extended_columns', 'abstracts', 'reviews', 'session', 'downloads', 'submitter', 'newlines']
};

module.exports = ConfToolClientHelper;