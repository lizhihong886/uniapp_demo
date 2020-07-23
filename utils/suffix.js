
// 传入文件名，返回小写的后缀名
export function getSuffix(name) {
    let index = name.lastIndexOf(".") //得到最后一个"."在第几位
    return name.substring(index + 1).toLowerCase(); //截断"."之前的，得到后缀[忽略大写]
}

export function getImgType(name) {
    let index = name.lastIndexOf("/") //得到最后一个"/"在第几位
    return name.substring(index + 1).toLowerCase(); //截断"/"之前的，得到后缀[忽略大写]
}