import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF') //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') //十六位十六进制数作为密钥偏移量

export class AES {
  // 加密
  public static encrypt(str: string) {
    const srcs = CryptoJS.enc.Utf8.parse(str)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.ciphertext.toString().toUpperCase()
  }
  // 解密
  public static decrypt(str: string) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(str)
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypted = CryptoJS.AES.decrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return decrypted.toString(CryptoJS.enc.Utf8).toString()
  }
}