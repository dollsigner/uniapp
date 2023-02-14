<template>
	<view class="container">
		<view class="imageFather">
			<image :src="imageURL" mode="heightFix"></image>
		</view>
		<view class="welcome-general" :hidden="hasUserInfo">
			<view>您好！感谢您选择朱雀智投！</view>
			<view>我们可以为您提供：</view>
			<view class="important">--精准用户画像</view>
			<view class="important">--个性化策略制定</view>
			<view class="important">--可视化曲线走势</view>
			<view>只有你想不到的，没有我们做不到的！</view>
		</view>
		<button type="primary" @click="handlerLogin">授权登录</button>
	</view>
	</view>
</template>

<script>
	import {
		reqLogin
	} from '@/api/index.js'

	export default {
		data() {
			return {
				imageURL: "https://s4.ax1x.com/2022/01/06/7SNUoR.jpg"
			}
		},

		methods: {
			handlerLogin() {
				uni.getUserProfile({
					desc: "获取你的昵称、头像、及性别",
					// 授权成功
					success: (res) => {
						const {
							avatarUrl: avatar,
							gender,
							nickName
						} = res.userInfo
						// 检测sessionKey是否过期，若过期则清空本地存储中的sessionKey重新登录
						uni.checkSession({
							success: ()=> {
								
							},
							fail: ()=> {
								uni.clearStorage()
							}
						})

						// 检测sessionKey是否过期，没过期则跳转至个人主页，过期了再次登陆并发起请求
						uni.getStorage({
							key: 'sessionKey',
							success: ()=>{
								uni.switchTab({
									url:'/pages/mine/mine'
								})
							},
							fail: ()=>{
								uni.login({
									success: async (loginRes)=>{
										const code = loginRes.code
										let res = await reqLogin({
											code,
											avatar,
											nickName
										})
										console.log(res)
										uni.setStorage({
											key: 'sessionKey',
											data: res.data.data.sessionKey
										})
										uni.navigateTo({
											url: '/pages/mine/evaluation/evaluation'
										})
									}
								})
							}
						})

					},
					// 授权失败
					fail() {
						uni.showToast({
							title: '授权失败',
							icon: 'error',
							duration: 2000
						})
					}
				})
			}
		},

		mounted() {
			console.log(this.$store)
		}

	}
</script>

<style lang="scss" scoped>
	.imageFather {
		display: flex;
		justify-content: center;
	}

	.imageFather image {
		/* width:1%; */
		width: 360rpx;
		height: 360rpx;
		border-radius: 50%;

	}

	.welcome-general {
		display: block;
		padding-top: 60rpx;
	}

	.welcome-general view {
		display: flex;
		padding: 15rpx;
		font-size: large;
		color: #576B95;
		align-items: center;
		justify-items: center;
	}

	.identify {
		padding-top: 50rpx;
	}

	.userinfo button {
		margin-top: 30rpx;
	}

	.userinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #aaa;
	}

	.userinfo-avatar {
		overflow: hidden;
		width: 128rpx;
		height: 128rpx;
		margin: 20rpx;
		border-radius: 50%;
	}

	.welcome-specific view {
		padding: 30rpx;
		margin: 10rpx;
		font-size: large;
		color: #576B95;
		align-items: center;
		justify-content: center;
		display: flex;
		/*设置显示样式**/
		vertical-align: center;
		/**垂直居中*/
	}
</style>
