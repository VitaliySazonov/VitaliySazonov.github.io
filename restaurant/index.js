const express = require("express");
const app = express();
const server = app.listen(3000);
const io = require("socket.io").listen(server);
const bodyParser = require("body-parser");
const mysql = require('mysql');
const html = bodyParser.urlencoded({
    extended: false
});
// const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pass: '',
    database: 'restik'
});

connection.connect(function (err) {
    console.log('connection to [restik] ...');
});

app.use(express.static(__dirname + '/public'));
// server.listen(port);
app.post('/registr', html, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    res.send(`${res.body.login} - ${res.body.pass}`);
});

// const post = {
//     name: 'post',
//     pass: '2222'
// };
// const query = connection.query('insert into users set ?', post, function (res, req) {
//     console.log(res);
// });
// const select = connection.query('select * from users', function(err, res) {
//     for (let i = 0; i < res.length; i++) {
//         console.log(res[i].name);
//     }
//     console.log(res); 
// });
// console.log(query.sql);








io.on("connection", function (socket) {
    let good, member;
    let id = socket.id;
    socket.on('good', function (newName, newResult, newImg, newSostav, newVyhod, newTime, newCost) {
        good = {
            name: newName,
            category: newResult,
            img: newImg,
            price: newCost,
            dose: newVyhod,
            desc: newSostav,
            time: newTime,
        };
        const select = connection.query('select * from goods', function (err, res) {
            for (let i = 0; i < res.length; i++) {
                if (res[i].name == good.name) {
                    socket.emit('repeatGood', true);
                    return false;
                }
            }
            const query = connection.query('insert into goods set ?', good, function (res, req) {
                console.log(res);
            });
            console.log(query.sql);
            socket.emit('closeGood', good.name, good.category, good.img, good.price, good.dose, good.desc, good.time);
        });
        // socket.broadcast.emit('addUser', nick, id);
    });
    socket.on('member', function (memberName, memberPos, memberTel, memberAdress, memberPassport, memberIcod, memberViber, memberTelegram, memberData) {
        member = {
            name: memberName,
            pos: memberPos,
            tel: memberTel,
            adres: memberAdress,
            pasport: memberPassport,
            icod: memberIcod,
            viber: memberViber,
            telegram: memberTelegram,
            data: memberData
        };
        console.log(member.name, member.pos, member.tel, member.adres, member.pasport, member.icod, member.viber, member.telegram, member.data);
        const select = connection.query('select * from members', function (err, res) {
            // for (let i = 0; i < res.length; i++) {
            //     // if (res[i].name == good.name) {
            //     //     socket.emit('repeatGood', true);
            //     //     return false;
            //     // }
            //     // console.log(res[i]);
            // }
            const query = connection.query('insert into members set ?', member, function (res, req) {
                // console.log(res);
            });
            // console.log(query.sql);
            socket.emit('addMember', member.name, member.pos, member.tel, member.adres, member.pasport, member.icod, member.viber, member.telegram, member.data);
        });
        // socket.broadcast.emit('addUser', nick, id);
    });
    socket.on('off', function (newId) {
        let id = newId;
        connection.query('DELETE FROM members WHERE id = ?', id, function (err, req) {
              if (err) throw err;
              console.log('Deleted member');
            });
    })
    const sel = connection.query('select * from members', function (err, res) {
        // for (let i = 0; i < res.length; i++) {
        //     let info = '';
        //     info += res[i];
        //     // if (res[i].name == good.name) {
        //     //     socket.emit('repeatGood', true);
        //     //     return false;
        //     // }
        // }
        socket.emit('memberList', res);
        // console.log(res);
    });


    // socket.emit("myNameId", id);
    // socket.on("newMsg", function (text) {
    //     io.sockets.emit("msg", text);
    //     socket.broadcast.emit("allUsers", id, text);
    //     socket.emit("iLoveMe", text);
    // })
    // socket.on("privat", function (id, text) {
    //     socket.broadcast.to(id).emit("privats", id, text);
    //     console.log(id, text);
    // });
});