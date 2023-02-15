<template>
	<view class="page">
		<view class="top">
			<view class="background"></view>
		</view>
		<!-- 用户头像与电话 -->
		<view class="user-card">
			<view class="card">
				<view class="top">
					<view class="userImage">
						<image class="user_imgurl" mode='widthFix' :src="curUserInfo.avatar"></image>
					</view>
				</view>
				<view class="bottom">
					<view class="left">
						<view class="user-text">
							{{curUserInfo.nickName}}
						</view>
						<view class="user-phone">{{curUserInfo.phoneNumber}} </view>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 用户其它信息 -->
		<view class="list-card" v-for="(item, index) in listCard" :key="index">
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true"
					@close="close(index)" @confirm="confirm($event, index)"></uni-popup-dialog>
			</uni-popup>
			<view class="card" @click="open(index)">
				<view class="item item-bottom-solid">
					<view class="center">
						<text>{{item}}</text>
					</view>
					<view class="right">
						<uni-icons type="forward" size="30"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<!-- 保存 -->
		<view class="list-card">
			<view class="card">
				<view class="item item-bottom-solid">
					<view class="center">
						<button @click="reqUpdate">保存</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 去风险测评 -->
		<view class="list-card">
			<view class="card">
				<view class="item item-bottom-solid">
					<view class="center">
						<button @click="toEvaluation">风险测评</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 退出登陆 -->
		<view class="quit flex-center">
			<view class="btn flex-center" @click="logOut">
				退出登录
			</view>
		</view>
	</view>
</template>


<script>
	import Vue from 'vue'
	import {
		mapState
	} from 'vuex'
	import {
		reqUserDetail,
		reqUpdateDetail
	} from '@/api/index.js'
	import {
		request
	} from '@/api/request.js'

	export default {
		data() {
			return {
				curUserInfo: {
					nickName: "nickname",
					avatar: 'https://s3.bmp.ovh/imgs/2022/11/05/08133ddac3899d58.png',
					description: '这个人很懒，没有留下任何信息',
					email: '1056637702@qq.com',
					gender: 0,
					age: 18,
					phoneNumber: 13257690390,
					riskLevel: this.$store.state.user.userInfo.riskLevel,
					riskScore: this.$store.state.user.userInfo.riskScore,
				},
				listCard: [
					"邮箱：1056637702@qq.com",
					'性别：男',
					'年龄：18',
					'个性签名：这个人很懒，没有留下任何信息',
					'风险等级：稳健型',
					'风险测评分数: 18'
				]
			};
		},

		computed: {
			...mapState(['userInfo'])
		},

		methods: {
			// 跳转到风险测评界面
			toEvaluation() {
				uni.navigateTo({
					url: '/pages/mine/evaluation/evaluation'
				})
			},
			// 打开弹窗
			open(index) {
				console.log('open')
				this.$refs.popup[index].open()
			},
			// 修改成功
			confirm(e, index) {
				// 有内容才修改
				if (e) {
					switch (index) {
						case 0:
							this.curUserInfo.email = e
							break
						case 1:
							if (e == '男') {
								this.curUserInfo.gender = 1
							} else if (e == '女') {
								this.curUserInfo.gender = 0
							} else {
								this.$refs.popup[index].close()
								return ''
							}
							break
						case 2:
							this.curUserInfo.age = e
							break
						case 3:
							this.curUserInfo.description = e
							break
						case 4:
							this.$refs.popup[index].close()
							return ''
							break
						case 5:
							this.$refs.popup[index].close()
							return ''
							break
					}
					Vue.set(this.listCard, index, e)
				}
				this.$refs.popup[index].close()
			},
			// 不修改，直接关闭
			close(index) {
				this.$refs.popup[index].close()
			},
			// 退出登录
			logOut() {
				uni.clearStorage()
				this.$store.commit('LOGOUT')
				console.log('已登出')
				uni.navigateTo({
					url: '/pages/welcome/welcome'
				})
			},
			// 获取用户信息
			async getUserDetail() {
				let sessionKey = uni.getStorageSync('sessionKey')

				let res = await reqUserDetail(sessionKey)
				 console.log(res)
				this.curUserInfo = res.data.data
				//将新请求到的用户信息提交仓库
				this.$store.commit('SETUSERINFO', res.data.data)
				//通过最新请求到的数据渲染个人信息界面
				Vue.set(this.listCard, 0, `邮箱：${this.curUserInfo.email}`)
				Vue.set(this.listCard, 1, `性别：${this.curUserInfo.gender==0?'女':'男'}`)
				Vue.set(this.listCard, 2, `年龄：${this.curUserInfo.age}`)
				Vue.set(this.listCard, 3, `个性签名：${this.curUserInfo.description}`)
				//风险测评分数和风险等级采用仓库中的数据以方便随时修改
				Vue.set(this.listCard, 4, `风险等级：${this.$store.state.user.userInfo.riskLevel}`)
				Vue.set(this.listCard, 5, `风险测评分数：${this.$store.state.user.userInfo.riskScore}`)
			},
			// 更新用户信息
			async reqUpdate() {
				let {
					nickName,
					avatar,
					description,
					email,
					gender,
					age,
					phoneNumber,
					riskLevel,
					riskScore,
				} = this.$store.state.user.userInfo
				let detailParams = {
					nickName,
					avatar,
					description,
					email,
					gender,
					age,
					phoneNumber,
					riskLevel,
					riskScore,
				}
				let sessionKey = uni.getStorageSync('sessionKey')

				let res = await reqUpdateDetail(sessionKey, detailParams)
				console.log(res)

				this.getUserDetail()
			}
		},
		mounted() {
			this.curUserInfo.avatar = this.$store.state.user.userInfo.avatar
			this.curUserInfo.gender = this.$store.state.user.userInfo.gender
			this.curUserInfo.nickName = this.$store.state.user.userInfo.nickName
			this.getUserDetail()
		},
		onShow() {
			this.reqUpdate()

		}
	};
