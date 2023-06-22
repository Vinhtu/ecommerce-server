var account = require("../models/accountModel");
var md5 = require("md5");
const { reset } = require("nodemon");
const jwt = require('jsonwebtoken')
const session = require('express-session');
'use strict';
var sessionstorage = require('sessionstorage');


var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

const TOKEN_SECRET = "dafasdfasdf"

function getAccounts(res, start, end) {
    account.find(function(err, results) {
        if (err) {
            res.status(500).json(err);
        } else {
            var resultPage = results.slice(start, end);
            res.json({
                data: {
                    resultPage
                },
                meta: {
                    totalPage: account.length / 6
                }
            });
        }
    });
}

module.exports = function(app) {
    app.get("/create-account", function(req, res) {
        var accountExamples = [{
                fullname: "Truong ngoc vinh tu",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },
            {
                fullname: "Truong ngoc vinh tu",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },
            {
                fullname: "Truong ngoc vinh tu",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },
            {
                fullname: "Truong ngoc vinh tu",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },
            {
                fullname: "Truong ngoc vinh tu",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },
            {
                fullname: "Truong ngoc vinh tu",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },
            {
                fullname: "Truong ngoc vinh tu",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },
            {
                fullname: "Truong ngoc vinh tu",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },
            {
                fullname: "Truong ngoc vinh tu",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },
            {
                fullname: "Truong ngoc vinh tu",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },
            {
                fullname: "Truong ngoc vinh tan",
                username: "vinhtu125@gmail.com",
                password: "123456",
            },

        ];
        account.create(accountExamples, function(err, results) {
            res.send(results);
        });
    });

    //login

    app.post("/login", function(req, res) {
        let dataPost = {
            username: req.body.username,
            password: md5(req.body.password),
        };
        if (dataPost) {
            account.find({ username: dataPost.username, password: dataPost.password }, function(err, result) {
                if (err) {
                    throw err;
                } else {
             
                    sessionstorage.setItem('currentUser', {
                        _id: JSON.stringify(result[0]._id),
                        username: result[0].username,
                        password: result[0].password,
                    });
                  
                  

                    // console.log(sessionstorage.getItem('currentUser'), "user");

                    // const token = jwt.sign({ dataPostf }, TOKEN_SECRET)
                    // console.log(sessData.users, 'session data')
                    // res.header('auth-token', token).send(token)
                    return res.json("Login Success !");
                    // res.json(result);
                }
            });
        } else {
            res.status(500).json("error");
        }

    });
    app.post("/logout", function(req, res) {
       const currentUser =  sessionstorage.getItem('currentUser');
       if(currentUser){
        // console.log(currentUser, 'user')
        // sessionStorage.clear();
        return res.json("Logout Success !");
       
        // // console.log(sessionstorage.getItem('currentUser'), "user");

        // if (!currentUser) {
        //     return res.json("Logout Success !");
                
        // } else {
        //     res.status(500).json("error");
        // }
       }
       else{
        res.status(500).json("Không tồn tại currentuser");
       }
     

    });
    app.get("/accounts/page/:currentPage", function(req, res) {
        // let page = parseInt(req.params.currentPage);
        // var perPage = 6;
        // var start = (page - 1) * perPage;
        // var end = page * perPage;
        // var resData = res.slice(start, end);
        // console.log(resData);
        // getAccounts(res, start, end);

        account.find(function(err, results) {
            if (err) {
                res.status(500).json(err);
            } else {
                var resultPage = results.slice(start, end);
                res.json({
                    data: {
                        resultPage
                    },
                    meta: {
                        totalPage: account.length / 6
                    }
                });
            }
        });
    });
    app.post("/register", function(req, res) {
        let dataAccount = {
            fullname: req.body.fullname,
            username: req.body.username,
            password: md5(req.body.password),
        };
        if (dataAccount.username.length > 0 && dataAccount.password.length > 0) {
            account.create(dataAccount, function(err, results) {
                res.send(results);
            });
        } else {
            return res.status(500).json(err);
        }
    });

    app.post("/", function(req, res) {
        res.cookie("account", 12345);
    });
};