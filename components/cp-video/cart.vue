 /**
  * @tpl 			小视频购物车模板
  * @author 	andy by 2019-10-27
  */
<template>
	<view v-if="popupVisible" class="popup-footer">
<view class="pop__ui_panel">
	<view class="pop__ui_mask" @tap="close"></view>
	<view class="pop__ui_child anim-footer">
		<view class="pop__ui_head uni_borB">热售商品</view>
	<view class="pop__ui_body">
					<view class="wrap_carts">
				<block v-for="(item,index) in cartList" :key="index">
					<view class="item uni__material flexbox flex_alignc"><image class="gpic" :src="item.image" mode="aspectFill" /><view class="ginfo flex1"><view class="name">{{item.name}}</view><text class="price">￥{{item.price}}</text></view><view class="gbtn">去看看</view></view>
				</block>
			</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {popupVisible: false,cartList: [],
			}
		},
		props: ['vlist'],
		methods: {
			show(index) {this.cartList = this.vlist[index].cart
				this.popupVisible = true
			},
			close() {this.popupVisible = false
			},
		}
	}
</script>
<style scoped>
.pop__ui_panel {display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; position: fixed; left: 0; top: 0; z-index: 201909; pointer-events: none;}
.pop__ui_mask {background: #000; opacity: .6; height: 100%; width: 100%; position: fixed; left: 0; top: 0; pointer-events: auto; touch-action: none; animation: anim_mask .5s;}
@keyframes anim_mask {0% {opacity: 0;}}
.pop__ui_child {background: #fbfbfb; border-radius: 12px 12px 0 0; font-size: 14px; overflow: hidden; pointer-events: auto; margin: 0 auto; width: 100%; position: fixed; bottom: 0; left: 0; right: 0;}
.pop__ui_head {font-size: 28upx; font-weight: 700; padding: 30upx; text-align: center;}
.wrap_carts {height: 650upx; overflow: auto;}.wrap_carts .item {padding: 30upx;}.wrap_carts .item .gpic {margin-right: 30upx; height: 50px; width: 50px;}
.wrap_carts .item .ginfo .name {font-size: 28upx;}.wrap_carts .item .ginfo .price {color: #fe2c55; font-size: 28upx; display: block; margin-top: 15upx;}
.wrap_carts .item .gbtn {background: #fe2c55; border-radius: 5upx; color: #fff; font-size: 28upx; padding: 15upx 25upx; line-height: 1;}
.anim-footer {animation: anim_footer .3s;}
@keyframes anim_footer{from{opacity: 0; transform: translateY(100%);} to{opacity: 1; transform: none;}
}
</style>
