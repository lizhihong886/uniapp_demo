/*
*   传入objName,以及缩放百分比，返回相对应的oss路径,
* */
export const ossHost = 'https://yunhu-alpha-ad-oss.oss-cn-shenzhen.aliyuncs.com';

export function getOssUrl(objName, percent) {
    //  三级域名路径示例
    // https://<yourBucketName>.<yourEndpoint>/<yourObjectName>?x-oss-process=image/<yourAction>,<yourParamValue>
    //  p设置为100，表示不做缩放，拿到的是原图
    //  0为拿gif用
    if (percent === 0) {
        return ossHost + '/' + objName
    }
    return ossHost + '/' + objName + '?x-oss-process=image/resize,p_' + percent
}
