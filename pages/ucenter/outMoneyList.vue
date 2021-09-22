<template>
<view class="uni__container flexbox flex_col">
		<header-bar :isBack="true" title="返回" titleTintColor="#353535" :bgColor="{background: '#f4f4f4'}">
			<text slot="back" class="uni_btnIco iconfont icon-back"></text> 
		</header-bar>
		<view class="uni__listview mt_15"> 
		
			<view class="item uni__list uni__material" v-for="(item, index) in dataList" :key="index">
				<view class="txt flex1 c_feb719" >
					{{item.doState==0?"审核中":"已提现"}}
					￥{{item.doMoneyStr}}</view> 
				<text class="c_999 fs_12">{{item.createTime}}</text> 
			</view>
				
		 
		</view>
	</view>
</template>

<script>
	import Api from '../../utils/requestApi.js'
	export default {
		data() {
			return {
				dataList:[], 
				listQuery:{
					isLoadMore:true,
					userId:'', 
					page:1,
					pageSize:20,
					doType:2,
				},
				userData:{},
			}
		},
		onLoad(options) {  
			this.userData = uni.getStorageSync('user')
			this.listQuery.userId = this.userData.id;
			this.getList();
		},
	    onReachBottom(){  //上拉触底函数
			  if(!this.listQuery.isLoadMore){  //此处判断，上锁，防止重复请求 
					this.listQuery.page+=1
					this.getList()
			  }
		},
		onPullDownRefresh(){  //下拉刷新
		    console.log('refresh');
			this.listQuery.page=1
			this.dataList=[];
			this.getList();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {   
			getList(){ 
				uni.showLoading();
				Api.httpResponse("/user/showMoney/list", 'GET',this.listQuery).then(
					res => {  
						  uni.hideLoading();  
						  this.dataList=this.dataList.concat(res.records);
						   if(this.listQuery.page<res.pages){
								this.listQuery.isLoadMore=false;
						   } 
					},
					error => {
						console.log(error);
					}
				)
			}
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
