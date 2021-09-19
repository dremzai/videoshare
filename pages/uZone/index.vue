<template>
	<view class="flexbox flex_col">
		<header-bar :isBack="true" title="TA的动态" :bgColor="{background: headerBarBackground}" center transparent><text slot="back" class="uni_btnIco iconfont icon-back"></text><text slot="iconfont" class="uni_btnIco iconfont icon-publish mr_5" @tap="handlePublish"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<view class="uni-friendZone"><view class="fz_header"><image class="poster" src="/static/placeholder/friendZone_bg.jpg" mode="aspectFill" />
				</view>
				<view class="fz_container mt_10">
					<view class="fz_item flexbox uni__material" @longpress="handleZoneMenu">
					<image class="fzitem_avator" src="/static/uimg/u__chat_img1.jpg" mode="aspectFill" />
				<view class="fzitem_content flex1"><text class="fz_user">猪猪佩奇</text>
							<view class="mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>24</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>1.12km</view>
						</view><view class="fz_cnts">忽然明白 根本无需对未来和曾经做无谓的设想和缅怀，因为你决定超前走的那一刻，过去就都与你无关了。</view>
					<view class="fz_photos"><image class="fz_img_auto" src="/static/placeholder/placeholder-img4.jpg" mode="aspectFill" />
							</view>
						<view class="fz_foot flexbox flex_alignc"><text class="fz_time flex1">2分钟前</text><text class="iconfont icon-xihuan"></text><text class="iconfont icon-pinglun ml_15"></text>
						</view>
						</view>
					</view>
					<view class="fz_item flexbox uni__material" @longpress="handleZoneMenu">
						<image class="fzitem_avator" src="/static/uimg/u__chat_img3.jpg" mode="aspectFill" /><view class="fzitem_content flex1">
						<text class="fz_user">素颜自然美</text><view class="mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>24</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>19.6km</view>
					</view>
							<view class="fz_cnts">在最美的年华遇见最美的你，只为了说一句：“哦，原来你也在这里”</view>
							<view class="fz_photos"><image class="fz_img" src="/static/uimg/u__chat_img4.jpg" mode="aspectFill" /><image class="fz_img" src="/static/uimg/u__chat_img5.jpg" mode="aspectFill" /><image class="fz_img" src="/static/uimg/u__chat_img10.jpg" mode="aspectFill" />
							</view>
					<view class="fz_foot flexbox flex_alignc"><text class="fz_time flex1">6分钟前</text><text class="iconfont icon-xihuan"></text><text class="iconfont icon-pinglun ml_15"></text>
							</view>
						</view>
					</view>
					<view class="fz_item flexbox uni__material" @longpress="handleZoneMenu">
					<image class="fzitem_avator" src="/static/uimg/u__chat_img22.jpg" mode="aspectFill" />
					<view class="fzitem_content flex1">
					<text class="fz_user">美婷</text>
					<view class="mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>23</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>213.61km</view>
							</view><view class="fz_cnts">天气太冷，还是被窝舒服鸭~</view>
					<view class="fz_foot flexbox flex_alignc"><text class="fz_time flex1">17分钟前</text><text class="iconfont icon-xihuan"></text><text class="iconfont icon-pinglun ml_15"></text>
					</view>
				</view>
					</view>
				</view>
			</view>
		</view>
		<uni-pop ref="uniPop"></uni-pop>
	</view>
</template>

<script>
	export default {
		data() {
			return {headerBarBackground: 'transparent'
			}
		},
		onPageScroll : function(e) {this.headerBarBackground = 'rgba(44,198,224,'+e.scrollTop / 200+')'
		},
		onPullDownRefresh() {
			setTimeout(function () {uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
	handleZoneMenu() {
		let uniPop = this.$refs.uniPop
		uniPop.show({
		skin: 'androidSheet',btns: [
			{text: '不看TA的动态',onTap() {
				uniPop.close()
			}
			}]})
			},
			
			handlePublish() {
				uni.navigateTo({url: '/pages/uZone/publish'})
			}
		}
	}
</script>
<style scoped>

</style>