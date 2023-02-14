<template>
	<view>

		<!-- TODO 轮播图 -->
		<swiper indicator-dots="true" indicator-color="rgba(0,0,0,3)" indicator-active-color="#000000	" autoplay="true"
			circular="true">
			<swiper-item class="swiper">
				<image mode="scaleToFill" src="@/static/images/OIP-C (1).jpg" class="swiper"></image>
			</swiper-item>
			<swiper-item class="swiper">
				<image mode="scaleToFill" src="@/static/images/OIP-C (2).jpg" class="swiper"></image>
			</swiper-item>
			<swiper-item class="swiper">
				<image mode="scaleToFill" src="@/static/images/OIP-C.jpg" class="swiper"></image>
			</swiper-item>
		</swiper>

		<!-- 资讯 -->
		<uni-section title="资讯" type="line">
			<uni-card padding="0" spacing="0">
				<template v-slot:cover>
					<view class="custom-cover">
						<image class="cover-image" mode="scaleToFill" src="@/static/images/OIP-C (2).jpg">
						</image>
						<view class="cover-content">
							<text class="uni-subtitle uni-white">今日新闻热点</text>
						</view>
					</view>
				</template>
				<text>
					123456789
				</text>
			</uni-card>
		</uni-section>

		<!-- 分段器 -->
		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
				activeColor="#4cd964"></uni-segmented-control>
		</view>

		<!-- 股票推荐 -->
		<view class="stock" v-show="current == 0">
			<uni-card v-for="(stock, index) in stockList" :key="index">
				<view @click="toDetail(stock.stockId)">
					<text>股票{{stock.stockId}}</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<uni-fav :checked="stock.isChecked" @click="onClick(stock)" />
			</uni-card>
		</view>

		<!-- 组合推荐 -->
		<view class="stock" v-show="current == 1" :key="index">
			<uni-card v-for="(stock, index) in comboList" :key="index">
				<view @click="toComboDetail">
					<text>组合{{stock.comboId}}</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<uni-fav :checked="stock.isChecked" @click="onClick(stock)" />
			</uni-card>
		</view>

		<!-- 基金推荐 -->
		<view class="stock" v-show="current == 2" :key="index">
			<uni-card v-for="(stock, index) in fundList" :key="index">
				<view @click="toFundDetail(stock.fundId)">
					<text>基金{{stock.fundId}}</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<uni-fav :checked="stock.isChecked" @click="onClick(stock)" />
			</uni-card>
		</view>



	</view>
</template>

<script>
	import {
		reqStock,
		reqFund,
		reqRecommendation
	} from '@/api/index.js'
	import List from '@/components/List/List.vue'

	import Vue from 'vue'
	export default {
		data() {
			return {
				//股票推荐
				stockList: [{
						stockId: '000333',
						isChecked: true
					},
					{
						stockId: '000002',
						isChecked: true
					},
					{
						stockId: '000063',
						isChecked: true
					},
					{
						stockId: '000066',
						isChecked: true
					},
					{
						stockId: '000069',
						isChecked: true
					}
				],
				//组合推荐
	/* 			comboList: [{
						comboId: 1,
						isChecked: true
					},
					{
						comboId: 2,
						isChecked: true
					},
					{
						comboId: 3,
						isChecked: true
					},
					{
						comboId: 4,
						isChecked: true
					},
					{
						comboId: 5,
						isChecked: true
					}
				], */
				comboList: [{
					comboId: 1,
					isChecked: false
				}],
				
				//基金推荐
				fundList: [{
						fundId: '000001',
						isChecked: true
					},
					{
						fundId: '000003',
						isChecked: true
					},
					{
						fundId: '000004',
						isChecked: true
					},
					{
						fundId: '000005',
						isChecked: true
					},
					{
						fundId: '000006',
						isChecked: true
					}
				],
				// 现在展示的选项卡
				items: ['股票', '组合', '基金'],
				current: 0
			}
		},

		computed: {
			//计算出收藏的股票列表
			stockCheckedList() {
				return this.stockList.filter((stock) => {
					return stock.isChecked == true
				})
			},
			//计算出收藏的组合列表
			comboCheckedList() {
				return this.comboList.filter((combo) => {
					return combo.isChecked == true
				})
			},
			fundCheckedList() {
				return this.fundList.filter((fund) => {
					return fund.isChecked == true
				})
			}
		},

		methods: {
			//点击股票跳转到股票详情页面
			toDetail(stockId) {
				uni.navigateTo({
					url: `/pages/stockDetail/stockDetail?stockId=${stockId}`
				})
			},

			//点击组合跳转到组合页面
			toComboDetail() {
				uni.navigateTo({
					url: '/pages/comboDetail/comboDetail'
				})
			},

			//点击基金跳转到基金详情页面
			toFundDetail(fundId) {
				uni.navigateTo({
					url: `/pages/fundDetail/fundDetail?fundId=${fundId}`
				})
			},

			// 切换收藏状态
			onClick(stock) {
				stock.isChecked = !stock.isChecked
			},

			//切换显示股票/基金/组合
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex
				}
			},

			//发送请求请求推荐的股票和基金列表
			async reqRecommendation() {
				let sessionKey = uni.getStorageSync('sessionKey')
				let res = await reqRecommendation(sessionKey)

				
				let fundList = res.data.data.fund
				let stockList = res.data.data.stocks
				let newFundList = fundList.map((item) => {
					return {
						fundId: item,
						isChecked: false
					}
				})
				let newStockList = stockList.map((item) => {
					return {
						stockId: item,
						isChecked: false
					}
				})
			
				this.fundList = newFundList
				this.stockList = newStockList

			},

			//监听页面初次渲染完成
			onReady() {
				this.reqRecommendation()

			},

			// 监听页面隐藏
			onHide() {
				console.log('Hide')
				this.$store.commit('SETSTOCK', this.stockCheckedList)
				this.$store.commit('SETCOMBO', this.comboCheckedList)
				this.$store.commit('SETFUND', this.fundCheckedList)
			},

			onShow() {

			}
		},
	}
</script>

<style lang="scss" scoped>
	.swiper {
		width: 780rpx;
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
