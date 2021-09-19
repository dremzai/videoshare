/**
 * @tpl 个人主页模板
 */

<template>	
	<view class="uni__container flexbox flex_col bg_fff">
	<header-bar :isBack="true" title=" " :bgColor="{background: headerBarBackground}" transparent><text slot="back" class="uni_btnIco iconfont icon-guanbi" style="font-size: 25px;"></text><text slot="iconfont" class="uni_btnIco iconfont icon-dots mr_5" style="font-size: 25px;"></text>
		</header-bar>
		<view class="uni__scrollview flex1"><view class="uni-uhomeWrapper">
			<view class="uh-swiper">
			<swiper :indicator-dots="true" :duration="200" indicator-color="#dbdbdb" indicator-active-color="#fff" style="height: 100%;">
			<swiper-item><image src="/static/uhome/uh-img1.jpg" mode="aspectFill" /></swiper-item><swiper-item><image src="/static/uhome/uh-img2.jpg" mode="aspectFill" /></swiper-item><swiper-item><image src="/static/uhome/uh-img3.jpg" mode="aspectFill" /></swiper-item><swiper-item><image src="/static/uhome/uh-img4.jpg" mode="aspectFill" /></swiper-item><swiper-item><image src="/static/uhome/uh-img5.jpg" mode="aspectFill" /></swiper-item>
				</swiper>
				</view>
				<view class="uh-info">
					<view class="name ellipsis fs_16">猪猪佩奇 <text class="iconfont icon-huangguan"></text></view><view class="mt_5">
				<view class="uni-age"><text class="iconfont icon-nv"></text>24</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>顺德</view>
			<text class="c_bbb fs_12 ml_10">ID：9852082</text></view><view class="mt_5"><text class="c_bbb fs_12">评价值：4.8分</text></view>
				</view>
				<view class="uh-dynamic uni__material" @tap="GoUzone"><view class="uhtitle flexbox flex_alignc"><text class="lbl flex1">动态 <text class="num">(3)</text></text><text class="iconfont icon-arrR c_999"></text>
					</view>
			<view class="flexbox pad15" style="padding-top: 0;"><image class="img" src="/static/placeholder/placeholder-img4.jpg" mode="aspectFill" style="height: 50px;width: 50px;" />
			<view class="flex1 ml_15"><text style="font-size: 14px;">忽然明白 根本无需对未来和曾经做无谓的设想和缅怀，因为你决定超前走的那一刻，过去就都与你无关了。</text>
				<view class="c_bbb fs_12 mt_5">2019/10/16 10:50:27</view></view></view>
				</view>
				<view class="uh-reward uni__material"><view class="uhtitle flexbox flex_alignc"><text class="lbl flex1">打赏 <text class="num">(1578)</text></text><text class="iconfont icon-arrR c_999"></text>
					</view>
			<view class="flexbox pb_15" style="padding-top: 0;text-align: center;"><view class="flex1"><image class="giftimg" src="/static/gift/gift-img7.png" mode="aspectFill" /><text class="giftnum">x8</text></view><view class="flex1"><image class="giftimg" src="/static/gift/gift-img3.png" mode="aspectFill" /><text class="giftnum">x15</text></view>
			<view class="flex1"><image class="giftimg" src="/static/gift/gift-img1.png" mode="aspectFill" /><text class="giftnum">x68</text></view><view class="flex1"><image class="giftimg" src="/static/gift/gift-img6.png" mode="aspectFill" /><text class="giftnum">x21</text></view>
			</view>
		</view><view class="uh-btnfoot flexbox flex_alignc flex_justifyc"><text class="btn flex1 bg_linear1"><text class="iconfont icon-guanzhu mr_5"></text>关注TA</text><text class="btn flex1 bg_linear2" @tap="GoPrivateChat"><text class="iconfont icon-sixin mr_5"></text>私信聊</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {headerBarBackground: 'transparent'
			}
		},
		methods: {
		GoUzone() {uni.navigateTo({url: '/pages/uZone/index'})
			},
		GoPrivateChat() {uni.navigateTo({url: '/pages/chat/privateChat/chat'})
			}
		}
	}
</script>

<style scoped>

</style>