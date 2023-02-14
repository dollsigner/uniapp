<template>
	<view>
		<uni-section title="输入自定义组合名字" type="line">
			<input v-model="comboId"/>
		</uni-section>
		<view class="stock">
			<uni-card class="cardContainer" v-for="(stock, index) in stockCheckedList" :key="index">
				<view @click="toDetail(stock.stockId)">
					<text @click="toStockDetail(stock.stockId)">股票{{stock.stockId}}</text>
				</view>
				<!-- 收集每只股票占组合的百分比 -->
				<uni-fav :checked="stock.isChecked" />
				<slider show-value="true" :disabled="(percentSum==0&&stock.percent==0)"
					@change="setStockPercent($event, stock)" :value="stock.percent"></slider>
			</uni-card>
		</view>
		
		<uni-section>
			<view class="ratio">
				<text>自投比例</text><slider :block-size="18" :show-value="true" @change="setPercent($event, 'self')"></slider>
				<text>机投比例</text><slider :block-size="18" :show-value="true" @change="setPercent($event, 'auto')"></slider>
				<text>固投比例</text><slider :block-size="18" :show-value="true" @change="setPercent($event, 'deposit')"></slider>
			</view>
		</uni-section>
		<button @click="addCombo">确定</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 收藏的股票
				stockCheckedList: [],
				//收藏的组合,后面用于更新
				comboCheckedList: [],
				//股票百分比总数，不能大于100
				percentSum: 100,
				//组合属性
				comboDetail: {
					comboName: '组合示例1',
					totalAmount: '组合总金额',
					selfRatio: '自投比例',
					autoRatio: '系统优化占比',
					depositRatio: '固定投资占比',
					selfStocks:'[] 自投股票详情',
					selfFunds: '[] 自投基金详情',
					autoStockRatio: '机投股票占比',
					autoFundRatio: '机投基金占比',
					autoStocks:'[] 机投股票详情',
					autoFunds:'[] 机投基金详情',
					depositRatio: '固定投资占比',
				}
				
			}
		},

		computed: {
			// 计算出新增的组合内含有的股票列表
			stockInCombo() {
			}
		},

		methods: {
			//点击查看股票详情数据
			toStockDetail(stockId){
				uni.navigateTo({
					url: `/pages/stockDetail/stockDetail?stockId=${stockId}`
				})
			},
			//改变股票百分比并减少percentSum，当percentSum小于0时不可改变
			setStockPercent(e, stock) {
				console.log(e.detail)
				// 判断是增是减
				var changeNum = 0

				if (this.percentSum - e.detail.value < 0) {
					e.detail.value = this.percentSum
					//e.detail.value超出，changeNum中的e.detail.value应取最后修正过的
					changeNum = stock.percent - e.detail.value
					stock.percent = this.percentSum
				} else {
					////e.detail.value未超出，changeNum中的e.detail.value即为e.detail.value
					changeNum = stock.percent - e.detail.value
					stock.percent = e.detail.value
				}
				this.percentSum = this.percentSum + changeNum
			},
			//确定新增组合
			addCombo() {
				let stockInCombo = this.stockCheckedList.filter((stock) => {
					return stock.percent > 0
				})
				console.log(stockInCombo)
				
				let newCombo = {
					comboId: this.comboId,
					isChecked: true,
					stockList: stockInCombo
				}
				this.comboCheckedList.push(newCombo)
				//跳转回仓库页面
				uni.switchTab({
					url: '/pages/storage/storage'
				})
			}
		},

		onShow() {
			// 初始化收藏的股票列表与组合列表
			this.stockCheckedList = this.$store.state.storage.stockCheckedList
			this.comboCheckedList = this.$store.state.storage.comboCheckedList
			// 初始化股票列表中的percent
			this.stockCheckedList.forEach((item, index) => {
				item.percent = 0
			})
		},
		onHide() {
			// 将新增的自定义组合提交仓库
			this.$store.commit('SETCOMBO', this.comboCheckedList)
		}
	}
</script>

<style>
	.ratio{
		width: 50%;
	}
	
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
