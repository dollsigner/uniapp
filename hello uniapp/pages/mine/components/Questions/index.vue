<template>
	<view>
		<view class="question">
		    <view class="surface">
		        <!-- {{que}} -->
		        {{que.id}}、{{que.subject}}
		    </view>
		    <view class="option">
		        <radio-group @change="handleChange">
		            <radio :value="que.id+1" color="green">{{que.option[0]}}</radio>
		            <radio :value="que.id+2" color="green">{{que.option[1]}}</radio>
		            <radio :value="que.id+3" color="green">{{que.option[2]}}</radio>
		            <radio :value="que.id+4" color="green">{{que.option[3]}}</radio>
		        </radio-group>
		    </view>
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			que: {
				type: Object,
				required: false,
			}
		},
		methods: {
			handleChange(e){
			    // console.log(e.detail.value);
			    // let id = Number(e.detail.value[0]);
			    // let value = Number(e.detail.value[2]);
			    //子向父传递数据
			    this.$emit("optionChange",e)
			}
		}
		
	}
</script>

<style>
	.question{
	    padding:20rpx;
	    margin:10rpx;
	    border:1rpx solid #576B95;
	    border-radius: 5%;
	}
	
	.surface{
	    padding-bottom: 30rpx;
	    font-size: large;
	    color: #576B95;
	} 
	
	.option radio{
	    display: flex;
	    padding-bottom: 20rpx;
	    font-size: medium;
	    width: fit-content;
	}
</style>
