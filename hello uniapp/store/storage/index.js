const state = {
	stockCheckedList: [],
	comboCheckedList: [],
	fundCheckedList: []
}
const mutations = {
	SETSTOCK(state, stockList){
		state.stockCheckedList = stockList
	},
	SETCOMBO(state, comboList){
		state.comboCheckedList = comboList
	},
	SETFUND(state, fundList){
		state.fundCheckedList = fundList
	}
}
const actions = {}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}