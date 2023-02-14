import {
	request,
	request2
} from '@/api/request.js'


// 登录请求
export const reqLogin = ({
	code,
	avatar,
	nickName
}) => {
	return request({
		url: '/user/login',
		method: 'POST',
		data: {
			code: code,
			avatar: avatar,
			nickName: nickName
		}
	})
}

//请求用户信息请求
export const reqUserDetail = (sessionKey) => {
	return request({
		url: '/user/detail',
		method: 'POST',
		data: {
			sessionKey: sessionKey,

		}

	})
}

//更新用户信息请求sessionKey
export const reqUpdateDetail = (sessionKey, detailParams) => {
	return request({
		url: '/user/update',
		method: 'POST',
		data: {
			sessionKey: sessionKey,
			nickName: detailParams.nickName,
			avatar: detailParams.avatar,
			description: detailParams.description,
			email: detailParams.email,
			gender: detailParams.gender,
			age: detailParams.age,
			phoneNumber: detailParams.phoneNumber,
			riskLevel: detailParams.riskLevel,
			riskScore: detailParams.riskScore,
		}
	})
}

//请求股票信息的请求
export const reqStock = (stockId) => {
	return request({
		url: `/stock?stockId=${stockId}`,
		method: 'GET',
	})
}

//请求基金信息的请求
export const reqFund = (fundId) => {
	return request({
		url: `/fund?fundId=${fundId}`,
		method: 'GET',
	})
}

//获取推荐股票和基金列表
export const reqRecommendation = (sessionKey) => {
	return request2({
		url: '/recommend',
		method: 'POST',
		data: {
			sessionKey: sessionKey,

		}
	})
}

//展示仓库
export const reqQueryRepo = (sessionKey) => {
	return request2({
		url: '/queryRepo',
		method: 'POST',
		data: {
			sessionKey: sessionKey,
		}
	})
}

//添加组合
export const addCombo = (sessionKey, options = {}) => {
	return request2({
		url: '/addCombo',
		method: 'POST',
		/* comboName: 组合名称
totalAmount: 组合总金额（string）
selfRatio: 自投比例（string）
selfStocks:[] 自投股票详情
selfFunds: [] 自投基金详情
autoRatio: 系统优化占比（string）
autoStockRatio: 机投股票占比（string）
autoFundRatio: 机投基金占比（string）
autoStocks:[] 机投股票详情
autoFunds:[] 机投基金详情
depositRatio: 固定投资占比（string） */
		data: {
			sessionKey: sessionKey,
			comboName: options.comboName || '',
			totalAmount: options.totalAmount || '',
			selfRatio: options.selfRatio || '',
			selfStocks: options.selfStocks || '',
			selfFunds: options.selfFunds || '',
			autoRatio: options.autoRatio || '',
			autoStockRatio: options.autoStockRatio || '',
			autoFundRatio: options.autoFundRatio || '',
			autoStocks: options.autoStocks || '',
			autoFunds: options.autoFunds || '',
			depositRatio: options.depositRatio || '',
		}
	})
}

//