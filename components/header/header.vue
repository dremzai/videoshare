/**
 * @tpl 顶部导航模板（自定义）
 */
<template>
	<view class="uni_topbar" :style="!transparent ? style : ''"><view class="inner flexbox flex_alignc" :class="[fixed || transparent ? 'fixed' : '']" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px', 'color': titleTintColor}, bgColor]">
	<view v-if="isBack" @tap="goBack"><slot name="back"></slot></view>
	<slot name="headerL"></slot>
		<!-- #ifndef MP -->
		<view class="flex1" v-if="!search && center"></view>
	<!-- #endif -->
	<view class="uni_title flex1" :class="[center ? 'uni_titleCenter' : '']" :style="[isBack ? {'font-size': '32upx', 'padding-left': '0'} : '']" v-if="!search && title">{{title}}</view>
	<view class="uni_search flex1" :class="[searchRadius ? 'uni_searchRadius' : '']" v-if="search"><input v-if="searchRadius" class="uni_searchIpt flex1" type="text" placeholder="搜索" placeholder-style="color: rgba(0,0,0,.5);" /><input v-else class="uni_searchIpt flex1" type="text" placeholder="搜索" placeholder-style="color: rgba(255,255,255,.5);" /></view>
	<view class="uni_headerRight flexbox flex_row flex_alignc"><slot name="iconfont"></slot><slot name="string"></slot><slot name="image"></slot></view>
</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {statusBarH: this.statusBar,customBarH: this.customBar
			}
		},
	props: {isBack: { type: [Boolean, String], default: true },title: { type: String, default: '' },titleTintColor: { type: String, default: '#fff' },bgColor: Object,center: { type: [Boolean, String], default: false },search: { type: [Boolean, String], default: false },searchRadius: { type: [Boolean, String], default: false },fixed: { type: [Boolean, String], default: false },transparent: { type: [Boolean, String], default: false },
		},
	computed: {
		style() {let _style = `height: ${this.customBarH}px;`
			return _style
			}
		},
		methods: {goBack() {uni.navigateBack()}
		}
	}
</script>

<style>

</style>