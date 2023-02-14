<template>
	<view>
		<text>{{subject}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			subject: "",
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	text {
		display: block;
		text-align: center;
		height: 80rpx;
		width: 650rpx;
		border: 1rpx solid rgb(224, 224, 224);
		margin: auto;
	}
</style>
