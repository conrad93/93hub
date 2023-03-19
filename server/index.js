var app = require("./app");
var routes = require("./routes");
var db = require("./config/db");

app.use('/', routes);
db.init();

const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});