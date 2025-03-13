const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }


        const token = authHeader.split(" ")[1];


        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid or expired token.",
                });
            }

           
            req.admin = decoded; 
            next();
        });

    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

module.exports = verifyToken;
