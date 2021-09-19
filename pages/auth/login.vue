
<template>	
	<view class="uni__container flexbox flex_col bg_f7f8f9">
	<view class="uni__scrollview flex1"><view class="uni-lgregPanel">
		<view class="lgreg-header">
			<view class="slogan"><text class="ico-zb iconfont icon-Icon-zhibozhong"></text><text class="text">Uni-liveShow直播室</text>
					</view><view class="forms"><form @submit.prevent="handleSubmit">
					<view class="item flexbox flex_alignc"><input class="iptxt flex1" type="text" v-model="formObj.tel" placeholder="请输入手机号/ID" placeholder-style="color:#aaa" maxlength="11" />
							</view><view class="item flexbox flex_alignc"><input class="iptxt flex1" type="text" password="true" v-model="formObj.pwd" placeholder="请输入密码" placeholder-style="color:#aaa" />
				</view><view class="btns"><button class="uni__btn-primary bg_linear2" type="primary" form-type="submit">登录</button>
				</view><view class="lgreg-lk"><navigator class="navigator" url="#">忘记密码</navigator><navigator class="navigator" url="/pages/auth/register">注册账号</navigator>
			</view>
		</form></view></view><view class="lgreg-footer"></view>
			</view>
		</view>
		<uni-pop ref="uniPop"></uni-pop>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import util from '../../utils/util.js'
	export default {
		data() {return {formObj: {},
			}
		},
		computed: {...mapState(['user', 'token'])},
		mounted() {if(this.user){uni.redirectTo({url: '/pages/index/index'})}
		},
		methods: {
		handleSubmit(e) {
			let that = this
			let uniPop = this.$refs.uniPop
				if(!this.formObj.tel) {uniPop.show({content: '手机号不能为空', style: 'background:#353535;color:#fff;', time: 2})
			}else if(!util.checkTel(this.formObj.tel)) {uniPop.show({content: '手机号格式有误', style: 'background:#353535;color:#fff;', time: 2})
				}else if(!this.formObj.pwd) {uniPop.show({content: '密码不能为空', style: 'background:#353535;color:#fff;', time: 2})
			}else {
				this.$store.commit('SET_TOKEN', util.setToken())
				this.$store.commit('SET_USER', this.formObj.tel)
				uniPop.show({content: '登录成功，跳转中...', style: 'background:#41a863;color:#fff;', time: 2, shadeClose: false,end: function(){uni.redirectTo({url: '/pages/index/index'})
				}
			})
				}
			}
		}
	}
</script>

<style scoped>

</style>