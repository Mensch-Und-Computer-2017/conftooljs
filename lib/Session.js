/* eslint-env node */
'use strict';

class Session {
  constructor(id, title, shortTitle, startsAt, endsAt, sessionInfo, chairs) {
    this.id = id;
    this.title = title;
    this.shortTitle = shortTitle;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
    this.sessionInfo = sessionInfo;
    this.chairs = chairs;
  }

}

module.exports = Session;