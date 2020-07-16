<template>
	<view class="container">
		<view class="listTitle">
			uniapp测试项目
		</view>
		<scroll-view @scrolltolower='listToBottom' class="listBox" scroll-y='true'>
			<view  v-for='(item,ind) in dataList' @click="toDetail(item.iGoodsId)" :key="item.iGoodsId" class="listItem">
				<view class="imgBox">
					<image class='imgContent' :src="item.imgList[0]" alt="测试图片">
				</view>
				<view class="rightContainer">
					<view>{{item.sTitle}}</view>
					<view style="margin-top: 10px;">
						<text>价格：</text>
						<text style="color: #C21F39;">￥{{item.iSalePrice}}</text>
						</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
    import {request} from '../../service/request.js'
     import {getOssUrl} from '../../utils/oss.js'
	export default {
		data() {
			return {
				dataList:[],
                iPageIndex:1,
                iPageSize:10,
			}
		},
        //   生命周期处理
        
		methods: {
			listToBottom: function(event){
				console.log('列表触底')
                this.iPageIndex++
                this.getData()
			},
            getData: async function(){
                const params = {
                "svr_name": "AD.AdGoodsMngSvr",
                "method_name": "GetGoodsListH5",
                "req_body": {
                    iPageIndex: this.iPageIndex,
                    iPageSize: this.iPageSize,
                    iCompanyId:2
                }
            }
                const resq =  await request(params)
                console.log('resq',resq)
     
                resq.resp_body.listGoodsInfo.forEach((item)=>{
                    let imgList = []
                    item.listObjectName.forEach((item1)=>{
                        let url = getOssUrl(item1,50)
                        imgList.push(url)
                    })
                    item.imgList = imgList
                })
            
            
                this.dataList = [...this.dataList,...resq.resp_body.listGoodsInfo]
            },
            toDetail: function(id){
                console.log('点击跳转',id)
                uni.navigateTo({
                    url: `/pages/detail/detail?id=${id}`
                });
            }
		},
           mounted() {
                    // 调用请求数据的方法
                    this.getData()
                }
        
	}
</script>

<style scoped lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		.listTitle{
			position: fixed;
			top:0;
            left:0;
			height: 4vh;
			z-index: 1000;
			background: #FFFFFF;
			background: #efefef;
			width: 100vw;
		}
		.listBox{
			height: 96vh;
            margin-top: 10px;
			.listItem{
                 white-space: nowrap; 
				margin-top: 6px;
				border-bottom: 1px solid #eee;
			.imgBox{
				width: 100px;
				height: 100px;
				display: inline-block;
				.imgContent{
					height: 100%;
					width: 100%;
					object-fit: cover;
					border-radius: 6px;
					display: inline-block;
					margin: 0;
					padding:0;
				}
                img{
                    object-fit: cover;
                }
			}
			.rightContainer{
                 white-space: normal; 
				display: inline-block;
				vertical-align: top;
				margin-left: 10px;
			}	
			}
		}
	}
</style>
