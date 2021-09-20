<template>
	<view class="uni__container flexbox flex_col bg_f7f8f9">
		<view class="uni__scrollview flex1">
			<view class="uni-lgregPanel">
				<view class="lgreg-header">
					<view class="slogan">
						<image src="../../static/logo12.png" style="width: 100px;height: 100px;margin-bottom: 10px;border-radius:15px;opacity:0.8;"></image>
						<text class="text">面向视频</text>
					</view>
					<view class="forms">
						<form @submit.prevent="handleSubmit">
							<view class="item flexbox flex_alignc"><input class="iptxt flex1" type="text"
									v-model="formObj.telephone" placeholder="请输入手机号" placeholder-style="color:#aaa"
									maxlength="11" />
							</view> 
							<view class="item flexbox flex_alignc"><text class="iconfont icon-vcode"></text><input
									class="iptxt flex1" type="text" v-model="formObj.vcode" placeholder="验证码"
									placeholder-style="color:#aaa" /><button class="btn-getcode"
									@click.prevent="handleVcode" :disabled="disabled">{{vcodeText}}</button>
							</view>
							<view class="btns"><button class="uni__btn-primary bg_linear2" type="primary"
									form-type="submit">登录</button>
							</view>
							<view class="lgreg-lk">
								<navigator class="navigator" url="/pages/auth/login">密码登入</navigator>
								<navigator class="navigator" url="/pages/auth/register">注册账号</navigator>
							</view>
						</form>
					</view>
				</view>
				<view class="lgreg-footer"></view>
			</view>
		</view>
		<uni-pop ref="uniPop"></uni-pop>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import util from '../../utils/util.js'
	import Api from '../../utils/requestApi.js'
	export default {
		data() {
			return { 
				formObj: {},
				vcodeText: '获取验证码',
				disabled: false,
				time: 0,
			}
		},
		computed: {
			...mapState(['user', 'token'])
		},
		mounted() {
			if (this.user) {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}
		},
		methods: {
			handleSubmit(e) {
				uni.showLoading();
				let that = this
				let uniPop = this.$refs.uniPop
				if (!this.formObj.telephone) {
					uniPop.show({
						content: '手机号不能为空',
						style: 'background:#353535;color:#fff;',
						time: 2
					})
				} else if (!util.checkTel(this.formObj.telephone)) {
					uniPop.show({
						content: '手机号格式有误',
						style: 'background:#353535;color:#fff;',
						time: 2
					})
				} else if (!this.formObj.password) {
					uniPop.show({
						content: '密码不能为空',
						style: 'background:#353535;color:#fff;',
						time: 2
					})
				} else {
					Api.httpResponse("/stm/api/login/login", 'POST', this.formObj, "json").then(
						res => {
							uni.setStorage({
								key: 'userId',
								data: res.id
							});
							uni.hideLoading();
							// this.$store.commit('SET_TOKEN', util.setToken())
							this.$store.commit('SET_USER', res)

							uni.redirectTo({
								url: '/pages/index/index'
							})
						},
						error => {
							console.log(error);
						}
					)
				}
			},
			handleVcode() {
				let uniPop = this.$refs.uniPop
				if (!this.formObj.tel) {
					uniPop.show({
						content: '手机号不能为空',
						style: 'background:#353535;color:#fff;',
						time: 2
					})
				} else if (!util.checkTel(this.formObj.tel)) {
					uniPop.show({
						content: '手机号格式有误',
						style: 'background:#353535;color:#fff;',
						time: 2
					})
				} else {
					this.time = 60
					this.disabled = true
					this.countDown()
				}
			},
			countDown() {
				if (this.time > 0) {
					this.vcodeText = '获取验证码(' + this.time + ')'
					this.time--
					setTimeout(this.countDown, 1000)
				} else {
					this.vcodeText = '获取验证码'
					this.time = 0
					this.disabled = false
				}
			}
		}
	}
</script>

<style scoped>

</style>
