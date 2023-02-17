const state = {
	stockCheckedList: [],
	comboCheckedList: [],
	fundCheckedList: [],
	selfStocks: [],
	selfFunds: [],
	autoStocks: [],
	autoFunds: [],
	
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
	},
	SETSELFSTOCK(state, selfStocks){
		state.selfStocks = selfStocks
	},
	SETSELFFUND(state, selfFunds){
		state.selfFunds = selfFunds
	},
	SETAUTOSTOCK(state, autoStocks){
		state.autoStocks = autoStocks
	},
	SETAUTOFUND(state, autoFunds){
		state.autoFunds = autoFunds
	},
}
const actions = {}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}