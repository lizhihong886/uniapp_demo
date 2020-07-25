<template>
    <view class="content">
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
            <text class="tit">智能贴牌</text>
            <view class="uni-list-cell uni-list-cell-pd">
                <switch :checked="bSmartOem"   @change="switchChange" />
            </view>

        </view>
        <view class="row b-b">
            <text class="tit">商品名称</text>
            <input class="input" type="text" v-model="formData.sTitle" placeholder="品牌+型号+年份+版本" placeholder-class="placeholder" />
        </view>
        <view class="row b-b">
            <text class="tit">售价</text>
            <input class="input" type="digit" v-model="formData.iSalePrice" placeholder="请输入商品价格" placeholder-class="placeholder" />
            <view class='unit'>( 万元 )</view>
        </view>
        <view class="row b-b">
            <text class="tit">底价</text>
            <input class="input" type="digit" v-model="formData.iBasicPrice" placeholder="车商交易价格" placeholder-class="placeholder" />
            <view class='unit'>( 万元 )</view>
        </view>
        <view class="row b-b">
            <text class="tit">新车含税价</text>
            <input class="input" type="digit" v-model="formData.iRawPrice" placeholder="新车含税价" placeholder-class="placeholder" />
            <view class='unit'>( 万元 )</view>
        </view>
        <!--			 <view class="uploads">-->
        <!--				 <view class="row b-b">-->
        <!--					 <text class="tit">行驶证</text>-->
        <!--				 </view>-->
        <!--				&lt;!&ndash; 图片上传 &ndash;&gt;-->
        <!--				<view class='upload-image-view'>-->
        <!--					&lt;!&ndash; 标题已经省略 &ndash;&gt;-->
        <!--					&lt;!&ndash; <view class='title'>上传xxxx图片</view> &ndash;&gt;-->
        <!--					<block v-for="(image,index) in licenseImageList" :key="index">-->
        <!--						<view class='image-view'>-->
        <!--							<image :src="image" :data-src="image" @tap="previewLicense"></image>-->
        <!--							<view class='del-btn' :data-index="index" @tap='deleteLicense'>-->
        <!--								<view class='baicha'></view>-->
        <!--							</view>-->
        <!--						</view>-->
        <!--					</block>-->
        <!--					<view class='add-view' v-if="licenseImageList.length < imageLength" @tap="chooseLicense">-->
        <!--						&lt;!&ndash; 十字架 &ndash;&gt;-->
        <!--						<view class="cross">-->
        <!--							<view class="transverse-line"></view>-->
        <!--							<view class="vertical-line"></view>-->
        <!--						</view>-->
        <!--		  -->
        <!--					</view>-->
        <!--					<view class='info'>上传行驶证</view>-->
        <!--				</view>-->
        <!--				&lt;!&ndash; 图片上传 &ndash;&gt;-->
        <!--				</view>-->
        <view class="row b-b">
            <text class="tit">行驶里程</text>
            <input class="input" type="text" v-model="formData.iCarMileage" placeholder="行驶里程" placeholder-class="placeholder" />
            <view class='unit'>( 万公里 )</view>
        </view>
        <view class="row b-b">
            <text class="tit">变速箱</text>
            <input class="input" type="text" v-model="formData.sGearbox" placeholder="变速箱" placeholder-class="placeholder" />
        </view>
        <view class="row b-b">
            <text class="tit">车辆颜色</text>
            <input class="input" type="text" v-model="formData.sCarColor" placeholder="车身颜色" placeholder-class="placeholder" />
        </view>
        <view class="row b-b">
            <text class="tit">上牌地</text>
            <input class="input" type="text" v-model="formData.sBelongAddr" placeholder="上牌地" placeholder-class="placeholder" />
        </view>
        <view class="row b-b">
            <text class="tit">上牌时间</text>
            <picker class="pickDate" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                <view class="pickDate">{{date}}</view>

            </picker>
        </view>
        <view class="row b-b">
            <text class="tit markBold">商家信息</text>
        </view>
        <view class="row b-b">
            <text class="tit">所属商家</text>
            <input class="input" type="text" v-model="formData.sBusiness"  placeholder-class="placeholder" />
        </view>
        <view class="row b-b">
            <text class="tit">地址</text>
            <input class="input" type="text" v-model="formData.sBusinessAddress"  placeholder-class="placeholder" />
        </view>
        <view class="row b-b">
            <text class="tit">联系人</text>
            <input class="input" type="text" v-model="formData.sContacter"  placeholder-class="placeholder" />
        </view>
        <view class="row b-b">
            <text class="tit">联系电话</text>
            <input class="input" type="text" v-model="formData.sContactPhone"  placeholder-class="placeholder" />
        </view>

        <button class="add-btn" @click="confirm">提交</button>
    </view>

