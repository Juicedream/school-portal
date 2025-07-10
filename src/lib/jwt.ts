const jwt = require("jsonwebtoken") as any;

const secret: string = process.env.JWT_SECRET || "defaultsecret";

export function signToken(
  payload: object,
  expiresIn: string | number = "1h"
): string {
  const options = {
    expiresIn: expiresIn,
  };
  return jwt.sign(payload, secret, options);
}


export function verifyToken(
    token: string
){
    try{
        return jwt.verify(token, secret);
    }catch(err){
        return null;
    }
}