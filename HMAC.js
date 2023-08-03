import { randomBytes, createHmac } from "crypto";
export { KeyGenerator, HMACCalculator };

class KeyGenerator {
    static generateKey() {
        return randomBytes(32).toString("hex"); // 256 bits key (32 bytes)
    }
}

class HMACCalculator {
    static calculateHMAC(key, data) {
        const hmac = createHmac("sha256", key);
        hmac.update(data);
        return hmac.digest("hex");
    }
}
