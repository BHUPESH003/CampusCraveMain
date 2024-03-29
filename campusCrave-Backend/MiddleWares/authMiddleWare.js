const jwt = require('jsonwebtoken');

  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
      }
      req.user = user;
      
      next();
    });

};

module.exports = authenticateToken;
