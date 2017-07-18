/* eslint-env node */
'use strict';

var ConfTool = {};
ConfTool.Papers = {};
ConfTool.Papers.MAX_AUTHORS = 15;
ConfTool.Papers.MAX_CHAIRS = 2;
ConfTool.Papers.AUTHOR_NAME_TEMPLATE = 'authors_formatted_{{ID}}_name';
ConfTool.Papers.AUTHOR_ORGANISATION_TEMPLATE = 'authors_formatted_{{ID}}_organisation';
ConfTool.Papers.AUTHOR_MAIL_TEMPLATE = 'authors_formatted_{{ID}}_email';
ConfTool.Papers.SUBMITTING_AUTHOR_KEY = 'submitting_author';
ConfTool.Papers.PRESENTING_AUTHOR_KEY = 'presenting_author';
ConfTool.Papers.SESSION_CHAIR_KEY_TEMPLATE = 'chair{{ID}}';
ConfTool.Papers.TO_STRING_TEMPLATE = '[{{ID}}]\t{{TITLE}} ({{FIRST_AUTHOR}}) [{{KEYWORDS}}]';
ConfTool.Files = {};
ConfTool.Files.FILE_IDS = ['a', 'b', 'c', 'final_a', 'final_b', 'final_c'];
ConfTool.Files.ID_MODIFICATOR_FOR_FINAL = 'final_';
ConfTool.Files.ORIGINAL_FILENAME_TEMPLATE = 'original_filename_{{ID}}';
ConfTool.Files.DOWNLOAD_LINK_TEMPLATE = 'download_link_{{ID}}';
ConfTool.Files.LAST_UPLOAD_TEMPLATE = 'last_upload_{{ID}}';

module.exports = ConfTool;