<template>
	<view>
		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
				activeColor="#4cd964"></uni-segmented-control>
		</view>
		
		<view  v-if="current==1">
			<uni-card v-for="(fund, index) in fundCheckedList" :key="fund.fundId" class="uni-card">
				<view @click="toFundDetail(fund.fundId)">
					<text>基金{{fund.fundId}}</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<uni-number-box v-model="fundsAmount[index]"></uni-number-box>
			</uni-card>
		</view>
		
		<view v-else>
			<uni-card  v-for="(stock, index) in stockCheckedList" :key="stock.stockId" class="uni-card">
				<view @click="toStockDetail(stock.stockId)">
					<text>股票{{stock.stockId}}</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<uni-number-box v-model="amount[index]"></uni-number-box>
			</uni-card>
		</view>
		
		<button @click="confirm">确定</button>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				current: 0,
				items: ['选择股票','选择基金'],
				amount: [],
				fundsAmount: [],
				stockCheckedList: [],
				fundCheckedList: [],
			}
		},
		computed: {
			autoStocks() {
				return this.stockCheckedList.filter((item)=>{
					return item.amount > 0
				})
			},
			autoFunds() {
				return this.fundCheckedList.filter((item)=>{
					return item.amount > 0
				})
			},
			
		},
		methods: {
			toStockDetail(stockId) {
				uni.navigateTo({
					url: `/pages/stockDetail/stockDetail?stockId=${stockId}`
				})
			},
			toFundDetail(fundId) {
				uni.navigateTo({
					url: `/pages/fundDetail/fundDetail?fundId=${fundId}`
				})
			},
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			confirm() {		
				this.stockCheckedList.forEach((item, index) => {
					let obj = {
						stockId: item.stockId,
						amount: this.amount[index]
					}
					Vue.set(this.stockCheckedList, index, obj)
				})
				this.fundCheckedList.forEach((item, index) => {
					let obj = {
						fundId: item.fundId,
						amount: this.fundsAmount[index]
					}
					Vue.set(this.fundCheckedList, index, obj)
				})
				this.$store.commit('SETAUTOFUND', this.selfFunds)
				this.$store.commit('SETAUTOSTOCK', this.selfStocks)
				uni.navigateBack()
				
			}
		},
		onShow() {
			console.log(this.$store)
			this.stockCheckedList = this.$store.state.storage.stockCheckedList
			this.fundCheckedList = this.$store.state.storage.fundCheckedList
			this.stockCheckedList.forEach((item, index) => {
				Vue.set(this.amount, index, item.amount)
				Vue.delete(item, 'isChecked')
			})
			this.fundCheckedList.forEach((item,index)=>{
				Vue.set(this.fundsAmount, index, item.amount)
				Vue.delete(item, 'isChecked')
			})
		},
		onHide() {
			this.$store.commit('SETAUTOFUND', this.autoFunds)
			this.$store.commit('SETAUTOSTOCK', this.autoStocks)
		}
	}
</script>

<style>
	.uni-card{
		height: 200rpx;
	}
</style>