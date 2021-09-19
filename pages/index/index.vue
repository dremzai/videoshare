/**
 * @tpl 首页模板
 */

<template>
	<view class="uni__container flexbox flex_col">
		<header-bar v-if="currentTabIndex == 0" :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}">
			<view slot="headerL" class="uni_btnIco flexbox" @tap="handleTopNav(0)"><text class="fs_14" :class="[currentNavIndex == 0 ? 'fs_20 bold' : '']">最新推荐</text></view>
			<view slot="headerL" class="uni_btnIco flexbox" @tap="handleTopNav(1)"><text class="fs_14" :class="[currentNavIndex == 1 ? 'fs_20 bold' : '']">我参于的</text></view>
			<view slot="headerL" class="uni_btnIco flexbox" @tap="handleTopNav(2)"><text class="fs_14" :class="[currentNavIndex == 2 ? 'fs_20 bold' : '']">我创建的</text><text class="uni_badge" style="position: absolute;top:0;right:-5upx;">1</text></view>
			<!-- <text slot="iconfont" class="uni_btnIco iconfont icon-sousuo"></text> -->
			<text slot="iconfont" class="uni_btnIco iconfont icon-fabu" @tap="handlePublish"></text>
		</header-bar>
		<header-bar v-else-if="currentTabIndex == 1" :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}">
			<view slot="headerL" class="uni_btnIco flexbox"><text class="fs_20 bold">推荐</text></view>
			<view slot="headerL" class="uni_btnIco flexbox"><text class="fs_14">我的</text></view>
			<text slot="iconfont" class="uni_btnIco iconfont icon-tianjia"></text>
		</header-bar>
		<header-bar v-else-if="currentTabIndex == 2" :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}">
			<view slot="headerL" class="uni_btnIco flexbox"><text class="fs_20 bold">消息 (15)</text></view>
			<!-- <text slot="iconfont" class="uni_btnIco iconfont icon-clear"></text>
			<text slot="iconfont" class="uni_btnIco iconfont icon-haoyou" @tap="GoContact"></text> -->
		</header-bar>
		<header-bar v-else-if="currentTabIndex == 3" :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}"><view slot="headerL" class="uni_btnIco flexbox"><text class="fs_20 bold">我</text></view>
		<!-- <text slot="iconfont" class="uni_btnIco iconfont icon-tab03" @tap="handleDropMenu"></text> -->
		</header-bar>
		<header-bar v-else :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}"><text slot="iconfont" class="uni_btnIco iconfont icon-shezhi"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<block v-if="currentTabIndex == 0">
				<view v-if="currentNavIndex == 0" class="uni__nearDynamics">
					<view class="fz_container">
						<view class="fz_item flexbox uni__material" @longpress="handleDynamicMenu"><image class="fzitem_avator" src="/static/uimg/u__chat_img9.jpg" mode="aspectFill" />
							<view class="fzitem_content flex1">
								<text class="fz_user">孤独伊人💋</text><view class="mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>24</view><view class="uni-vip v1 ml_5">VIP2</view>
								</view>
								<view class="fz_cnts">这一天天时间过的好快啊...</view><view class="fz_photos"><image class="fz_img_auto" src="/static/placeholder/placeholder-img5.jpg" mode="aspectFill" />
								</view>
								<view class="fz_foot flexbox flex_alignc">
									<view class="flex1"><text class="fz_time">19分钟前</text><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>1.12km</view><text class="c_bbb fs_12 ml_10">158阅读</text>
									</view>
									<text class="iconfont icon-xihuan"></text><text class="iconfont icon-pinglun ml_15"></text>
								</view>
							</view>
						</view>
						<view class="fz_item flexbox uni__material" @longpress="handleDynamicMenu"><image class="fzitem_avator" src="/static/uimg/u__chat_img5.jpg" mode="aspectFill" />
							<view class="fzitem_content flex1">
						<text class="fz_user">往后余生都是你</text>
							<view class="mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>21</view>
							</view><view class="fz_cnts">😍听说你很孤独</view>
								<view class="fz_photos"><image class="fz_img" src="/static/uimg/u__chat_img12.jpg" mode="aspectFill" /><image class="fz_img" src="/static/uimg/u__chat_img13.jpg" mode="aspectFill" />
								</view>
							<view class="fz_foot flexbox flex_alignc"><view class="flex1">
							<text class="fz_time">36分钟前</text><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>0.64km</view><text class="c_bbb fs_12 ml_10">237阅读</text>
									</view>
							<text class="iconfont icon-xihuan"></text><text class="iconfont icon-pinglun ml_15"></text>
								</view>
							</view>
						</view>
						<view class="fz_item flexbox uni__material" @longpress="handleDynamicMenu"><image class="fzitem_avator" src="/static/uimg/u__chat_img14.jpg" mode="aspectFill" />
							<view class="fzitem_content flex1"><text class="fz_user">小样</text>
						<view class="mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>25</view><view class="uni-vip v3 ml_5">VIP3</view>
								</view>
								<view class="fz_cnts">腰酸背痛的一日😶</view><view class="fz_foot flexbox flex_alignc">
							<view class="flex1"><text class="fz_time">55分钟前</text><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>1.67km</view><text class="c_bbb fs_12 ml_10">15阅读</text>
							</view><text class="iconfont icon-xihuan"></text><text class="iconfont icon-pinglun ml_15"></text>
						</view>
					</view>
						</view>
					</view>
				</view>
				<view v-if="currentNavIndex == 1" class="uni__nearPeoples">
					<view class="uni__listview"><view class="item uni__list uni__material" @tap="GoUhome">
							<view class="avator"><image src="/static/uimg/u__chat_img1.jpg" mode="widthFix" /><text class="uni_badge uni_badge_dot"></text></view><view class="uinfo flex1">
								<view class="name ellipsis">猪猪佩奇</view><view class="subinfo ellipsis"><view class="uni-age"><text class="iconfont icon-nv"></text>24</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>0.15km</view></view><view class="subtxt ellipsis">想着你的笑，想着你的阳光幽默和帅气外形。</view>
							</view><view class="time flex_selft">在线</view>
						</view><view class="item uni__list uni__material" @tap="GoUhome"><view class="avator"><image src="/static/uimg/u__chat_img12.jpg" mode="widthFix" /></view>
							<view class="uinfo flex1"><view class="name ellipsis">Alisa</view><view class="subinfo ellipsis"><view class="uni-age"><text class="iconfont icon-nv"></text>18</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>0.68km</view></view><view class="subtxt ellipsis">签名：心情不错，冒个泡~</view>
							</view><view class="time flex_selft">25分钟前</view>
						</view><view class="item uni__list uni__material" @tap="GoUhome">
							<view class="avator"><image src="/static/uimg/u__chat_img15.jpg" mode="widthFix" /><text class="uni_badge uni_badge_dot"></text></view>
							<view class="uinfo flex1"><view class="name ellipsis">一生有你</view><view class="subinfo ellipsis"><view class="uni-age male"><text class="iconfont icon-nan"></text>23</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>1.76km</view></view>
					<view class="subtxt ellipsis">印记：刚上线，附近有人吗</view></view><view class="time flex_selft">在线</view>
						</view>
						<view class="item uni__list uni__material" @tap="GoUhome"><view class="avator"><image src="/static/uimg/u__chat_img9.jpg" mode="widthFix" /></view>
							<view class="uinfo flex1"><view class="name ellipsis">孤独伊人💋</view><view class="subinfo ellipsis"><view class="uni-age"><text class="iconfont icon-nv"></text>26</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>0.32km</view></view>
					<view class="subtxt ellipsis">印记：她现在单身</view>
							</view><view class="time flex_selft">昨天 15:28</view>
						</view><view class="item uni__list uni__material" @tap="GoUhome">
							<view class="avator"><image src="/static/uimg/u__chat_img25.jpg" mode="widthFix" /></view><view class="uinfo flex1">
					<view class="name ellipsis">逗你玩</view><view class="subinfo ellipsis"><view class="uni-age male"><text class="iconfont icon-nan"></text>28</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>1.26km</view></view><view class="subtxt ellipsis">签名：欢迎联系</view>
							</view><view class="time flex_selft">6分钟前</view>
						</view><view class="item uni__list uni__material" @tap="GoUhome"><view class="avator"><image src="/static/uimg/u__chat_img5.jpg" mode="widthFix" /><text class="uni_badge uni_badge_dot"></text></view>
							<view class="uinfo flex1"><view class="name ellipsis">往后余生都是你</view>
					<view class="subinfo ellipsis"><view class="uni-age"><text class="iconfont icon-nv"></text>21</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>0.93km</view></view><view class="subtxt ellipsis">签名：多一点真诚，少一点套路</view>
							</view>
					<view class="time flex_selft">在线</view></view>
					</view>
				</view>
				<view v-if="currentNavIndex == 2" class="uni__attentions">
					<view class="uni__listview"><view class="item uni__list uni__material" @tap="GoUhome" @longpress="handleAttentionMenu">
							<view class="avator"><image src="/static/uimg/u__chat_img35.jpg" mode="widthFix" /></view><view class="uinfo flex1">
								<view class="name ellipsis">小蛮腰</view><view class="subinfo ellipsis mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>21</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>郑州</view></view>
							</view><view class="btn bg_linear1">关注</view>
						</view><view class="item uni__list uni__material" @tap="GoUhome" @longpress="handleAttentionMenu"><view class="avator"><image src="/static/uimg/u__chat_img3.jpg" mode="widthFix" /></view>
							<view class="uinfo flex1"><view class="name ellipsis">素颜自然美</view><view class="subinfo ellipsis mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>18</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>深圳</view></view>
							</view><view class="btn cancel">取消关注</view>
						</view><view class="item uni__list uni__material" @tap="GoUhome" @longpress="handleAttentionMenu"><view class="avator"><image src="/static/uimg/u__chat_img29.jpg" mode="widthFix" /></view>
							<view class="uinfo flex1"><view class="name ellipsis">如此的依赖</view><view class="subinfo ellipsis mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>27</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>0.29km</view></view>
							</view><view class="btn cancel">取消关注</view>
						</view><view class="item uni__list uni__material" @tap="GoUhome" @longpress="handleAttentionMenu"><view class="avator"><image src="/static/uimg/u__chat_img22.jpg" mode="widthFix" /></view><view class="uinfo flex1"><view class="name ellipsis">美婷</view><view class="subinfo ellipsis mt_5"><view class="uni-age"><text class="iconfont icon-nv"></text>23</view><view class="uni-distance ml_10"><text class="iconfont icon-dingwei"></text>大理</view></view>
							</view><view class="btn cancel">取消关注</view></view>
					</view>
				</view>
			</block>
			<block v-else-if="currentTabIndex == 1">
				<uvideo />
			</block>
			
			<block v-else-if="currentTabIndex == 2">
				<view class="uni__listview bg_fff" style="padding: 10upx 30upx 20upx;"><view class="uni__list" style="background: #ebebeb;border-radius: 50upx;"><text class="iconfont icon-sousuo c_999 mr_15"></text><input class="searIpt flex1 fs_14" type="text" placeholder="搜索" />
					</view>
				</view>
				<view class="uni__recordChat-list"><view class="uni__listview">
				<view class="item uni__list uni__material" @tap="GoPrivateChat" @longpress="uniMsgMenu"><view class="avator"><image src="/static/uimg/u__chat_img1.jpg" mode="widthFix" /></view>
					<view class="msginfo flex1"><view class="title ellipsis">猪猪佩奇</view><view class="subtitle ellipsis">[守护之心]</view></view><view class="time flex_selft">11:42</view><text class="uni_badge">15</text>
				</view>
				<view class="item uni__list uni__material" @tap="GoPrivateChat" @longpress="uniMsgMenu"><view class="avator"><image src="/static/logo.png" mode="widthFix" /></view>
					<view class="msginfo flex1"><view class="title ellipsis">UniApp互动群</view><view class="subtitle ellipsis">欢迎来到Uni直播互动交流群，分享交流最新的逗比趣事。</view>
				</view><view class="time flex_selft">09:36</view><text class="uni_badge uni_badge_dot"></text>
						</view>
				<view class="item uni__list uni__material" @tap="GoPrivateChat" @longpress="uniMsgMenu">
					<view class="avator"><image src="/static/uimg/u__chat_img14.jpg" mode="widthFix" /></view>
					<view class="msginfo flex1"><view class="title ellipsis">Aladon</view><view class="subtitle ellipsis">生活的琐粹让我们痛并快乐着</view>
					</view><view class="time flex_selft">5天前</view>
						</view>
						<view class="item uni__list uni__material" @tap="GoPrivateChat" @longpress="uniMsgMenu">
					<view class="avator"><image src="/static/uimg/u__chat_img5.jpg" mode="widthFix" /></view><view class="msginfo flex1">
					<view class="title ellipsis">往后余生都是你</view><view class="subtitle ellipsis">Hi 晚上一起来Happy鸭~</view>
					</view><view class="time flex_selft">10月19日</view></view>
					</view>
				</view>
			</block>
			
			<!-- 直播 -->
		<!-- 	<block v-else-if="currentTabIndex == 3">
				<ulive />
			</block> -->
			
			<!-- 我的 -->
			<block v-else>
				<ucenter />
			</block>
		</view>
		
		<tab-bar :current="currentTabIndex" backgroundColor="#fff" color="#999" tintColor="#2cc6e0" @click="handleTabbar"></tab-bar>
		<uni-pop ref="uniPop"></uni-pop>
		<popup-window ref="popupWindow" />
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import ucenter from '@/pages/ucenter'
	import uvideo from '@/pages/uVideo'
	import ulive from '@/pages/uLive'
	export default {
		data() {
			return {currentNavIndex: 0,currentTabIndex: 0
			}
		},
		components: {ucenter, uvideo, ulive
		},
		computed: {...mapState(['user', 'token'])
		},
		mounted(){if(!this.user){uni.redirectTo({url: '/pages/auth/login'})
			}
		},
		methods: {
		handleDropMenu() {this.$refs.popupWindow.show()
			},
		handleTopNav(index) {this.currentNavIndex = index
			},
			handleTabbar(index) {this.currentTabIndex = index
			},
			
			GoUhome() {uni.navigateTo({url: '/pages/ucenter/uhome'})
			},
			handlePublish() {uni.navigateTo({url: '/pages/uZone/publish'})
			},GoContact() {uni.navigateTo({url: '/pages/contact/index'})
			},GoPrivateChat() {uni.navigateTo({url: '/pages/chat/privateChat/chat'})
			},
			
			// 长按动态
			handleDynamicMenu() {
			let uniPop = this.$refs.uniPop
			uniPop.show({skin: 'androidSheet',
			btns: [{text: '不感兴趣'},{text: '复制'},
				{text: '举报',onTap() {uniPop.close()
					}
						}
					]
				})
			},
			handleAttentionMenu() {
			let uniPop = this.$refs.uniPop
			uniPop.show({skin: 'androidSheet',btns: [{text: '拉黑TA'},
				{text: '删除',
				onTap() {
					uniPop.close()
					}
						}
					]
				})
			},
			uniMsgMenu() {
				let uniPop = this.$refs.uniPop
				uniPop.show({skin: 'androidSheet',
				btns: [{text: '删除对话',onTap() {
					uniPop.close()
					}
				}]})
			}
		}
	}
</script>

<style>
</style>