</script>

<style lang="scss" scoped>
	.top {
		height: 250rpx;
		position: relative;

		.background {
			background-color: rgb(87, 107, 149);
			border-bottom-left-radius: 22px;
			border-bottom-right-radius: 22px;
			position: absolute;
			height: 180rpx;
			width: 100%;
		}
	}

	.icon {
		color: #96a1ae;
		font-size: 40rpx;
	}

	.user-card {
		height: 170rpx;
		padding: 0 15px;

		.card {
			position: relative;
			bottom: 62px;
			height: 250rpx;
			background-color: white;
			border-radius: 5px;

			.top {
				height: 30%;
				position: relative;

				.userImage {
					position: absolute;
					bottom: 24%;
					left: 10%;
					width: 150rpx;
					height: 150rpx;
					overflow: hidden;
					border-radius: 50%;
					border: 1px solid white;
				}

				.user_imgurl {
					width: 150rpx;
					height: 150rpx;
				}
			}

			.bottom {
				display: flex;
				height: 70%;

				.left {
					width: 80%;
					height: 100%;
					position: relative;

					.user-text {
						width: 100%;
						font-size: 1.6em;
						padding-left: 80rpx;
						height: 50%;
					}

					.user-phone {
						color: #96a1ae;
						padding-left: 80rpx;
						height: 50%;
						width: 100%;
						font-size: 0.9em;
					}
				}

				.right {
					width: 20%;
					height: 50%;
				}
			}
		}
	}

	.list-card {
		padding: 0 15px;

		.card {
			border-radius: 5px;
			position: relative;
			background-color: white;
			border-radius: 5px;
			padding: 5px 30px;

			.item {
				display: flex;
				height: 120rpx;

				.left {
					width: 15%;

					image {
						width: 70rpx;
						height: 70rpx;
					}
				}

				.center {
					width: 65%;
					display: flex;
					justify-content: start;
					align-items: center;
					font-size: 1.1em;
				}

				.right {
					width: 20%;
					justify-content: flex-end;
				}
			}
		}
	}

	.item-bottom-solid {
		border-bottom: 1px solid #d4d6da;
	}

	.quit {
		height: 100rpx;
		margin-top: 50px;

		.btn {
			background-color: #4f99ff;
			border-radius: 30px;
			width: 40%;
			color: white;
			font-size: 1.2em;
			height: 100%;
		}
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
