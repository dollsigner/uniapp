import { stat } from "fs"

const state = {
	stockDetailInfo: {
		
	}
}
const mutations = {
	SETDETAILINFO(state, stockDetail){
		state.stockDetailInfo = stockDetail
	}
}
const actions = {
	
}
const getters = {
	//每日数据
	price(state){
		return state.stockDetailInfo.price
	},
	
	stockId(state) {
		return state.stockDetailInfo.stockId
	},
	//每周数据
	weeklyParameter(state) {
		return state.stockDetailInfo.weeklyParameter
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}