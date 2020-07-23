const CryptoJS = require('crypto-js');
import { Base64 } from 'js-base64';

export const ossHost = 'https://yunhu-alpha-ad-oss.oss-cn-shenzhen.aliyuncs.com';

const  policyText = {
    "expiration": "2030-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
        ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};

export function getOssSecret (accesskey) {
    const policyBase64=  Base64.encode(JSON.stringify(policyText))
    const message = policyBase64
    const bytes = CryptoJS.HmacSHA1(message, accesskey, { asBytes: true }) ;
    const  signature =  CryptoJS.enc.Base64.stringify(bytes);
    return  {"policyBase64":policyBase64,"signature":signature}
}


