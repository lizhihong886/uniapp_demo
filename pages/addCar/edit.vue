<template>
	  <view class="content">
	         <view class="row b-b">
	             <text class="tit">商品名称</text>
	             <input class="input" type="text" v-model="addressData.name" placeholder="品牌+型号+年份+版本" placeholder-class="placeholder" />
	         </view>
			 <view class="row b-b">
			     <text class="tit">售价</text>
			     <input class="input" type="text" v-model="addressData.name" placeholder="请输入商品价格" placeholder-class="placeholder" />
			 </view>
	         <view class="row b-b">
	             <text class="tit">底价</text>
	             <input class="input" type="text" v-model="addressData.rank" placeholder="车商交易价格" placeholder-class="placeholder" />
	         </view>
	         <view class="row b-b">
	             <text class="tit">新车含税价</text>
	             <input class="input" type="number" v-model="addressData.mobile" placeholder="新车含税价" placeholder-class="placeholder" />
	         </view>
			 <view class="uploads">
				 <view class="row b-b">
				     <text class="tit">车辆图片</text>
				 </view>
				<!-- 图片上传 -->
				<view class='upload-image-view'>
					<!-- 标题已经省略 -->
					<!-- <view class='title'>上传xxxx图片</view> -->
					<block v-for="(image,index) in imageList" :key="index">
						<view class='image-view'>
							<image :src="image" :data-src="image" @tap="previewImage"></image>
							<view class='del-btn' :data-index="index" @tap='deleteImage'>
								<view class='baicha'></view>
							</view>
						</view>
					</block>
					<view class='add-view' v-if="imageList.length < imageLength" @tap="chooseImage">
		  
						<!-- 相机 -->
						<!-- <view class="xiangji">
									<view class="tixing"></view>
									<view class='changfx'>
										<view class='yuan1'>
											<view class='yuan2'></view>
										</view>
									</view>
								</view> -->
		  
						<!-- 十字架 -->
						<view class="cross">
							<view class="transverse-line"></view>
							<view class="vertical-line"></view>
						</view>
		  
					</view>
					<view class='info'>上传图片，不超过{{imageLength}}张。(非必填)</view>
				</view>
				<!-- 图片上传 -->
				</view>
			 
	         <view class="row b-b">
	             <text class="tit">变速箱</text>
	             <input class="input" type="text" v-model="addressData.room" placeholder="变速箱" placeholder-class="placeholder" />
	         </view>
			 <view class="row b-b">
			     <text class="tit">车辆颜色</text>
			     <input class="input" type="text" v-model="addressData.room" placeholder="变速箱" placeholder-class="placeholder" />
			 </view>
			 <view class="row b-b">
			     <text class="tit">上牌地</text>
			     <input class="input" type="text" v-model="addressData.room" placeholder="上牌地" placeholder-class="placeholder" />
			 </view>
			 <view class="row b-b">
			     <text class="tit">上牌时间</text>
				 <picker class="pickDate" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				                         <view class="pickDate">{{date}}</view>
							
				</picker>
			 </view>
	 
	         <button class="add-btn" @click="confirm">提交</button>
	     </view>
	
</template>

