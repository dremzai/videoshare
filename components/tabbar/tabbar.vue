/**
 * @tpl 底部tabbar模板
 */
<template>
	<view class="uni_tabbar" :class="[fixed ? 'fixed' : '']">
		<view class="tablist flexbox flex_alignc uni_borT" :style="[backgroundColor ? {'background-color': backgroundColor} : '']">
	<block v-for="(item,index) in tabList" :key="index"><view class="navigator" :class="currentTabIndex == index ? 'on' : ''" @tap="switchTab(index)">
		<view class="icon"><text class="iconfont" :class="item.icon" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]"></text><text v-if="item.badge" class="uni_badge">{{item.badge}}</text><text v-if="item.badgeDot" class="uni_badge uni_badge_dot"></text>
			</view><view class="text" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]">{{item.text}}</view></view>
	</block>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
		return {
			tabList: [
				{icon: 'icon-tab01',text: '活动'},
				{icon: 'icon-tab02',text: '视频'},
				// {icon: 'icon-tab03',text: '参与'},
				{icon: 'icon-tab04',text: '消息'
				// ,badge: 15
				},
				{icon: 'icon-tab05',text: '我'
				// ,badgeDot: true,
				}
				],currentTabIndex: this.current
			}
		},
		props: {current: { type: [Number, String], default: 0 },backgroundColor: { type: String, default: '#fff' },color: { type: String, default: '#999' },
		tintColor: { type: String, default: '#ff592e' },fixed: { type: [Boolean, String], default: false },
		},
		methods: {switchTab(index){this.currentTabIndex = index
		this.$emit('click', index)
			}
		},
	}
</script>
<style scoped>
.uni_tabbar {display: flex; width: 100%;}.uni_tabbar .tablist {background-color: #fff; height: 100upx; width: 750upx; position: relative; z-index: 9000;}
.uni_tabbar .tablist.uni_borT:before {background: #bbb;}.uni_tabbar.fixed {padding-top: 100upx;}
.uni_tabbar.fixed .tablist {position: fixed; bottom: 0; left: 0;}.uni_tabbar .tablist .navigator {flex: 1; text-align: center; height: 100upx;}
.uni_tabbar .tablist .icon {display: flex; align-items: center; justify-content: center; margin: 0 auto; margin-top: 10upx; height: 50upx; width: 50upx; position: relative;}
.uni_tabbar .tablist .icon .iconfont {color: #999; font-size: 44upx;}.uni_tabbar .tablist .text {color: #999; font-size: 24upx;}
.uni_tabbar .tablist .navigator.on .icon .iconfont {color: #ff592e;}.uni_tabbar .tablist .navigator.on .text {color: #ff592e;}
.uni_tabbar .tablist .uni_badge {position: absolute; top: -3upx; left: 32upx;}.uni_tabbar .tablist .uni_badge_dot {left: 36upx;}
</style>