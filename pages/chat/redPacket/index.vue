/**
 * @tpl 红包模板
 */

<template>
	<view class="uni__container flexbox flex_col" style="background: #f1f1f1;">
	<header-bar :isBack="true" title="发红包" titleTintColor="#fff" :bgColor="{background: '#f75741'}" center><text slot="back" class="uni_btnIco iconfont icon-back"></text><text slot="iconfont" class="uni_btnIco iconfont icon-dots mr_5"></text>
		</header-bar>
		<view class="uni__scrollview flex1"><view class="uni-redPacket">
		<view class="uni__listview"><view class="item uni__list">
		<text class="c_353535 fs_16">金额</text><input class="ipt_text flex1 pr_10" type="text" placeholder="0.00" /><text class="c_353535 fs_16">元</text>
		</view>
		</view>
		<view class="uni__listview mt_20"><view class="item uni__list"><text class="c_353535 fs_16">留言</text><input class="ipt_text flex1" type="text" placeholder="恭喜发财,大吉大利" /></view></view>
		<view class="uni__listview mt_25"><view class="align_c fs_24">￥ <text class="fs_36">0.00</text></view></view>
		<view class="uni__listview mt_30 pad15"><button class="uni__btn-default" style="background: #fbd92f!important;color:#8c4900!important;line-height:40px;" @tap="handleRedPacket">塞钱进钱包</button>
		</view></view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			handleRedPacket() {uni.navigateBack({delta: 1
				})
			}
		}
	}
</script>
<style scoped>
.uni-redPacket {padding: 15px 0;}.uni-redPacket .item {min-height: 100upx; border-top: 1upx solid #ebebeb; border-bottom: 1upx solid #ebebeb; line-height: 1.2;}
.uni-redPacket .ipt_text {color: #353535; font-size: 32upx; text-align: right;}.uni-redPacket .uni__btn-default:after {display: none;}
</style>