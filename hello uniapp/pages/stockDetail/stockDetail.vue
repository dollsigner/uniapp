<template>
	<view>
		<!-- 股票详细数据 -->
		<uni-section :title="stockId" type="line"></uni-section>

		<!-- 分段器 -->
		<uni-segmented-control :current="currentShow" :values="items" @clickItem="changeShow" styleType="button"
			activeColor="#4cd964"></uni-segmented-control>

		<!-- 日期选择器 -->
		<view class="example-body" v-if="currentShow==0">
			<uni-datetime-picker type="date" :clear-icon="false" value="2017-01-03" @maskClick="maskClick"
				@change="dateChanged" />
		</view>


		<!-- 表格形式展示每日数据 -->
		<uni-table border stripe emptyText="暂无更多数据" v-if="currentShow==0">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="left" width="50">日期</uni-th>
				<uni-th align="left" width="50">开盘价</uni-th>
				<uni-th align="left" width="50">收盘价</uni-th>
				<uni-th align="left" width="50">最高价</uni-th>
				<uni-th align="left" width="50">最低价</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in stockDetailList" :key="index">
				<uni-td>{{item.date}}</uni-td>
				<uni-td>{{item.openPrice}}</uni-td>
				<uni-td>{{item.closePrice}}</uni-td>
				<uni-td>{{item.highPrice}}</uni-td>
				<uni-td>{{item.lowPrice}}</uni-td>
			</uni-tr>
		</uni-table>

		<!-- 表格形式展示每周数据 -->
		<uni-table border stripe emptyText="暂无更多数据" v-if="currentShow==1">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="left" width="50">日期</uni-th>
				<uni-th align="left" width="50">营业利润增长率</uni-th>
				<uni-th align="left" width="50">净资产收益率</uni-th>
				<uni-th align="left" width="50">毛利率</uni-th>
				<uni-th align="left" width="50">归母利润增长率</uni-th>
				<uni-th align="left" width="50">资产负债率</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in stockDetailWeekly" :key="index">
				<uni-td>{{item.date}}</uni-td>
				<uni-td>{{item.pgrrt}}</uni-td>
				<uni-td>{{item.narrt}}</uni-td>
				<uni-td>{{item.gprrt}}</uni-td>
				<uni-td>{{item.apgrrt}}</uni-td>
				<uni-td>{{item.alratio}}</uni-td>
			</uni-tr>
		</uni-table>

		<!-- 分页器 -->
		<uni-pagination :show-icon="true" :total="total" title="标题文字" v-model="current" @change="changeData" />


	</view>
</template>

<script>
	import {
		reqStock
	} from '@/api/index.js'
	export default {
		data() {
			return {
				//当前股票Id
				stockId: '000333',
				// 每页展示的数据列表
				stockDetailList: Array(10).fill(10).map((item, index) => index),
				// 每页展示的数据列表~weekly
				stockDetailWeekly: Array(10).fill(10).map((item, index) => index),
				//展示的数据总数
				total: 50,
				//当前页面
				current: 1,
				// 分段器
				items: ['每日数据', '每周数据'],
				currentShow: 0
			}
		},
		methods: {
			// 获取股票具体信息
			async reqStockDetail(stockId) {
				let res = await reqStock(stockId)
				// console.log(res)
				this.$store.commit('SETDETAILINFO', res.data.data)
				console.log(this.$store)
				// 根据当前展示的是每日数据还是每周数据调节分页器的总数据
				if (this.currentShow == 0) {
					this.total = this.$store.getters.price.length
				} else {
					this.total = this.$store.getters.weeklyParameter.length
				}
				this.stockDetailList = this.$store.getters.price.slice(0, 10)
				this.stockDetailWeekly = this.$store.getters.weeklyParameter.slice(0, 10)
			},
			//切换当前显示的是每周数据还是每日数据
			changeShow(e) {
				if (this.currentShow != e.currentIndex) {
					this.currentShow = e.currentIndex
					// 切换分页器总数据
					if (this.currentShow == 0) {
						this.total = this.$store.getters.price.length
					} else {
						this.total = this.$store.getters.weeklyParameter.length
					}
					this.current = 1
				}
			},
			// 切换页码
			changeData(e) {
				// console.log(e.current)
				let start = e.current * 10 - 10
				let end = e.current * 10
				// console.log(`${start}-${end}`)
				this.stockDetailList = this.$store.getters.price.slice(start, end)
				this.stockDetailWeekly = this.$store.getters.weeklyParameter.slice(start, end)
			},
			//日期切换
			dateChanged(e) {
				// console.log(e)
				let allStockDate = this.$store.getters.price
				// 查找对应日期在每日数据数组中的索引值
				let index = allStockDate.findIndex((item, index) => {
					return item.date == e
				})
				// console.log(index)
				//超出数据范围
				if (!index) {
					this.stockDetailList = []
					return ''
				}
				//将索引值除以10并向上取整即为当前页数
				let current = 0
				//若搜索的是第一条数据
				if (index == 0) {
					current = 1
				}
				current = Math.ceil(index/10)
				//调用切换页码的函数
				this.changeData({
					current
				})
				//切换页码
				this.current = current
			}

		},
		onLoad(option) {
			// 接收选择的股票Id
			console.log(option.stockId)
			this.stockId = option.stockId
			this.reqStockDetail(option.stockId)
		}
	}
</script>

<style>
	.example-body {
		background-color: #fff;
		padding: 10px;
	}
</style>
