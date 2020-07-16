export function request(params){
    // console.log('params',params)
     return new Promise(function (resolve, reject) {
    uni.request({
        url: 'https://alpha.yunhutech.cn/comm_route', 
        method:'POST',
        data: JSON.stringify(params),
        // header: {
        //     'custom-header': 'hello' //自定义请求头信息
        // },
        success: (res) => {
            // console.log(res.data);
             resolve(res.data)
        },
        fail:(err) =>{
            reject(err)
        }
    });
      })
}