const jwt=require('jsonwebtoken');

const auth=(req, res, next)=>{
    const authHeader = req.header('Authorization');
  console.log('Auth Header:', authHeader);
  const token = authHeader.split(' ')[1];
  console.log('Token:', token);
    if(!token) return res.status(401).json({message:'Auth error'});



    try{
        const decoded=jwt.verify(token,'secret');
        console.log('decoded token  :',decoded)
        req.user=decoded;
        next();
        }
        catch (tokenError) {
            console.error('Error verifying token:', tokenError);
            if (tokenError instanceof jwt.JsonWebTokenError) {
              return res.status(401).json({ message: 'Invalid token' });
            } else if (tokenError instanceof jwt.TokenExpiredError) {
              return res.status(401).json({ message: 'Token has expired' });
            } else {
              console.error(tokenError);
              return res.status(500).json({ message: 'Internal Server Error' });
            }
          }
        };
        
        module.exports.auth = auth;