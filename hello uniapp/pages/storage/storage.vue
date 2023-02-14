<template>
	<view class="container">
		<text class="intro">仓库</text>
		<!-- 分段器 -->
		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
				activeColor="#4cd964"></uni-segmented-control>
		</view>
		<!-- 收藏的股票 -->
		<view class="stock" v-show="current == 0">
			<uni-card class="cardContainer" v-for="(stock, index) in stockCheckedList" :key="index"
				:v-show="stock.isChecked==true">
				<view @click="toDetail(stock.stockId)">
					<text>股票{{stock.stockId}}</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view>
				</view>
				<uni-fav :checked="stock.isChecked" @click="onClick(stock)" :v-show="stock.isChecked==true" />
			</uni-card>
		</view>
		
		

		<!-- 收藏的组合 -->
		<view class="stock" v-show="current == 1">
			<uni-card  padding="50rpx" v-for="(combo, index) in myComboList" :key="index" >
				<view @click="toComboDetail">
					<text>{{combo.comboName}}</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view>
					<uni-fav checked="true" @click="" />
				</view>
			</uni-card>
		</view>
		
		<!-- 收藏的基金 -->
		<view class="stock" v-show="current == 2">
			<uni-card class="cardContainer" v-for="(fund, index) in fundCheckedList" :key="index"
				:v-show="fund.isChecked==true">
				<view @click="toFundDetail(fund.fundId)">
					<text>基金{{fund.fundId}}</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view>
				</view>
				<uni-fav :checked="fund.isChecked" @click="onClick(fund)" :v-show="fund.isChecked==true" />
			</uni-card>
		</view>

		<button @click="toAdd()">新增</button>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
import { reqQueryRepo } from '../../api'
	export default {
		data() {
			return {
				stockCheckedList: [],
				comboCheckedList: [],
				myComboList: [],
				fundCheckedList: [],
				items: ['股票', '组合', '基金'],
				current: 0
			}
		},

		computed: {
			// 更新收藏状态，剔除取消收藏的股票与组合

		},

		methods: {
			toAdd() {
				uni.navigateTo({
					url: '/pages/storage/add/add'
				})
			},
			//点击组合跳转到回测页面
			toComboDetail() {
				uni.navigateTo({
					url: '/pages/comboDetail/comboDetail'
				})
			},
			//点击股票跳转到股票详情页面
			toDetail(stockId) {
				uni.navigateTo({
					url: `/pages/stockDetail/stockDetail?stockId=${stockId}`
				})
			},
			//跳转到基金详情页面
			toFundDetail(fundId) {
				uni.navigateTo({
					url: `/pages/fundDetail/fundDetail?fundId=${fundId}`
				})
			},
			// 切换显示股票与组合			
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			// 切换收藏状态
			onClick(stock) {
				stock.isChecked = !stock.isChecked
			},
			// 展示仓库中的组合
			async reqQueryRepo() {
				let sessionKey = uni.getStorageSync('sessionKey')
				let res = await reqQueryRepo(sessionKey)
				console.log(res.data.data)
				let myComboList = res.data.data
				this.myComboList = myComboList
			}
		},

		mounted() {
			
			this.reqQueryRepo()
			this.stockCheckedList = this.$store.state.storage.stockCheckedList
			this.comboCheckedList = this.$store.state.storage.comboCheckedList
			this.fundCheckedList = this.$store.state.storage.fundCheckedList
		},
		// 更新个人仓库收藏的股票与组合
		onHide() {
			console.log('storageHide')
			this.$store.commit('SETSTOCK', this.stockCheckedList)
			this.$store.commit('SETCOMBO', this.comboCheckedList)
			this.$store.commit('SETFUND', this.fundCheckedList)
		},
		onShow() {
			this.stockCheckedList = this.$store.state.storage.stockCheckedList
			this.comboCheckedList = this.$store.state.storage.comboCheckedList
			this.fundCheckedList = this.$store.state.storage.fundCheckedList
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 0;
	}

	.uni-common-mt {
		margin-top: 30px;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		padding: 0px 30px;
	}

	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		height: 150px;
		text-align: center;
	}

	.content-text {
		font-size: 14px;
		color: #666;
	}

	.color-tag {
		width: 25px;
		height: 25px;
	}

	.uni-list {
		flex: 1;
	}

	.uni-list-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		background-color: #FFFFFF;
	}


	.uni-list-item__container {
		padding: 12px 15px;
		width: 100%;
		flex: 1;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #eee;
	}

	.uni-list-item__content-title {
		font-size: 14px;
	}
</style>



</style>
