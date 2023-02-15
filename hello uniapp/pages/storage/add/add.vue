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
				<input v-model="comboDetail.totalAmount"/>
			</div>	
		</uni-section>
		<div class="space"></div>
		<div class="space"></div>

		
		<uni-section title="调整各部分比例" type="line">
			<view class="ratio">
				<text @click="openSelf()">自投比例</text><slider :block-size="18" :show-value="true" :value="comboDetail.selfRatio" @change="setPercent($event, 'selfRatio')"></slider>
				<text>机投比例</text><slider :block-size="18" :show-value="true" :value="comboDetail.autoRatio" @change="setPercent($event, 'autoRatio')"></slider>
				<text>固投比例</text><slider :block-size="18" :show-value="true" :value="comboDetail.depositRatio" @change="setPercent($event, 'depositRatio')"></slider>
			</view>
			
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog title="请选择自投股票" mode="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm">
					<scroll-view scroll-y="true">
						<uni-card v-for="(stock, index) in stockCheckedList" :key="index">
							<view @click="toStockDetail(stock.stockId)">
								<text>股票{{stock.stockId}}</text>
								<uni-icons type="forward" size="20"></uni-icons>
							</view>
							<!-- <text>请输入数量</text> -->
							<input class="inputContanier-small" v-model="stockCheckedList[index]"><input />
						</uni-card>
					</scroll-view>
				</uni-popup-dialog>
			</uni-popup>
			
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
				//各部分百分比总数，不能大于100
				percentSum: 100,
				//组合属性
				comboDetail: {
					comboName: '组合示例1',
					totalAmount: '组合总金额',
					selfRatio: 0,
					autoRatio: 0,
					depositRatio: 0,
					selfStocks:'[] 自投股票详情',
					selfFunds: '[] 自投基金详情',
					autoStockRatio: '机投股票占比',
					autoFundRatio: '机投基金占比',
					autoStocks:'[] 机投股票详情',
					autoFunds:'[] 机投基金详情',
				}
				
			}
		},

		computed: {
			// 计算出新增的组合内含有的股票列表
			stockInCombo() {
			}
		},

		methods: {
			openSelf(){
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			confirm() {
				this.$refs.popup.close()
			},
			
			//点击查看股票详情数据
			toStockDetail(stockId){
				uni.navigateTo({
					url: `/pages/stockDetail/stockDetail?stockId=${stockId}`
				})
			},
			//改变股票百分比并减少percentSum，当percentSum小于0时不可改变
			/* setStockPercent(e, stock) {
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
			 */			
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
