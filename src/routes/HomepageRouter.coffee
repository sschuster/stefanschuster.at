{extend} = require("lodash")
locale = require("locale")
supportedLocales = new locale.Locales(["en", "de"])

exports.init = (app) ->
    app.get("/", langRedirect)
    app.get(/^\/(en|de)$/, langMiddleware, index)
    app.get(/^\/(en|de)\/about$/, langMiddleware, about)
    app.get(/^\/(en|de)\/services$/, langMiddleware, services)
    app.get(/^\/(en|de)\/imprint$/, langMiddleware, imprint)

langMiddleware = (req, res, next) ->
    req.lang = "en"
    if req.path.indexOf("/de") == 0
        req.lang = "de"

    next()

langRedirect = (req, res, next) ->
    locales = new locale.Locales(req.headers["accept-language"])
    match = locales.best(supportedLocales)
    lang = if match.language == "de" then "de" else "en"
    res.redirect("/#{lang}")

render = (req, res, template, options = {}) ->
    context = extend({
        langActive: req.lang,
        langPath: req.path.substr(3)
    }, options)

    res.render("#{req.lang}/#{template}", context)

index = (req, res, next) ->
    render(req, res, "index")

about = (req, res, next) ->
    render(req, res, "about")

services = (req, res, next) ->
    render(req, res, "services")

imprint = (req, res, next) ->
    render(req, res, "imprint")
