'use strict';
const Promisse = require('bluebird'),
      AuthBusiness = require('./auth.business'),
      config = require('../../config'),
      Mailgun = require('mailgun-js')({apiKey: config.mailgun_key, domain: config.mailgun_domain});

class MailBusiness {
  constructor(){}

  _dispatch(destination, subject, html) {
    var message = {
      from: 'Gabriel Age <noreply@colorbucket.co>',
      to: destination,
      subject: subject,
      html: html
    };
    Mailgun.messages().send(message, function (error, body) {});
  }

  sendRecoveryEmail(email, hash) {
    let link = 'http://colorbucket.co/#/login/recovery/' + hash;
    let html = 'Here\'s your reset link: <a href="'+ link +'">' + link + "</a>";

    this._dispatch(email, "[ColorBucket] Reset your password 🔑", html)
  }
}

module.exports = MailBusiness;