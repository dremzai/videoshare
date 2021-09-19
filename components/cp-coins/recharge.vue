 /**
  * @tpl 			充值模板
  * @author 	andy by 2019-10-27
  */
 
<template>
<view v-if="popupVisible" class="popup-footer">
	<view class="pop__ui_panel">
		<view class="pop__ui_mask" @tap="close"></view>
			<view class="pop__ui_child anim-footer">
			<view class="pop__ui_head uni_borB">购买U币</view>
				<view class="pop__ui_body">
					<view class="wrap_coins">
						<swiper :indicator-dots="true" :duration="200" indicator-color="#dbdbdb" indicator-active-color="#999" style="height: 440upx;">
						<swiper-item>
							<view class="coin__cells">
								<view class="item"><view class="rect"><view class="lbl"><text class="num">800</text>优币</view><text class="coin">￥8</text></view></view><view class="item"><view class="rect on"><view class="lbl"><text class="num">1200</text>优币</view><text class="coin">￥12</text></view></view>
						<view class="item"><view class="rect"><view class="lbl"><text class="num">5000</text>优币</view><text class="coin">￥50</text></view></view><view class="item"><view class="rect"><view class="lbl"><text class="num">10000</text>优币</view><text class="coin">￥100</text></view></view>
						<view class="item"><view class="rect"><view class="lbl"><text class="num">10800</text>优币</view><text class="coin">￥108</text></view></view><view class="item"><view class="rect"><view class="lbl"><text class="num">23800</text>优币</view><text class="coin">￥238</text></view></view>
								</view>
					</swiper-item>
					<swiper-item>
					<view class="coin__cells">
						<view class="item"><view class="rect"><view class="lbl"><text class="num">51800</text>优币</view><text class="coin">￥518</text></view></view><view class="item"><view class="rect"><view class="lbl"><text class="num">99800</text>优币</view><text class="coin">￥998</text></view></view>
						<view class="item"><view class="rect"><view class="lbl"><text class="num">199800</text>优币</view><text class="coin">￥1998</text></view></view><view class="item"><view class="rect"><view class="lbl"><text class="num">299800</text>优币</view><text class="coin">￥2998</text></view></view>
									<view class="item"><view class="rect"><view class="lbl"><text class="num">399800</text>优币</view><text class="coin">￥3998</text></view></view><view class="item"><view class="rect"><view class="lbl"><text class="num">699800</text>优币</view><text class="coin">￥6998</text></view></view>
						</view>
							</swiper-item>
						</swiper>
					</view>
			<view class="pop__ui_btns"><text class="btn bg_linear2" @tap="handlePayment">确认支付(10元)</text></view>
		</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {popupVisible: false,
			}
		},
		methods: {
			show() {this.popupVisible = true
			},
			close() {this.popupVisible = false
			},
			handlePayment() {
				// 
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
.wrap_coins {padding: 0 30upx; height: 430upx;}
.wrap_coins .coin__cells {display: flex; flex-wrap: wrap; padding-top: 10upx;}
.coin__cells .item {display: flex; align-items: center; justify-content: center; width: 33.3%;}
.coin__cells .item .rect{background: #f3f3f3; border: 2px solid transparent; border-radius: 5px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 15upx; height: 170upx; width: 220upx;}
.coin__cells .item .rect.on {border-color: #399fff;}.coin__cells .item .lbl {color: #353535; font-size: 24upx;}
.coin__cells .item .lbl .num {color: #353535; font-size: 40upx; font-weight: 700;}.coin__cells .item .coin {color: #999; font-size: 24upx; margin-top: 5px;}.pop__ui_btns {display: flex; flex-direction: column; position: relative;}
.pop__ui_btns .btn {box-sizing: border-box; border-radius: 20px; color: #fff; flex: 1; font-size: 14px; margin: 10px; padding: 0 20px; text-align: center; line-height: 40px; position: relative; z-index: 11;}
.pop__ui_btns .btn:active {opacity: .7;}.anim-footer {animation: anim_footer .3s;}
@keyframes anim_footer{
	from{opacity: 0; transform: translateY(100%);} to{opacity: 1; transform: none;}
}
</style>
