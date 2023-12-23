require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const {
        MONGO_DB_HOSTNAME,
        MONGO_DB_PORT,
        MONGO_DB
} = process.env

const url = `mongodb://${MONGO_DB_HOSTNAME}:${MONGO_DB_PORT}/${MONGO_DB}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// console.log(process.env.MONGO_DB_HOSTNAME);
// console.log(process.env.MONGO_DB_PORT);
// console.log(process.env.MONGO_DB);


const userScheme = new Schema({
        name: String,
        pantronomic: String,
        last_name: String,
        age: Number,
        course: Number,
        speciality: String,
        avg: Number,
        city: String
}, { versionKey: false });

const User = mongoose.model("User", userScheme);

app.use(express.static(__dirname + "/public"));

mongoose.connect(url, function (err) {
        if (err) return console.log(err);
        app.listen(3000, function () {
                console.log("Сервер ожидает подключения...");
        });
});

app.get("/api/users", function (req, res) {

        User.find({}, function (err, users) {

                if (err) return console.log(err);
                res.send(users)
        });
});

app.get("/api/users/:id", function (req, res) {

        const id = req.params.id;
        User.findOne({ _id: id }, function (err, user) {

                if (err) return console.log(err);
                res.send(user);
        });
});

app.post("/api/users", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);

        const userName = req.body.name;
        const userPantronomic = req.body.pantronomic;
        const userLastName = req.body.last_name;
        const userAge = req.body.age;
        const userCourse = req.body.course;
        const userSpeciality = req.body.speciality;
        const userAvg = req.body.avg;
        const userCity = req.body.city;
        const user = new User({ name: userName, pantronomic: userPantronomic, last_name: userLastName, age: userAge, course: userCourse, speciality: userSpeciality, avg: userAvg, city: userCity });
        user.save(function (err) {
                if (err) return console.log(err);
                res.send(user);
        });
});

app.delete("/api/users/:id", function (req, res) {

        const id = req.params.id;
        User.findByIdAndDelete(id, function (err, user) {

                if (err) return console.log(err);
                res.send(user);
        });
});

app.put("/api/users", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);
        const userName = req.body.name;
        const userPantronomic = req.body.pantronomic;
        const userLastName = req.body.last_name;
        const userAge = req.body.age;
        const userCourse = req.body.course;
        const userSpeciality = req.body.speciality;
        const userAvg = req.body.avg;
        const userCity = req.body.city;
        const user = new User({ name: userName, pantronomic: userPantronomic, last_name: userLastName, age: userAge, course: userCourse, speciality: userSpeciality, avg: userAvg, city: userCity });
        User.findOneAndUpdate({ _id: id }, newUser, { new: true }, function (err, user) {
                if (err) return console.log(err);
                res.send(user);
        });
});