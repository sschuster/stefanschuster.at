"use strict";

let _ = require("lodash");
let locale = require("locale");

let supportedLocales = new locale.Locales(["en", "de"]);

exports.init = function(app) {
    app.get("/", localeRedirect);
    app.get(/^\/(en|de)$/, localeMiddleware, (req, res, next) => render(req, res, "index"));
    app.get(/^\/(en|de)\/about$/, localeMiddleware, (req, res, next) => render(req, res, "about"));
    app.get(/^\/(en|de)\/services$/, localeMiddleware, (req, res, next) => render(req, res, "services"));
    app.get(/^\/(en|de)\/competencies$/, localeMiddleware, (req, res, next) => render(req, res, "competencies"));
    app.get(/^\/(en|de)\/imprint$/, localeMiddleware, (req, res, next) => render(req, res, "imprint"));
};

function localeRedirect(req, res, next) {
    let locales = new locale.Locales(req.headers["accept-language"]);
    let match = locales.best(supportedLocales);
    let lang = match.language == "de" ? "de" : "en";
    res.redirect(`/${lang}`);
}

function localeMiddleware(req, res, next) {
    req.lang = req.path.startsWith("/de") ? "de" : "en";
    next();
}

function render(req, res, template, options) {
    let context = _.extend({
        langActive: req.lang,
        langPath: req.path.substr(3)
    }, options);

    res.render(`${req.lang}/${template}`, context);
}
