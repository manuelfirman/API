import jwt from "jsonwebtoken";

export class JWTHandler {
  private SECRET = process.env.SECRET_KEY || "secret1212";

  constructor(){}

  tokenSign(userId: string, role: string, username: string): string {
    const token = jwt.sign(
      {
        userId,
        role, 
        username 
      }, 
      this.SECRET, 
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    return token;
  }

  verifyToken = async (tokenJwt: string): Promise<string | jwt.JwtPayload | null> => {
    try {
      return jwt.verify(tokenJwt, this.SECRET);
    } catch (e) {
      return null;
    }
  };

}
