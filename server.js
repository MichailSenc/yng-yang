const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static("./dist/"));
app.use(
    express.urlencoded({
        extended: true,
    })
);

const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./dist/", "index.html"));
});

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}...`);
});
