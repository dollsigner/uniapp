const state = {
	fundDetailInfo: {

	}
}
const mutations = {
	SETFUNDINFO(state, fundDetail) {
		state.fundDetailInfo = fundDetail
	}
}
const actions = {

}
const getters = {
	//基金每日统计数据
	value(state) {
		return state.fundDetailInfo.value
	},	
	//基金每周统计数据
	fundWeeklyParameter(state) {
		return state.fundDetailInfo.weeklyParameter
	},	
	//基金每半年统计数据
	fundYearlyParameter(state) {
		return state.fundDetailInfo.yearlyParameter
	}
	
}

export default {
	state,
	mutations,
	actions,
	getters
}
