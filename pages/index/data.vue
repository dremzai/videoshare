/**
 * @tpl 首页模板
 */

<template>
	<view class="uni__attentions">
	<view class="uni__listview"><view class="item uni__list uni__material" @tap="GoUhome" @longpress="handleAttentionMenu">
			<view class="avator"><image src="/static/uimg/u__chat_img35.jpg" mode="widthFix" /></view><view class="uinfo flex1">
				<view class="name ellipsis">小蛮腰</view><view class="subinfo ellipsis mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>21</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>郑州</view></view>
			</view><view class="btn bg_linear1">关注</view>
		</view><view class="item uni__list uni__material" @tap="GoUhome" @longpress="handleAttentionMenu"><view class="avator"><image src="/static/uimg/u__chat_img3.jpg" mode="widthFix" /></view>
			<view class="uinfo flex1"><view class="name ellipsis">素颜自然美</view><view class="subinfo ellipsis mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>18</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>深圳</view></view>
			</view><view class="btn cancel">取消关注</view>
		</view><view class="item uni__list uni__material" @tap="GoUhome" @longpress="handleAttentionMenu"><view class="avator"><image src="/static/uimg/u__chat_img29.jpg" mode="widthFix" /></view>
			<view class="uinfo flex1"><view class="name ellipsis">如此的依赖</view><view class="subinfo ellipsis mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>27</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>0.29km</view></view>
			</view><view class="btn cancel">取消关注</view>
		</view><view class="item uni__list uni__material" @tap="GoUhome" @longpress="handleAttentionMenu"><view class="avator"><image src="/static/uimg/u__chat_img22.jpg" mode="widthFix" /></view><view class="uinfo flex1"><view class="name ellipsis">美婷</view><view class="subinfo ellipsis mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>23</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>大理</view></view>
			</view><view class="btn cancel">取消关注</view></view>
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
			GoUhome() {uni.navigateTo({url: '/pages/ucenter/uhome'})
			},
		}
	}
</script>

<style>
</style>
