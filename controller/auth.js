"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }
        token = token.split(" ")[1];
        let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.stripeId = user.stripeId;
        req.id = user.id;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
exports.auth = auth;
