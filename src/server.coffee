path = require("path")
express = require("express")
ECT = require("ect")
stylus = require("stylus")
nib = require("nib")
HomepageRouter = require("./routes/HomepageRouter")

DEBUG = true

app = express()

#Setup templates
ectRenderer = ECT({
    watch: true,
    root: path.join(__dirname, "templates"),
    ext: ".ect"
})
app.set("view engine", "ect")
app.set("views", path.join(__dirname, "templates"))
app.engine("ect", ectRenderer.render)

#Setup middleware
app.use("/css", stylus.middleware({
    src: path.join(__dirname, "styles"),
    dest: path.join(__dirname, "public/css"),
    debug: DEBUG,
    compile: (str, path) ->
        return stylus(str)
            .set("filename", path)
            .set("compress", true)
            .use(nib())
            .import("nib")
}))
app.use(express.static(path.join(__dirname, "public")))

#Setup routes
HomepageRouter.init(app)

#Start server
app.listen(3000, ->
    console.log("stefanschuster.at listening on port 3000");
)
