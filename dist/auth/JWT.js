import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { sign, verify } = jwt;
export const createTokens = (User) => {
    const accessToken = sign({ id: User }, process.env.JWT_SECRET);
    return accessToken;
};
export const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken)
        return res.status(400).json({ error: "User not Authenticated!" });
    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET);
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
};
//# sourceMappingURL=JWT.js.map