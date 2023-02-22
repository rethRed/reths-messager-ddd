import bcrypt from "bcrypt";

interface EncrypterInterface {
    encrypt(value: string): Promise<string>;
    compare(value: string, hashedValue: string): Promise<boolean>;
} 

export class EncrypterFactory {
    static create(): EncrypterInterface {
        return new BcryptEncrypter()
    }
} 

class BcryptEncrypter implements EncrypterInterface {
    async encrypt(value: string): Promise<string> {
        return await bcrypt.hash(value, 10)
    }

    async compare(value: string, hashedValue: string): Promise<boolean> {
        return await bcrypt.compare(value, hashedValue)
    }
}