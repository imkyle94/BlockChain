const axios = require("axios");
const express = require("express");

const Users = require("../models/users.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "../build/index.html"));
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/userSession", async (req, res) => {
    try {
        const user = await Users.findOne({
            where: { email: req.query.ID },
        });
        const api = await Apis.findAll({ where: { email: req.query.ID } });
        const result = { user, api };
        res.json(result);
    } catch {
        console.log("세션 에러");
    }
});

module.exports = router;
