<template>
<view class="uni__container flexbox flex_col">
		<header-bar :isBack="true" title="返回" titleTintColor="#353535" :bgColor="{background: '#f4f4f4'}">
			<text slot="back" class="uni_btnIco iconfont icon-back"></text> 
		</header-bar>
		<form style="margin-top: 15px;"  @submit.prevent="submitForm">
			<view class="uni-form-item uni-column">
				<view class="title">微信视频号名称</view>
				<view> 
					<input class="uni-input" v-model="userData.wxVideoAccount" name="input"  />
				</view>
			</view> 
			 <view class="uni-btn-v"> 
				<button class="uni__btn-primary bg_linear2" type="primary" form-type="submit" >提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import Api from '../../utils/requestApi.js'
	export default {
		data() {
			return {
				userData:[], 
				formData:{
					wxVideoAccount:'', 
				}
			}
		},
		onLoad(options) { 
			this.userData=uni.getStorageSync('user') 
		},
		methods: { 
			submitForm(){
				uni.showLoading();  
				Api.httpResponse("/stm/api/user/showUser/bingWxVideoAccount", 'POST',this.userData,'json').then(
					result => {  
						  uni.hideLoading();   
						  this.$store.commit('SET_USER', this.userData)
						  uni.navigateBack();
					},
					error => {
						console.log(error);
					}
				)
			},  
		}
	}
</script>

<style>

.uni-flex {
	display: flex;
	flex-direction: row;
}
.uni-flex-item {
	flex: 1;
}
.uni-row {
	flex-direction: row;
}
.uni-column {
	flex-direction: column;
}
.uni-link{
	color:#576B95;
	font-size:28upx;
}
.uni-center{
	text-align:center;
}
.uni-inline-item{
	display: flex;
	flex-direction: row;
	align-items:center;
}
.uni-inline-item text{
	margin-right: 20upx;
}
.uni-inline-item text:last-child{
	margin-right: 0upx;
	margin-left: 20upx;
}

/* 表单 */
.uni-form-item{
	display:flex;
	width:100%;
	padding:10upx 0;
}
.uni-form-item .title{
	padding:10upx 25upx;
}
.uni-label {
	width: 210upx;
	word-wrap: break-word;
	word-break: break-all;
	text-indent:20upx;
}
.uni-input {
	height: 80upx;
	padding: 15upx 25upx;
	line-height:50upx;
	font-size:28upx;
	background:#FFF;
	flex: 1;
}
/* 竖向百分百按钮 */
.uni-btn-v{
	padding:10upx 0;
}
.uni-btn-v button{margin:20upx 0;}

</style>
