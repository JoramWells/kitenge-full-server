const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.name,
      email: user.email,
      role: user.role,
    },
    "secret",
    {
      expiresIn: "10s",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, "secret", (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid oken" });
      }
      req.user = token;
      next();
      return;
    });
  }

  return res.status(401).send({ msg: "Token is not supplied" });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next;
  }
  return res.status(401).send({ msg: "Admin token is not valid" });
};

module.exports = { getToken, isAuth, isAdmin };
