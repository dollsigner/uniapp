import {request} from '@/api/request.js'
import { stat } from 'fs'
import { userInfo } from 'os'

const state = {
	userInfo: {	
		nickName: '',
		avatar: '',
		description: '', 
		email: '',
		gender: '',
		age: '',
		phoneNumber: '', 
		riskLevel: '',
		riskScore: ''
	}
}
const mutations = {
	
	SETUSERINFO(state, userDetail) {
		state.userInfo = userDetail
	},
	LOGOUT(state) {
		state.userInfo.nickName = ''
		state.userInfo.avatar = ''
		state.userInfo.description = ''
		state.userInfo.email = ''
		state.userInfo.gender = ''
		state.userInfo.age = ''
		state.userInfo.phoneNumber = ''
		state.userInfo.riskLevel = ''
		state.userInfo.riskScore = ''
	},
	SETRISK(state, {riskLevel, count}){
		state.userInfo.riskLevel = riskLevel
		state.userInfo.riskScore = count
	}
}
const actions = {
	
}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}