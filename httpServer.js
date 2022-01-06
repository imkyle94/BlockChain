const express = require("express");
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

const dotenv = require("dotenv");
dotenv.config();

const { sequelize } = require("./models/index.js");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const passport = require('passport');
const passportConfig = require('./passport');

// 라우터 선언
const indexRouter = require("./routers/index.js");
const authRouter = require("./routers/auth");

// 블록체인 관련
const { getBlocks, nextBlock, getVersion } = require("./chainedBlock.js");
const { addBlock } = require("./checkValidBlock");
const { connectToPeers, getSockets } = require("./p2pServer.js");
const { getPublicKeyFromWallet, initWallet } = require("./encryption");

const http_port = process.env.HTTP_PORT || 3001;

// DB와 연결
sequelize
    // sync : MySQL에 테이블이 존재 하지 않을때 생성
    //      force: true   => 이미 테이블이 있으면 drop하고 다시 테이블 생성
    .sync({ force: false })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error(err);
    });

function initHttpServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser(process.env.COOKIE_SECRET));

	app.use(expressCspHeader({
    directives: {
        'script-src': [SELF, INLINE, "https://cdnjs.cloudflare.com", "https://unpkg.com"],
    }
}));
   
    // req.session 객체 생성
    app.use(
        session({
            resave: false,
            saveUninitialized: false,
            secret: process.env.COOKIE_SECRET,
            cookie: {
                httpOnly: true,
                secure: false,
            },
        })
    );

    // passport setting
    passportConfig();
    // passport 설정 선언(req에 passport 설정 삽입) 위 use.session이라고 보면 댐
    app.use(passport.initialize());
    // req.session 에 passport 정보 저장 (req.session.num = 1 이런거라고 보면 댐)
    app.use(passport.session());

    // URL과 라우터 매칭
    app.use("/", indexRouter);
    app.use("/auth", authRouter);

    //추가
    app.post("/addPeers", (req, res) => {
        const data = req.body.data || [];
        console.log(data);
        connectToPeers(data);
        res.send(data);
    });
    app.get("/peers", (req, res) => {
        let sockInfo = [];

        getSockets().forEach((s) => {
            sockInfo.push(s._socket.remoteAddress + ":" + s._socket.remotePort);
        });
        res.send(sockInfo);
    });

    app.get("/blocks", (req, res) => {
        res.send(getBlocks());
    });
    app.get("/version", (req, res) => {
        res.send(getVersion());
    });

    app.post("/mineBlock", (req, res) => {
        const data = req.body.data || [];
        console.log(data);
        const block = nextBlock(data);
        addBlock(block);
        // res.send(block)
        res.send(getBlocks());
    });

    app.post("/stop", (req, res) => {
        res.send({ msg: "Stop Server!" });
        process.exit();
    });
    app.get("/address", (req, res) => {
        initWallet();
        const address = getPublicKeyFromWallet().toString();
        console.log(getPublicKeyFromWallet());
        if (address != "") {
            res.send({ address: address });
        } else {
            res.send("empty address!");
        }
    });

    // ERROR 메세지 창
    app.use((err, req, res, next) => {
        res.status(err.static || 500);
        res.send(err);
    });

    app.listen(http_port, () => {
        console.log("Listening Http Port : " + http_port);
    });
}

initHttpServer();
