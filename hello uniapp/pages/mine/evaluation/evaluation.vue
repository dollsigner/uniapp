<template>
	<view>
		<text>风险测评</text>
		<Questions :que="Questions[0]" @optionChange="handleOptionChange"></Questions>
		<Questions :que="Questions[1]" @optionChange="handleOptionChange"></Questions>
		<Questions :que="Questions[2]" @optionChange="handleOptionChange"></Questions>
		<Questions :que="Questions[3]" @optionChange="handleOptionChange"></Questions>
		<Questions :que="Questions[4]" @optionChange="handleOptionChange"></Questions>
		<Questions :que="Questions[5]" @optionChange="handleOptionChange"></Questions>
		<Questions :que="Questions[6]" @optionChange="handleOptionChange"></Questions>
		<Questions :que="Questions[7]" @optionChange="handleOptionChange"></Questions>
		<Questions :que="Questions[8]" @optionChange="handleOptionChange"></Questions>
		<Questions :que="Questions[9]" @optionChange="handleOptionChange"></Questions>

		<button type="primary" @click="answerCheck">提交</button>
	</view>
</template>

<script>
	import Questions from '@/pages/mine/components/Questions'
	export default {
		data() {
			return {
				Questions: [{
						id: "1",
						subject: '您每年可用于投资的资金是',
						option: [
							'A:5万元以下',
							'B:5~50万',
							'C:50~100万',
							'D:100万以上'
						],
						done: false,
						value: 0
					},
					{
						id: "2",
						subject: '您投资的资金来源于',
						option: [
							'A:自己的收入',
							'B:家庭的共同资产',
							'C:父母对我的支持',
							'D:我是基金受托人，资金来源于客户'
						],
						done: false,
						value: 0
					},
					{
						id: "3",
						subject: '您的年龄是',
						option: [
							'A:25岁以下',
							'B:25~35岁',
							'C:55岁以上',
							'D:35~55岁'
						],
						done: false,
						value: 0
					},
					{
						id: "4",
						subject: '您是否有尚未清偿的数额较大的债务，如有，其性质是',
						option: [
							'A:有，住房抵押贷款等长期定额债务',
							'B:有，信用卡欠款，消费信贷等短期信用债务',
							'C:有，向亲戚朋友借款',
							'D:没有债务'
						],
						done: false,
						value: 0
					},
					{
						id: "5",
						subject: '您对投资领域知识的了解情况如何',
						option: [
							'A:新手小白',
							'B:略懂一二',
							'C:掌握各种基本知识',
							'D:有较深的了解'
						],
						done: false,
						value: 0
					},
					{
						id: "6",
						subject: '假设有两种投资：投资A预期获得10%的收益，可能承担的损失风险非常小；投资B预期获得30%的收益，但承担较大风险，您会怎么支配您的投资',
						option: [
							'A:全部投资A',
							'B:同时投资A和B，大部分用于投资A',
							'C:同时投资A和B，大部分用于投资B',
							'D:全部投资B'
						],
						done: false,
						value: 0
					},
					{
						id: "7",
						subject: '下列哪一项描述更符合您对于投资的态度',
						option: [
							'A:手上有闲钱，想试一试，希望不要亏，能赚多少是多少',
							'B:“零钱通”之类的理财产品收益太低，我要获得更高的利率',
							'C:投资对我并不陌生，我想要获得较高的利率，同时能承担相应的风险',
							'D:搏一搏单车变摩托！我想赌一赌我能不能赢！'
						],
						done: false,
						value: 0
					},
					{
						id: "8",
						subject: '您的投资经验可描述为',
						option: [
							'A:除银行储蓄、零钱通等，基本没有其他投资经验',
							'B:购买过债券、保险等理财产品',
							'C:参与过股票、基金等产品的交易',
							'D:参与过证券、期货、期权等产品的交易'
						],
						done: false,
						value: 0
					},
					{
						id: "9",
						subject: '您在过去的投资活动中收益情况如何',
						option: [
							'A:过去几乎没有进行过投资',
							'B:收益较少和银行利率差不多，或者更高一点',
							'C:收益不错，确实让我的资产变得更多了',
							'D:收益很高，我投入许多精力最终获得很高的收益'
						],
						done: false,
						value: 0
					},
					{
						id: "10",
						subject: '您计划的投资周期',
						option: [
							'A:1年以下',
							'B:1~2年',
							'C:3~5年',
							'D:5年以上'
						],
						done: false,
						value: 0
					}
				],
				riskLevel: '',
				riskCount: 0
			}
		},

		methods: {
			toMine() {
				uni.switchTab({
					url: '/pages/mine/mine'
				})
			},
			handleOptionChange(e) {
				/* 				console.log(e.detail.value)
								console.log(typeof(e.detail.value)) */
				//对e.detail进行字符串处理
				let strdata = (e.detail.value).split('')
				// console.log(strdata)
				var id = Number(strdata[0]); //拿出序号
				var value = 0
				if (strdata.length == 3) {
					value = Number(strdata[2])
					id = Number(strdata[0] + strdata[1])
				} else {
					value = Number(strdata[1]);
				}
				//拿出分值
				this.Questions[id - 1].done = true
				this.Questions[id - 1].value = value
			},
			answerCheck() {
				var flag = true;
				for (let i = 0; i <= this.Questions.length - 1; i++) {
					// console.log(this.Questions[i]);
					if (!this.Questions[i].done) {
						flag = false
					}
			 	//console.log(flag);
				}
				if (flag) { //全部完成
					var count = 0
					wx.showToast({
						title: '提交成功',
						icon: 'succes',
						duration: 2000
					});
					//总分计数
					for (var i = 0; i <= this.Questions.length - 1; i++) {
						count += this.Questions[i].value;						
					}
					let riskLevel = ''
					if (count >= 10) {
						if (count > 30) {
							riskLevel = '进取型'
						} else if (count > 20) {
							riskLevel = '稳健型'
						} else {
							riskLevel = '保守型'
						}
					}
					console.log(count)
					console.log(riskLevel)
					//将风险测评结果提交仓库
					this.riskLevel = riskLevel
					this.riskCount = count
					this.$store.commit('SETRISK', {
						riskLevel,
						count
					})
					uni.switchTab({
						url: '/pages/mine/mine'
					})
				}
				if (!flag) {
					wx.showToast({
						title: '您还未完成全部题目',
						icon: 'error',
						duration: 6000
					});
				}
			},
		},

		components: {
			Questions,
		},
		
		onHide() {
			
		}
	}
</script>

<style>
	button {
		width: 230px;
		height: 57px;
	}
</style>
