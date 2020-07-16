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
					}
	                },
			  onLoad(option) {},
			  
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
			   }
	        }
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
</style>
