/*
* 调用时将this传进来，通过this对象拿到this.props
* */
import {request} from "../../service/request.js";

export default async function getSts() {
    // 返回promise ，外部通过回调函数获得返回的结果
    //  发送请求向sts服务获取鉴权验证
    const payload = {
        "svr_name": "AdConfSvr",
        "method_name": "GetStsToken",
        "req_body": {
            iUid: 0,
            iDeviceId: 0
        }
    }
    const dataResp = await request(payload)
    try {
        if (dataResp.hasOwnProperty('resp_code') && dataResp.resp_code === 0) {
            const respBody = dataResp.resp_body
            if (respBody.eRetCode === 0) {
                let result = JSON.parse(respBody.sStsToken)
                return result
            }
        }
    } catch (e) {
        console.log("e", e)
    }
}
