<template>
<view class="uni__container flexbox flex_col">
		<header-bar id="header_bar" :isBack="true" title="返回" titleTintColor="#353535" :bgColor="{background: '#f4f4f4'}">
			<text slot="back" class="uni_btnIco iconfont icon-back"></text> 
		</header-bar>
		
		<mescroll-uni ref="mescrollRef" :height="height + 'px'" @down="downCallback" @up="upCallback">
		<view class="uni__listview mt_15"> 
		
			<view class="item uni__list uni__material" v-for="(item, index) in dataList" :key="index">
				<view class="txt flex1 c_feb719" >
					{{item.doState==0?"审核中":"已提现"}}
					￥{{item.doMoneyStr}}</view> 
				<text class="c_999 fs_12">{{item.createTime}}</text> 
			</view>
				
		 
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import Api from '../../utils/requestApi.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
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
				height:"100"
			}
		},
		onReady() {
			let that = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success(res) { //成功回调函数
			
					that._data.height = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let tab_bar = uni.createSelectorQuery().select("#header_bar"); //想要获取高度的元素名（class/id）
			
			
					let heightA = 0
					tab_bar.boundingClientRect(data => {
						that._data.height = that._data.height - data.bottom
					}).exec()
			
			
				}
			})
		},
		onLoad(options) {  
			this.userData = uni.getStorageSync('user')
			this.listQuery.userId = this.userData.id;
			
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
			// /*下拉刷新的回调, 有3种处理方式:*/
			downCallback() {
			
				this.listQuery.page = 1
				this.dataList = []
				this.getList()
			
			},
			// /*上拉加载的回调*/
			upCallback() {
			
				this.listQuery.page += 1
				this.getList()
			
			},
			getList(){  
				Api.httpResponse("/user/showMoney/list", 'GET',this.listQuery).then(
					res => {   
						  this.dataList=this.dataList.concat(res.records);
						   if(this.listQuery.page<res.pages){
								this.listQuery.isLoadMore=false;
						   } 
						   this.mescroll.endSuccess()
						   
						   this.mescroll.endByPage(this.dataList, res.total);
					},
					error => {
						console.log(error);
						this.mescroll.endSuccess()
						this.mescroll.endByPage();
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
