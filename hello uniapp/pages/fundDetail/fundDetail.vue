<template>
	<view>
		<!-- 股票详细数据 -->
		<uni-section :title="fundId" type="line"></uni-section>

		<!-- 分段器 -->
		<uni-segmented-control :current="currentShow" :values="items" @clickItem="changeShow" styleType="button"
			activeColor="#4cd964"></uni-segmented-control>

		<!-- 日期选择器 -->
		<view class="example-body" >
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
				<uni-th align="left" width="50">换手率</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in fundDetailList" :key="index">
				<uni-td>{{item.date}}</uni-td>
				<uni-td>{{item.openValue}}</uni-td>
				<uni-td>{{item.closeValue}}</uni-td>
				<uni-td>{{item.highValue}}</uni-td>
				<uni-td>{{item.lowValue}}</uni-td>
				<uni-td>{{item.exrate}}</uni-td>
			</uni-tr>
		</uni-table>

		<!-- 表格形式展示每周数据 -->
		<uni-table border stripe emptyText="暂无更多数据" v-if="currentShow==1">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="left" width="50">日期</uni-th>
				<uni-th align="left" width="50">每周回报率</uni-th>
				<uni-th align="left" width="50">每年回报率</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in fundDetailWeekly" :key="index">
				<uni-td>{{item.date}}</uni-td>
				<uni-td>{{item.awrrt}}</uni-td>
				<uni-td>{{item.arrt}}</uni-td>
			</uni-tr>
		</uni-table>

		<!-- 表格形式展示每年数据 -->
		<uni-table border stripe emptyText="暂无更多数据" v-if="currentShow==2">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="left" width="50">日期</uni-th>
				<uni-th align="left" width="50">资产总额</uni-th>
				<uni-th align="left" width="50">净值收益率</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in fundDetailYearly" :key="index">
				<uni-td>{{item.date}}</uni-td>
				<uni-td>{{item.total}}</uni-td>
				<uni-td>{{item.roe}}</uni-td>
			</uni-tr>
		</uni-table>
		
		<!-- 分页器 -->
		<uni-pagination :show-icon="true" :total="total" title="标题文字" v-model="current" @change="changeData" />


	</view>
</template>

<script>
	import {
		reqFund
	} from '@/api/index.js'
	export default {
		data() {
			return {
				//当前股票Id
				fundId: '000003',
				// 每页展示的数据列表
				fundDetailList: Array(10).fill(10).map((item, index) => index),
				// 每页展示的数据列表~weekly
				fundDetailWeekly: Array(10).fill(10).map((item, index) => index),
				// 每页展示的数据列表~yearly
				fundDetailYearly: Array(10).fill(10).map((item, index) => index),				
				//展示的数据总数
				total: 50,
				//当前页面
				current: 1,
				// 分段器
				items: ['每日数据', '每周数据', '每半年数据'],
				currentShow: 0
			}
		},
		methods: {
			// 获取基金具体信息
			async reqFundDetail(fundId) {
				let res = await reqFund(fundId)
				console.log(res)
				this.$store.commit('SETFUNDINFO', res.data.data)
				console.log(this.$store)
				// 根据当前展示的是每日数据还是每周数据还是每半年数据调节分页器的总数据
				if (this.currentShow == 0) {
					this.total = this.$store.getters.value.length
				} else if(this.currentShow == 1) {
					this.total = this.$store.getters.weeklyParameter.length
				} else if(this.currentShow == 2) {
					
				}
				this.fundDetailList = this.$store.getters.value.slice(0, 10)
				this.fundDetailWeekly = this.$store.getters.fundWeeklyParameter.slice(0, 10)
				this.fundDetailYearly = this.$store.getters.fundYearlyParameter.slice(0, 10)
			},
			//切换当前显示的是每周数据还是每日数据
			changeShow(e) {
				if (this.currentShow != e.currentIndex) {
					this.currentShow = e.currentIndex
					console.log(this.currentShow)
					// 切换分页器总数据
					if (this.currentShow == 0) {
						this.total = this.$store.getters.value.length
					} else if(this.currentShow == 1) {
						this.total = this.$store.getters.fundWeeklyParameter.length
					} else if(this.currentShow == 2) {
						this.total = this.$store.getters.fundYearlyParameter.length
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
				this.fundDetailList = this.$store.getters.value.slice(start, end)
				this.fundDetailWeekly = this.$store.getters.fundWeeklyParameter.slice(start, end)
				this.fundDetailYearly = this.$store.getters.fundYearlyParameter.slice(start, end)
			},
			//日期切换
			dateChanged(e) {
				// console.log(e)
				let allFundDate = this.$store.getters.value
				let allFundDateWeekly = this.$store.getters.fundWeeklyParameter
				// 查找对应日期在数据数组中的索引值
				
				let index = 0
				//当前展示每日数据
				if (this.currentShow == 0) {
					index = allFundDate.findIndex((item, index) => {
						return item.date == e
					}) 
				} 
				//当前展示每周数据
				else if(this.currentShow == 1) {
					index = allFundDateWeekly.findIndex((item, index) => {
						return item.date == e
					}) 
				}

				// console.log(index)
				//超出数据范围
				if (!index) {
					this.fundDetailList = []
					return ''
				}
				//将索引值除以10并向上取整即为当前页数
				let current = 0
				//若搜索的是第一条数据
				if (index == 0) {
					current = 1
				}
				current = Math.ceil(index / 10)
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
			console.log(option.fundId)
			this.fundId = option.fundId
			this.reqFundDetail(option.fundId)
		}
	}
</script>

<style>
	.example-body {
		background-color: #fff;
		padding: 10px;
	}
</style>
