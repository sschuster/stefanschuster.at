const path = require("path");
const express = require("express");
const nunjucks = require("nunjucks");
const lessMiddleware = require("less-middleware");
const LessPluginAutoPrefix = require("less-plugin-autoprefix");
const LessPluginCleanCSS = require("less-plugin-clean-css");
const HomepageRouter = require("./routes/HomepageRouter");

const app = express();

//Setup templates
app.set("view engine", "njk");
nunjucks.configure(path.join(__dirname, "templates"), {
    express: app
});

//Setup middleware
app.use("/css", lessMiddleware(path.join(__dirname, "styles"), {
    dest: path.join(__dirname, "public/css"),
    render: {
        plugins: [
            new LessPluginAutoPrefix({
                browsers: ["> 1%", "last 2 versions", "ie 9"]
            }),
            new LessPluginCleanCSS()
        ]
    }
}));
app.use(express.static(path.join(__dirname, "public")));

//Setup routes
HomepageRouter.init(app);

//Start server
app.listen(3000, function() {
    console.log("stefanschuster.at listening on port 3000");
});
