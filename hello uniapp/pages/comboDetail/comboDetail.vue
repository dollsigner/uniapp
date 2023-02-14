<template>
	<view>
		<uni-section type="line" title="组合详情"></uni-section>
		<view>
			<uni-card>
				<view @click="toDetail(stock.stockId)">
					<view>{{comboDetail.comboName}}</view>
					<view>{{comboDetail.totalAmount}}</view>
					<view>{{comboDetail.selfRatio}}</view>
					<view>{{comboDetail.autoRatio}}</view>
					<view>{{comboDetail.depositRatio}}</view>
				</view>
			</uni-card>
			
			<uni-section title="确定回测日期" type="line" padding>
				<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
			</uni-section>	
		
			<uni-section title="确定金额" type="line" padding>
				<uni-easyinput errorMessage v-model="value" focus placeholder="请输入金额" @input="input"></uni-easyinput>
			</uni-section>
			
			<button @click="backset">回测</button>
		</view>
		
		<!-- 回测图表 -->
		<view class="charts-box">
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartData: {},
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					legend: {},
					xAxis: {
						disableGrid: true,
						labelCount: 3,
						fontSize: 8
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						line: {
							type: "straight",
							width: 2,
							activeType: "hollow"
						}
					}
				},
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
		methods: {
			backset() {
				this.getServerData()
			},
			getServerData() {
				//模拟从服务器获取数据时的延时
				let res = {
					categories: ["2017-01-03", "2017-01-04", "2017-01-05", "2017-01-06", "2017-01-07",
						"2017-01-08", "2017-01-09", "2017-01-10", "2017-01-11", "2017-01-12",
						"2017-01-13", "2017-01-14", "2017-01-15", "2017-01-16", "2017-01-17"
					],
					series: [{
							name: "基准收益率",
							data: [35, 8, 25, 37, 4, 20, 10, 8, 25, 38, 28, 15, 56, 12, 11]
						},
						{
							name: "策略收益率",
							data: [70, 40, 65, 100, 44, 68, 58, 35, 8, 25, 37, 4, 20, 10, 45]
						},
					]
				};
				this.chartData = JSON.parse(JSON.stringify(res));
			},
		}
	}
</script>

<style>
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
