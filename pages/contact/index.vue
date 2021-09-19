/**
 * @tpl 通讯录模板
 */

<template>
	<view class="uni__container flexbox flex_col">
		<header-bar :isBack="true" title="好友" titleTintColor="#353535" :bgColor="{'background': '#fff'}"><text slot="back" class="uni_btnIco iconfont icon-back"></text><text slot="iconfont" class="uni_btnIco iconfont icon-paixu"></text><text slot="iconfont" class="uni_btnIco iconfont icon-tianjiahaoyou" @tap="GoAddFriend"></text>
		</header-bar>
		<view class="uni__scrollview flex1"><view class="uni__subNavs"><view class="ls flexbox flex_alignc"><text class="item on">好友</text><text class="item">关注</text><text class="item">粉丝</text><text class="item">赞</text>
		</view>
		</view>
		<view class="uni__listview bg_fff" style="padding: 20upx 30upx;"><view class="uni__list" style="background: #ebebeb;border-radius: 50upx;"><text class="iconfont icon-sousuo c_999 mr_15"></text><input class="searIpt flex1 fs_14" type="text" placeholder="搜索" />
				</view>
			</view><view class="uni__contactList">
				<view class="uni__listview mt_10"><view class="uni__list uni__material">
						<view class="bg_linear2 flexbox flex_alignc flex_justifyc mr_15" style="border-radius:50%;height: 36px; width: 36px;"><text class="iconfont icon-haoyou c_fff"></text></view>
						<view class="txt flex1">新的朋友</view><text class="uni_badge">1</text><text class="iconfont icon-arrR c_999 fs_12"></text></view>
				</view>
				<view class="addrlist uni__listview">
					<view class="data_item"><view class="uni__list uni__material" @tap="GoUhome" @longpress="uniContactMenu"><image class="avator" src="/static/uimg/u__chat_img1.jpg" mode="widthFix" /><view class="name">猪猪佩奇</view>
				</view><view class="uni__list uni__material" @tap="GoUhome" @longpress="uniContactMenu"><image class="avator" src="/static/uimg/u__chat_img25.jpg" mode="widthFix" /><view class="name">逗你玩</view>
				</view><view class="uni__list uni__material" @tap="GoUhome" @longpress="uniContactMenu"><image class="avator" src="/static/uimg/u__chat_img28.jpg" mode="widthFix" /><view class="name">Heart@你得不到的爱</view>
				</view><view class="uni__list uni__material" @tap="GoUhome" @longpress="uniContactMenu"><image class="avator" src="/static/uimg/u__chat_img9.jpg" mode="widthFix" /><view class="name">孤独伊人💋</view>
						</view>
				<view class="uni__list uni__material" @tap="GoUhome" @longpress="uniContactMenu"><image class="avator" src="/static/uimg/u__chat_img10.jpg" mode="widthFix" /><view class="name">不二家菇凉</view>
				</view>
			</view>
		</view>
			</view>
		</view>
		<uni-pop ref="uniPop" />
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			GoAddFriend() {uni.navigateTo({url: '/pages/contact/add-friends'})
			},GoUhome() {uni.navigateTo({url: '/pages/ucenter/uhome'})
			},
			uniContactMenu() {
			let uniPop = this.$refs.uniPop
				uniPop.show({skin: 'androidSheet',
			btns: [{text: '私信TA'},{text: '修改备注'},{text: '加入黑名单'},{text: '删除',
				onTap() {uniPop.close()
				}
				}]})
			}
		}
	}
</script>

<style scoped>

</style>