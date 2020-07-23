<template>
    <view class="detail">
        <view class="imgBox">
             <img :src="goodDetail.imgList[0]" alt="">
        </view>
        <view class="infoContainer">
            <view class="title">
               {{goodDetail.sTitle}}
            </view>
            <view class="parice">
               <span>价格：</span>
               <span style='color: #fc0009;font-weight: bold;'>￥{{goodDetail.iSalePrice}}</span>
            </view>
            <view class="deliver"></view>
            <view class='carInfo'>
                <view class="title">车辆档案</view>
                <view class='carInfoDetail'>
                    <view class="carInfoItem" v-for="item in goodDetail.sJsonPart3" :key='item.fieldName'>
                        <view>{{item.title}}</view>
                        <view style="color: #e14a0a;margin-top: 3px;font-size: 14px;">
                            <view v-if="!!item.value">{{item.value}}</view>
                             <view v-else>--</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="deliver"></view>
            <view class="imgList">
                 <view class="title">车辆实拍</view>
                 <view class="imgItem" v-for="item in goodDetail.imgList">
                     <img :src="item" alt="">
                 </view>
            </view>
        </view>
    </view>
</template>

<script>
     import {request} from '../../service/request.js'
      import {getOssUrl} from '../../utils/oss/oss.js'
    export default {
    data() {
    	return {
    		goodDetail:{},
    	}
    },
    methods:{
    
        getDetail: async function(goodId){
            const params = {
                "svr_name": "AD.AdGoodsMngSvr",
                "method_name": "GetGoodsInfoH5",
                "req_body": {
                   iGoodsId:goodId
                }
            }
                const resq =  await request(params)
                console.log('resq',resq)
                let imgList = []
               resq.resp_body.oGoodsInfo.listObjectName.forEach((item)=>{
                   let url = getOssUrl(item,50)
                   imgList.push(url)
               })
               resq.resp_body.oGoodsInfo.imgList = imgList
               resq.resp_body.oGoodsInfo.sJsonPart3 = JSON.parse(resq.resp_body.oGoodsInfo.sJsonPart3)
                this.goodDetail = resq.resp_body.oGoodsInfo
        }
    },
    mounted(){
        
    },
     onLoad(option) { //option为object类型，会序列化上个页面传递的参数
            console.log(option.id); //打印出上个页面传递的参数。
            this.getDetail(JSON.parse(option.id))
        }
    }
</script>

<style scoped lang="scss">
    .detail{
     color: #0f100f;
        .imgBox{
            width: 100vw;
            height: 200px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .infoContainer{
              padding: 20px;
            .title{
                font-size: 20px;
                font-weight: bold;
            }
            .parice{
                margin: 10px 0;
            }
            .deliver{
                position: relative;
                left:-20px;
                height: 2px;
                width: 100vw;
                background: #ededed;
                
            }
            .carInfo{
                padding: 14px 0;
                .title{
                    font-weight: bold;
                    font-size: 18px;
                    margin: 10px 0;
                }
                .carInfoDetail{
                    .carInfoItem{
                        display: inline-block;
                        width: 30%;
                        font-size: 14px;
                        color: #949494;
                    }
                }
                
            }
            .imgList{
                .title{
                    font-weight: bold;
                    font-size: 18px;
                    margin: 10px 0;
                }
                .imgItem{
                    position: relative;
                    left:-20px;
                    width: 100vw;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    
    }
</style>
