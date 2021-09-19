
<template>
	<view class="uni__container flexbox flex_col">
		<header-bar :isBack="true" title="新的朋友"><text slot="back" class="uni_btnIco iconfont icon-arrL"></text><text slot="string" class="uni_btnString" @tap="handleAddFriend">添加好友</text>
		</header-bar><view class="uni__scrollview flex1">
			<view class="uni-newFriendList"><view class="uni__listview mt_15">
			<view class="uni__list mh_110"><text class="iconfont icon-sousuo c_999 mr_15"></text><input class="searIpt flex1 fs_14" type="text" placeholder="用户名/昵称/手机号" /></view>
				</view>
		<view class="friendlist uni__listview mt_15">
			<view class="uni__list uni__material">
			<image class="avator" src="/static/uimg/u__qun-img2.jpg" mode="widthFix" />
				<view class="reqinfo flex1">
				<view class="name ellipsis">奇异趣事</view><view class="desc ellipsis">夏末秋初，如诗如画都在这儿</view>
				</view>
			<view class="btn_valid on">已添加</view>
					</view>
			<view class="uni__list uni__material">
				<image class="avator" src="/static/uimg/u__chat_img6.jpg" mode="widthFix" />
				<view class="reqinfo flex1">
				<view class="name ellipsis">uni-app爱好者</view><view class="desc ellipsis">vue.js仿原生App开发实战</view>
				</view>
				<view class="btn_valid">接受</view>
					</view>
					<view class="uni__list uni__material"><image class="avator" src="/static/uimg/u__chat_img4.jpg" mode="widthFix" /><view class="reqinfo flex1"><view class="name ellipsis">极目远眺</view><view class="desc ellipsis">uniapp初学，欢迎一起交流</view>
						</view><view class="btn_valid on">已添加</view>
					</view>
					<view class="uni__list uni__material"><image class="avator" src="/static/uimg/u__chat_img9.jpg" mode="widthFix" />
						<view class="reqinfo flex1"><view class="name ellipsis">Flow</view><view class="desc ellipsis">cnbolg大佬，求带~</view>
						</view><view class="btn_valid on">等待验证</view>
					</view>
					<view class="uni__list uni__material"><image class="avator" src="/static/uimg/u__chat_img14.jpg" mode="widthFix" />
						<view class="reqinfo flex1"><view class="name ellipsis">彩云之南</view><view class="desc ellipsis">uniapp-chatroom项目不错！</view>
						</view><view class="btn_valid">接受</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			handleAddFriend() {uni.navigateTo({url: '/pages/contact/add-friends'})
			}
		}
	}
</script>

<style scoped>

</style>