"use strict";

let path = require("path");
let express = require("express");
let ECT = require("ect");
let lessMiddleware = require("less-middleware");
let HomepageRouter = require("./routes/HomepageRouter");

let app = express();

//Setup templates
let ectRenderer = ECT({
    watch: true,
    root: path.join(__dirname, "templates"),
    ext: ".ect"
});
app.set("view engine", "ect");
app.set("views", path.join(__dirname, "templates"));
app.engine("ect", ectRenderer.render);

//Setup middleware
app.use("/css", lessMiddleware(path.join(__dirname, "styles"), {
    dest: path.join(__dirname, "public/css")
}));
app.use(express.static(path.join(__dirname, "public")));

//Setup routes
HomepageRouter.init(app);

//Start server
app.listen(3000, function() {
    console.log("stefanschuster.at listening on port 3000");
});
