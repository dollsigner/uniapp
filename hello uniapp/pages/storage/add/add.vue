<template>
	<view class="main">
		<uni-section title="输入自定义组合名字" type="line">
			<div class="inputContanier">
				<input v-model="comboDetail.comboName"/>
			</div>	
		</uni-section>
		<div class="space"></div>
		<uni-section title="输入总金额" type="line">
			<div class="inputContanier-small">
				<uni-number-box v-model="comboDetail.totalAmount"></uni-number-box>
			</div>	
		</uni-section>
		<div class="space"></div>
		<div class="space"></div>
		<uni-section title="调整各部分比例" type="line">
			<view class="ratio">
				<text @click="toAddSelf()">自投比例</text><slider :block-size="18" :show-value="true" :value="comboDetail.selfRatio" @change="setPercent($event, 'selfRatio')"></slider>
				<text @click="toAddAuto()">机投比例</text><slider :block-size="18" :show-value="true" :value="comboDetail.autoRatio" @change="setPercent($event, 'autoRatio')"></slider>
				<text>固投比例</text><slider :block-size="18" :show-value="true" :value="comboDetail.depositRatio" @change="setPercent($event, 'depositRatio')"></slider>
			</view>
		</uni-section>
		<button @click="addCombo">确定</button>

	</view>
</template>

<script>
	import {reqAddCombo} from '../../../api/index.js'
	export default {
		data() {
			return {
				// 收藏的股票
				stockCheckedList: [],
				//收藏的组合,后面用于更新
				comboCheckedList: [],
				//收藏的基金
				fundCheckedList: [],
				//各部分百分比总数，不能大于100
				percentSum: 100,
				//组合属性
				comboDetail: {
					comboName: '组合示例1',
					totalAmount: '组合总金额',
					selfRatio: 0,
					autoRatio: 0,
					depositRatio: 0,
					selfStocks: [],
					selfFunds: [],
					autoStockRatio: '机投股票占比',
					autoFundRatio: '机投基金占比',
					autoStocks: [],
					autoFunds: [],
				}
				
			}
		},

		computed: {
			// 计算出新增的组合内含有的股票列表
			stockInCombo() {
			}
		},

		methods: {
			async reqAddCombo(newCombo){
				let sessionKey = uni.getStorageSync('sessionKey')
				let res = await reqAddCombo(sessionKey, newCombo)
				console.log(res)
			},
					
			toAddSelf() {
				uni.navigateTo({
					url: '/pages/storage/add/addSelf/addSelf'
				})
			},
			toAddAuto() {
				uni.navigateTo({
					url: '/pages/storage/add/addAuto/addAuto'
				})
			},
			//点击查看股票详情数据
			toStockDetail(stockId){
				uni.navigateTo({
					url: `/pages/stockDetail/stockDetail?stockId=${stockId}`
				})
			},
				
			//改变各比例占比
			setPercent(e, target) {
				var temp = 0
				switch(target){
					case 'selfRatio':
						temp = this.comboDetail.selfRatio
						break
					case 'autoRatio':
						temp = this.comboDetail.autoRatio
						break
					case 'depositRatio':
						temp = this.comboDetail.depositRatio
						break
				}	
				// 判断是增是减
				var changeNum = 0			
				if (this.percentSum - e.detail.value < 0) {
					e.detail.value = this.percentSum
					//e.detail.value超出，changeNum中的e.detail.value应取最后修正过的
					changeNum = temp - e.detail.value
					temp = this.percentSum
				} else {
					////e.detail.value未超出，changeNum中的e.detail.value即为e.detail.value
					changeNum = temp - e.detail.value
					temp = e.detail.value
				}
				switch(target){
					case 'selfRatio':
						this.comboDetail.selfRatio = temp
						break
					case 'autoRatio':
						this.comboDetail.autoRatio = temp
						break
					case 'depositRatio':
						this.comboDetail.depositRatio = temp
						break
				}	
				this.percentSum = this.percentSum + changeNum
			},
			
			//确定新增组合
			addCombo() {
				this.comboDetail.selfStocks = this.$store.state.storage.selfStocks
				this.comboDetail.selfFunds = this.$store.state.storage.selfFunds
				this.comboDetail.autoStocks = this.$store.state.storage.autoStocks
				this.comboDetail.autoStocks = this.$store.state.storage.autoStocks
				let newCombo = {
					comboName: this.comboDetail.comboName,
					totalAmount: this.comboDetail.totalAmount,
					selfRatio: this.comboDetail.selfRatio,
					autoRatio: this.comboDetail.autoRatio,
					depositRatio: this.comboDetail.depositRatio,
					selfStocks: this.comboDetail.selfStocks,
					selfFunds: this.comboDetail.selfFunds,
					autoStockRatio: 50,
					autoFundRatio: 50,
					autoStocks: this.comboDetail.autoStocks,
					autoFunds: this.comboDetail.autoFunds,
				}
				this.reqAddCombo(newCombo)
				
				//跳转回仓库页面
				uni.switchTab({
					url: '/pages/storage/storage'
				})
			}
		},

		onShow() {
			// 初始化收藏的股票列表与组合列表
			console.log(this.$store)
			this.stockCheckedList = this.$store.state.storage.stockCheckedList
			this.comboCheckedList = this.$store.state.storage.comboCheckedList
			this.fundCheckedList = this.$store.state.storage.fundCheckedList
			// 初始化股票列表中的percent
			this.stockCheckedList.forEach((item, index) => {
				item.amount = 0
			})
			this.fundCheckedList.forEach((item,index)=>{
				item.amount = 0
			})
		},
		onHide() {
			// 将新增的自定义组合提交仓库
			this.$store.commit('SETCOMBO', this.comboCheckedList)
		}
	}
</script>

<style>
	.main{
		background-color: white;
	}
	
	.ratio{
		width: 50%;
	}
	
	.space{
		height: 50rpx;
		background-color: white;
	}
	
	.inputContanier{
		position: absolute;
		left: 40rpx;
		height: 50rpx;
		border-radius: 10%;
		background-color: antiquewhite;
	}
	
	.inputContanier-small{
		position: absolute;
		left: 40rpx;
		height: 50rpx;
		border-radius: 10%;
		background-color: antiquewhite;
	}
	
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
