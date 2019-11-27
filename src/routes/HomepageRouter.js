const _ = require("lodash");
const locale = require("locale");

const supportedLocales = new locale.Locales(["en", "de"]);

exports.init = function(app) {
    app.get("/", localeRedirect);
    app.use(localeMiddleware);
    app.get(/^\/(en|de)$/, (req, res, next) => render(req, res, "index"));
    app.get(/^\/(en|de)\/skills/, (req, res, next) => render(req, res, "skills"));
    app.get(/^\/(en|de)\/references$/, (req, res, next) => render(req, res, "references"));
    app.get(/^\/(en|de)\/about$/, (req, res, next) => render(req, res, "about"));
    app.get(/^\/(en|de)\/imprint$/, (req, res, next) => render(req, res, "imprint"));
    app.use((req, res, next) => render(req, res, "notfound"));
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
        langPath: req.path.substr(3),
        year: new Date().getFullYear()
    }, options);

    res.render(`${req.lang}/${template}`, context);
}
