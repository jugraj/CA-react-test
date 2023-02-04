const moment = require("moment");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
        origins: [
            "http://localhost:* ",
            "https://9ehj7v-8282.preview.csb.app]",
        ],
    },
});

const PORT = 8282;

http.listen(PORT, function () {
    console.log("server listening on *:8282");
});

function randomDate(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}

const getRandomPrice = () =>
    Math.floor(Math.random() * (1000 - 100) + 100) / 100;
const getRandomDate = () =>
    moment(randomDate(new Date(2012, 0, 1), new Date())).format(
        "MMM Do YYYY, h:mm:ss a"
    );

const createObject = () => {
    const names =
        "John Stone Mia Wong Peter Stanbridge Natalie Lee-Walsh Ang Li Nguta Ithya Tamzyn French Salome Simoes Trevor Virtue Tarryn Campbell-Gillies".split(
            " "
        );
    return {
        id: Math.round(Math.random() * 100),
        name: names[Math.floor(Math.random() * (names.length - 1))].toString(),
        price: getRandomPrice(),
        updated_at: getRandomDate(),
    };
};
const items = Array(10)
    .fill()
    .map((_, i) => createObject(i));

let startInterval = null;

io.on("connection", function (socket) {
    console.log("client connected");

    socket.on("items.create", function () {
        socket.emit("items.create", items);
    });

    socket.on("items.subscribe", () => {
        if (startInterval === null) {
            startInterval = setInterval(function () {
                const newItems = items.map((obj) => ({
                    ...obj,
                    price: getRandomPrice(),
                    updated_at: getRandomDate(),
                }));
                socket.emit("items.subscribe", newItems);
            }, 1000);
        }
    });

    socket.on("items.unsubscribe", () => {
        clearInterval(startInterval);
        startInterval = null;
    });
    socket.on("disconnect", function () {
        console.log("user disconnected");
        clearInterval(startInterval);
        startInterval = null;
    });
});