</template>
<script>
    import {request} from '../../service/request.js'
    import getSts from "../../utils/oss/getSts";
    import {getSuffix} from "../../utils/suffix";
    import {getOssSecret, ossHost} from "../../utils/oss/conf";
    const OSS = require('ali-oss');
    const iUid=197;
    const sToken=''
    const iCompanyId=2

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
                formData: {
                    eCarType: 1,
                    sTitle: '',
                    iSalePrice: '',
                    iBasicPrice: '',
                    sCarColor: '',
                    iCarMileage: '',
                    sCarLocation: '广州',
                    sBusiness: '',
                    sBusinessAddress: '',
                    sContacter: '',
                    sContactPhone: '',
                    iRawPrice:'',  //新车含税价
                    sRegisterDate:'',  //上牌时间
                    sBelongAddr:'广州',  //归属地
                    sDisplacement:'',  //排量
                    sGearbox:'自动',  //变速箱
                    sEmission:'',  //排放标准
                    licenseInfo:{}
                },
                date: currentDate,
                bSmartOem:true,
                imageList: [], //保存图片路径集合
                imageLength: 9, //限制图片张数
                sourceTypeIndex: 2, //添加方式限制
                sizeTypeIndex: 0, //图片尺寸限制
                licenseImageList:[],
                licenseLength:1
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
                let data = this.formData;
                handleSubmit()

            },
            bindPickerChange: function(e) {
                this.index = e.target.value
            },
            bindDateChange: function(e) {
                this.date = e.target.value
            },
            switchChange: function (e) {
                this.bSmartOem=!!e.target.value
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
                return `${year}-${month}`;
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
                        console.log("imageList",this.imageList)
                        // uploadImage(this.imageList)
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
            },
            //选择图片
            chooseLicense: async function() {
                uni.chooseImage({
                    sourceType: sourceType[this.sourceTypeIndex],
                    // #ifdef MP-WEIXIN
                    sizeType: sizeType[this.sizeTypeIndex],
                    // #endif
                    count: this.licenseLength - this.licenseImageList.length,
                    success: (res) => {
                        this.licenseImageList = this.licenseImageList.concat(res.tempFilePaths);
                        // uploadLicense(this.licenseImageList)
                    }
                })
            },
            //预览图片
            previewLicense: function(e) {
                var current = e.target.dataset.src
                uni.previewImage({
                    current: current,
                    urls: this.licenseImageList
                })
            },
            //删除图片
            deleteLicense: function(e) {
                var index = e.target.dataset.index;
                var that = this;
                var images = that.licenseImageList;
                images.splice(index, 1);
                that.licenseImageList = images;
            },
            //  拉取用户信息
            getCompanyAgentUser:async function() {
                const payload = {
                    "svr_name": "AdUserMngSvr",
                    "method_name": "GetCompanyAgentUser",
                    "req_body": {
                        iUid:iUid,
                        iCompanyId: 2
                    }
                }
                const dataResp = await request(payload)
                try {
                    if (dataResp.hasOwnProperty('resp_code') && dataResp.resp_code === 0) {
                        const respBody = dataResp.resp_body
                        if (respBody.eRetCode === 0) {
                            let userInfo = respBody.listUserInfo[0]
                            //    将信息处理到stepData中
                            this.formData={
                                ...this.formData,
                                sContacter:userInfo.sName,
                                sContactPhone:userInfo.sPhoneNum,
                                sBusiness:userInfo.sCompanyName,
                                sBusinessAddress:userInfo.sLocation
                            }

                        } else {
                            //    do something
                        }
                    }
                } catch (e) {
                    console.log('e', e)

                }
            }

        },
        mounted(){
            this.getCompanyAgentUser();
        }
    };
    async function uploadImage (imgList){
     getSts().then(async (sign) => {
      try{
      	  let objNames=[]
    	  imgList.map(async (item,ind)=>{
    	  	  console.log("item",item)
    		  try{
    			  const {policyBase64, signature} = getOssSecret(result.AccessKeySecret)
    			  let suffix = getSuffix(item)
    			  const stime = new Date().valueOf()
    			  const objName = 'ytt_platform/images/' + iUid + '-' + stime + '-' + ind + '.' + suffix//  uid+时间戳
    			  objNames.push(objName)
    			  uni.uploadFile({
    				  url: ossHost,
    				  filePath: item.url,//要上传文件资源的路径
    				  name: 'file',//必须填file
    				  formData: {
    					  'key': objName,
    					  'policy': policyBase64,
    					  'OSSAccessKeyId': sign.AccessKeyId,
    					  'success_action_status': '200',
    					  'signature': signature,
    					  'x-oss-security-token': sign.SecurityToken
    				  },
    				  success: function (res) {
    					  index++
    					  if (res.statusCode === 200) {
    						  //  在最后一张图片上传成功的时候发布到后台
    						  if (index === imgList.length) {
    							  // 最后一张
    							  let params = {
    								  // sImage:files[0].url,
    								  sImageObjName: objNames[0],
    							  }
    						  }
    					  }
    				  },
    				  fail: function (errMsg) {
    					  index++
    					  console.log('fail', errMsg)
    				  }
    			  })

    		  }catch{
    			  console.log("e",e)
    		  }
    	  })
      }catch(e){
    	  console.log("getSts",e)
      }
     }
     )
    }
    async function handleSubmit (){
        let iUid=197;
        let sToken="925fcf510ab2f7b4a6006f4acd6940d6";
        let iCompanyId=2;
        let data = this.formData;
        // if (this.imageList.length === 0) {
        //     uni.showToast({
        //         title: '请至少上传一张图片',
        //         icon: 'none',
        //         duration: 1500
        //     })
        //     return;
        // }
        if (data.iSalePrice === '') {
            uni.showToast({
                title: '请填写商品价格！',
                icon: 'none',
                duration: 1500
            })
            return;
        }
        if (data.iSalePrice === '') {
            uni.showToast({
                title: '请填写商品价格！',
                icon: 'none',
                duration: 1500
            })
            return;
        }
        if (data.iCarMileage === '' && data.eCarType === 1) {
            uni.showToast({
                title: '请填写表显里程！',
                icon: 'none',
                duration: 1500
            })
            return;
        }
        //  判断价格
        if (parseFloat(data.iSalePrice)<0||parseFloat(data.iSalePrice)>3000
            || parseFloat(data.iBasicPrice)<0||parseFloat(data.iBasicPrice)>3000
            || parseFloat(data.iRawPrice)<0||parseFloat(data.iRawPrice)>3000) {
            uni.showToast({
                title: '请检查您填写的价格！',
                icon: 'none',
                duration: 1500
            })
            return;
        }
        //  售价不能低于底价
        if(parseFloat(data.iSalePrice)<parseFloat(data.iBasicPrice)){
            uni.showToast({
                title: '售价不能低于底价！',
                icon: 'none',
                duration: 1500
            })
            return;
        }
        let params = {}
        let ListDes = []
        let registerDate = this.date
        let carConfig = {}
        if (data.eCarType === 1) {   //  1是二手车， 2是新车
            if (data.sCarLocation) {
                ListDes.push(data.sCarLocation)
            }
            // if (values.registerDate) {
            //     ListDes.push(`${moment(values.registerDate).format('YYYY/MM')}   上牌`)
            // }
            if (data.iCarMileage) {
                ListDes.push(`${data.iCarMileage}万公里`)
            }
            registerDate = data.sRegisterDate ? data.sRegisterDate : ''
            if (data.iSalePrice) {
                let iPrice = 0
                try {
                    iPrice = parseFloat(data.iSalePrice) || 0
                    iPrice = iPrice * 10000
                    data.iSalePrice = iPrice
                } catch (e) {
                }
            }
            if (data.iBasicPrice) {
                let iPrice = 0
                try {
                    iPrice = parseFloat(data.iBasicPrice) || 0
                    iPrice = iPrice * 10000
                    data.iBasicPrice = iPrice
                } catch (e) {
                }
            }
            if (data.iRawPrice) {
                let iPrice = 0
                try {
                    iPrice = parseFloat(data.iRawPrice) || 0
                    iPrice = iPrice * 10000
                    data.iRawPrice = iPrice
                } catch (e) {
                }
            }
            params = {
                "sTitle": data.sTitle ? data.sTitle : '',
                "sJsonPart1": JSON.stringify({
                    "key1": {
                        "title": "售价",
                        "value": data.iSalePrice ? Number(data.iSalePrice) : 0,
                        "fieldName": "salePrice"
                    },
                    "key2": {
                        "title": "新车含税价",
                        "value": data.iRawPrice,
                        "fieldName": "rawPrice"
                    },
                    "key3": {
                        "title": "贷款", "value": [
                            {
                                "title": "首付",
                                "value": data.iFirstPay ? parseInt(data.iFirstPay) : 0,
                                "fieldName": "firstPay",
                                "isMoney": 1
                            },
                            {
                                "title": "月供",
                                "value": data.iMonthPay ? parseInt(data.iMonthPay) : 0,
                                "fieldName": "monthPay",
                                "isMoney": 1
                            },
                            {
                                "title": "期数",
                                "value": data.iPeriod ? parseInt(data.iPeriod) : 0,
                                "fieldName": "monthCount",
                                "isMoney": 0
                            }
                        ]
                    }
                }),
                "sJsonPart2": JSON.stringify([
                    {"title": "公司名", "value": data.sBusiness ? data.sBusiness : '', "fieldName": "sCompany"},
                    {
                        "title": "地址",
                        "value": data.sBusinessAddress ? data.sBusinessAddress : '',
                        "fieldName": "sAddress"
                    },
                    {
                        "title": "联系人",
                        "value": `${data.sContacter}:${data.sContactPhone}`,
                        "fieldName": "slinkMan"
                    }]),
                "sJsonPart3": JSON.stringify([
                    {
                        "title": "表显里程",
                        "value": data.iCarMileage ? `${data.iCarMileage}万公里` : '',
                        "fieldName": "sMileage"
                    },
                    {"title": "上牌时间", "value": registerDate, "fieldName": "registerDate"},
                    {
                        "title": "上牌地",
                        "value": data.sBelongAddr ? data.sBelongAddr : '',
                        "fieldName": "sBelongAddr"
                    },
                    // {
                    //     "title": "所在地",
                    //     "value": stepData3.sCarLocation ? stepData3.sCarLocation : '',
                    //     "fieldName": "currentAddr"
                    // },
                    {"title": "车身颜色", "value": data.sCarColor ? data.sCarColor : '', "fieldName": "sColor"},
                    {
                        "title": "排放标准",
                        "value": data.sEmission ? data.sEmission : '',
                        "fieldName": "sStandard"
                    },
                    {"title": "变速箱", "value": data.sGearbox ? data.sGearbox : '', "fieldName": "sGearbox"},
                    {
                        "title": "排量",
                        "value": data.sDisplacement ? data.sDisplacement : '',
                        "fieldName": "displacement"
                    }
                ]),
                "iSalePrice": data.iSalePrice ? Number(data.iSalePrice) : 0,
                "iBasicPrice": data.iBasicPrice ? Number(data.iBasicPrice) : 0,
                "sGoodsDesc": JSON.stringify(ListDes),
                "listObjectName": objNames,
                "sImgJson": JSON.stringify(data.imgInfoList),
                "sLinkText": "",
                // "sGoodsDesc": "",
                "iGoodsTypeId": 1,
                "sJsonRawData": JSON.stringify({
                    'iCompanyId': iCompanyId,
                    'sTitle': data.sTitle,
                    'sBrand': '',
                    'sYear': '',
                    'sLine': '',
                    'sModel': '',
                    'salePrice': data.iSalePrice ? Number(data.iSalePrice) : 0,
                    'iBasicPrice': Number(data.iBasicPrice),
                    'sCompany': data.sBusiness,
                    'sAddress': data.sBusinessAddress,
                    'slinkMan': data.sContacter,
                    'sPhone': data.sContactPhone,
                    'rawPrice': data.iRawPrice,
                    'carType': data.eCarType,
                    'sMileage': data.iCarMileage,
                    'currentAddr': data.sCarLocation,
                    'sGoodsType': 1,
                    'iGoodsTypeId': 1,
                    'sColor': data.sCarColor,
                    'sDisplacement': data.sDisplacement,
                    'sGearbox': data.sGearbox,
                    'sStandard': data.sEmission,
                    'sBelongAddr': data.sBelongAddr,
                    'sRegisterDate': data.sRegisterDate,
                    iFirstPay: data.iFirstPay ? parseInt(data.iFirstPay) : 0,
                    iPeriod: data.iPeriod ? parseInt(data.iPeriod) : 0,
                    iMonthPay: data.iMonthPay ? parseInt(data.iMonthPay) : 0,
                }),
                "eCarType": data.eCarType ? parseInt(data.eCarType) : 1,
                "iCompanyId": iCompanyId ? iCompanyId : 1,
                "carConfig": carConfig,
                //     新增字段
                sDriLicenseObjName: data.sDriLicenseObjName,
                bSmartOem: this.bSmartOem,
                sCarColor: data.sCarColor,
                oBusinessInfo: {
                    sBusiness: data.sBusiness,
                    sBusinessAddress: data.sBusinessAddress,
                    sContacter: data.sContacter,
                    sContactPhone: data.sContactPhone,
                },
                oDriLicenseInfo: data.licenseInfo,
                iCarMileage: data.iCarMileage ? parseInt(data.iCarMileage) : 0,
                sCarLocation: data.sCarLocation,

                //    新增字段
                iRawPrice: data.iRawPrice ? data.iRawPrice : 0,  //新车含税价
                sRegisterDate: registerDate,  //上牌时间
                sBelongAddr: data.sBelongAddr,  //归属地
                sDisplacement: data.sDisplacement,  //排量
                sGearBox: data.sGearBox,  //变速箱
                sEmission: data.sEmission,  //排放标准
                oLoanInfo: {
                    iFirstPay: data.iFirstPay ? parseInt(data.iFirstPay) : 0,
                    iPeriod: data.iPeriod ? parseInt(data.iPeriod) : 0,
                    iMonthPay: data.iMonthPay ? parseInt(data.iMonthPay) : 0,
                }
            }
            const payload = {
                "svr_name": "AD.AdGoodsMngSvr",
                "method_name": "UploadNewCar",
                "req_body": {
                    iUid: iUid,
                    sToken: sToken,
                    oGoodsInfo: params,
                    eSaveWay: 0
                }
            }
            const dataResp = await request(payload)
            uni.hideLoading()
            try {
                if (dataResp.hasOwnProperty('resp_code') && dataResp.resp_code === 0) {
                    const respBody = dataResp.resp_body
                    if (respBody.eRetCode === 0) {
                        uni.showToast({
                            title: '操作成功',
                            icon: 'none',
                            duration: 1500
                        })

                        uni.switchTab({
                            url: `/pages/index/index`
                        });
                    } else {
                        if (respBody.eRetCode === 105) {
                            uni.hideLoading()
                            uni.showToast({
                                title: '文字内容违规',
                                icon: 'none',
                                duration: 1500
                            })
                        } else {
                            uni.hideLoading()
                            uni.showToast({
                                title: '操作失败',
                                icon: 'none',
                                duration: 1500
                            })
                        }
                    }
                } else {
                    uni.hideLoading()
                    uni.showToast({
                        title: '操作失败',
                        icon: 'none',
                        duration: 1500
                    })
                }
            } catch (e) {
                uni.hideLoading()
                uni.showToast({
                    title: '操作失败',
                    icon: 'none',
                    duration: 1500
                })
                console.log('e', e)
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
        .markBold{
            font-weight: bold;
            font-size: 32upx;
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
        .unit{
            position: absolute;
            right: 60upx;
            z-index: 1001;
            top: 30%;
            font-size: 24upx;
            color:#F98B06;
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