<script>
	  import {uniCard, uniPagination} from '@dcloudio/uni-ui'
	  const OSS = require('ali-oss');
	  var sourceType = [
	  		['camera'], //拍照
	  		['album'], //相册
	  		['camera', 'album'] //拍照或相册
	  	]
	  	var sizeType = [
	  		['compressed'], //压缩
	  		['original'], //原图
	  		['compressed', 'original'] //压缩或原图
	  	]
	  export default {
		  
	          data() {
				const currentDate = this.getDate({
				             format: true
				         })
				return {
						addressData: {
							name: '',
							mobile: '',
							rank: '',
							room: '',
						},
						date: currentDate,
						imageList: [], //保存图片路径集合
						imageLength: 3, //限制图片张数
						sourceTypeIndex: 2, //添加方式限制
						sizeTypeIndex: 0, //图片尺寸限制
						}
	                },
			  onLoad(option) {},
		      onUnload() {},
			  computed: {
			          startDate() {
			              return this.getDate('start');
			          },
			          endDate() {
			              return this.getDate('end');
			          }
			      },
	          methods: {
	            confirm() {
					   let data = this.addressData;
					   console.log(JSON.stringify(data))
	                   },
			     bindPickerChange: function(e) {
			               console.log('picker发送选择改变，携带值为', e.target.value)
			               this.index = e.target.value
			           },
			    bindDateChange: function(e) {
			               this.date = e.target.value
			           },
				getDate(type) {
				   const date = new Date();
				   let year = date.getFullYear();
				   let month = date.getMonth() + 1;
				   let day = date.getDate();
	   
				   if (type === 'start') {
					   year = year - 60;
				   } else if (type === 'end') {
					   year = year + 2;
				   }
				   month = month > 9 ? month : '0' + month;;
				   day = day > 9 ? day : '0' + day;
				   return `${year}-${month}-${day}`;
			   },
	           //选择图片
				chooseImage: async function() {
						uni.chooseImage({
							sourceType: sourceType[this.sourceTypeIndex],
							// #ifdef MP-WEIXIN
							sizeType: sizeType[this.sizeTypeIndex],
							// #endif
							count: this.imageLength - this.imageList.length,
							success: (res) => {
								this.imageList = this.imageList.concat(res.tempFilePaths);
							}
						})
					},
					//预览图片
				previewImage: function(e) {
						var current = e.target.dataset.src
						uni.previewImage({
							current: current,
							urls: this.imageList
						})
					},
					//删除图片
				deleteImage: function(e) {
						var index = e.target.dataset.index;
						var that = this;
						var images = that.imageList;
						images.splice(index, 1);
						that.imageList = images;
					}
				
			}
	    }
	  function h5_url_to_blob(url){
	  				    return new Promise((resolve,reject)=>{
	  				        var xhr = new XMLHttpRequest();
	  				        xhr.open( 'GET', url, true);
	  				        xhr.responseType = 'blob';
	  				        xhr.onload = function( e) {
	  				            if(this.status == 200) {
	  				                var Blob = this.response;
	  				                // console.log(myBlob)
	  				                resolve(Blob)
	  				                // myBlob现在是对象URL指向的blob。 
	  				            }
	  				        };
	  				        xhr.send();
	  				    })
	  				}
	 async function uploadOSS (){
	  				  let client = new OSS({
	  				      accessKeyId: sign.AccessKeyId, // 后台的临时签名ID
	  				      accessKeySecret: sign.AccessKeySecret, // 后台的临时签名密钥
	  				      stsToken: sign.SecurityToken,
	  				      endpoint: 'xxxxbeijing.aliyuncs.com/', // 上传后的域名
	  				      bucket: 'xxx', // OSS仓库名
	  				  });
	  				  let curTime = new Date();
	  				  let year = curTime.getFullYear(),
	  				      month = curTime.getMonth() + 1,
	  				      day = curTime.getDate()
	  				  let dir = 'imgs/' + year + '/' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + '/'
	  				  let result = await client.put(dir +'文件名', '通过第五步转换的blob对象');
	  }	
</script>

