/**
 * @tpl 首页模板
 */

<template>
	<view class="uni__attentions">
	<view class="uni__listview" style="margin-top: 20px;">
		 <uni-steps :options="[
			 {title:'第一步绑定视频号',desc:'到我的界面点击视频号栏绑定你的微信视频号'},
			 {title:'第二步长按活动，复制活动内容',desc:''},
			 {title:'第三步拍摄短视频',desc:'自创拍摄短视频或下载别人的优质短视频；创作工具推荐：剪映'},
			 {title:'第四步发布短视频',desc:'到微信视频号界面，使用第二步复制的活动内容发布你的短视频'},
			 {title:'第五步查看短视频',desc:'到我参与的活动界面，下拉刷新查看最新参与的短视频'},
			 {title:'第六步查看每日收益',desc:'到数据界面查看上一日的短视频收益'}
			 ]" direction="column" :active="5">
			 </uni-steps>
	</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex' 
	export default {
		data() {
			return { 
				
			}
		},  
		mounted(){
			 
		},
		methods: {
			 
		}
	}
</script>

<style>
</style>
