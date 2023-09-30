import bcrypt from "bcrypt";

export class Crypt {
  private static SALT_NUMB: number = 10;

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_NUMB);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}