<style scoped lang="scss">
	 page {
	        padding-top: 16upx;
	    }
    .row {
	   display: flex;
	   align-items: center;
	   position: relative;
	   padding: 0 30upx;
	   height: 120upx;
	   background: #fff;
	   .tit {
		   flex-shrink: 0;
		   width: 180upx;
		   font-size: 30upx;
		}
	   .input {
		   flex: 1;
		   font-size: 30upx;

	   }
	   .pickDate{
		   flex: 1;
		   font-size: 30upx;
	   }
	   .icon-shouhuodizhi {
		   font-size: 36upx;
	   }
   }
   .add-btn {
	   display: flex;
	   align-items: center;
	   justify-content: center;
	   width: 690upx;
	   height: 80upx;
	   margin: 60upx auto;
	   background-color: rgb(28, 42, 134);
	   color: #fff;
	   border-radius: 10upx;
	   box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
   }
		   
  .upload-image-view {
  	width: 100%;
  	margin: 20upx 40upx;
  	display: flex;
  	flex-wrap: wrap;
  	align-items: center;
  }
   
  .upload-image-view .title {
  	width: 100%;
  	font-family: PingFang-SC-Regular;
  	font-size: 24upx;
  	color: #4a4a4a;
  	margin-bottom: 15upx;
  	line-height: 100%;
  }
   
  .upload-image-view .info {
  	width: 100%;
  	font-family: PingFang-SC-Regular;
  	font-size: 24upx;
  	color: #ff4259;
  	height: 24upx;
  	margin-top: 15upx;
  	line-height: 24upx;
  }
   
  .upload-image-view .image-view {
  	height: 130upx;
  	width: 130upx;
  	position: relative;
  	margin: 15upx 15upx 15upx 0upx;
  	border-radius: 8upx;
  }
   
  .upload-image-view .image-view image {
  	height: 100%;
  	width: 100%;
  	border-radius: 8upx;
  }
   
  .upload-image-view .image-view .del-btn {
  	background-color: #f67371;
  	border-radius: 50%;
  	width: 25upx;
  	height: 25upx;
  	position: absolute;
  	top: -12upx;
  	right: -12upx;
  	z-index: 2;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  }
   
  .upload-image-view .image-view .del-btn .baicha {
  	display: inline-block;
  	width: 20upx;
  	height: 5upx;
  	background: #fff;
  	line-height: 0;
  	font-size: 0;
  	vertical-align: middle;
  	-webkit-transform: rotate(45deg);
  }
   
  .upload-image-view .image-view .del-btn .baicha:after {
  	content: '/';
  	display: block;
  	width: 20upx;
  	height: 5upx;
  	background: #fff;
  	-webkit-transform: rotate(-90deg);
  }
   
  .upload-image-view .add-view {
  	height: 115upx;
  	width: 115upx;
  	margin: 15upx 15upx 15upx 0upx;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	background: rgba(255, 255, 255, 0.00);
  	border: 3upx dashed #979797;
  	border-radius: 8upx;
  }
   
  /* 相机 */
   
  .upload-image-view .add-view .xiangji {
  	height: 40upx;
  	width: 48upx;
  	display: flex;
  	justify-content: center;
  	flex-wrap: wrap;
  }
   
  .upload-image-view .add-view .xiangji .tixing {
  	width: 10upx;
  	height: 7upx;
  	background-color: #fff;
  	border-right: 10upx solid #fff;
  	border-bottom: 7upx solid #b2b2b2;
  	border-left: 10upx solid #fff;
  }
   
  .upload-image-view .add-view .xiangji .changfx {
  	height: 32upx;
  	width: 48upx;
  	border-radius: 5%;
  	background-color: #b2b2b2;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  }
   
  .upload-image-view .add-view .xiangji .changfx .yuan1 {
  	height: 20upx;
  	width: 20upx;
  	border-radius: 50%;
  	background-color: #fff;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  }
   
  .upload-image-view .add-view .xiangji .changfx .yuan2 {
  	height: 10upx;
  	width: 10upx;
  	border-radius: 50%;
  	background-color: #b2b2b2;
  }
   
  /* 第二套图片上传样式（内部图标 十字架）*/
   
  /* 十字架 */
  .upload-image-view .add-view .cross {
  	height: 48upx;
  	width: 48upx;
  	display: flex;
  	flex-wrap: wrap;
  	position: relative;
  }
   
  .upload-image-view .add-view .cross .transverse-line {
  	height: 100%;
  	width: 48%;
  	position: absolute;
  	border-right: 3upx solid #5A5A5A;
  	top: 0;
  	left: 0;
  }
   
  .upload-image-view .add-view .cross .vertical-line {
  	height: 48%;
  	width: 100%;
  	position: absolute;
  	border-bottom: 3upx solid #5A5A5A;
  	top: 0;
  	left: 0;
  }

</style>
