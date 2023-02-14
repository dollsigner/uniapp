<template>
<uni-shadow-root class="Questions-index"><view class="question">
    <view class="surface">
        
        {{que.id}}、{{que.subject}}
    </view>
    <view class="option">
        <radio-group @change="handleChange">
            <radio :value="que.id" color="green">{{que.option[0]}}</radio>
            <radio :value="que.id" color="green">{{que.option[1]}}</radio>
            <radio :value="que.id" color="green">{{que.option[2]}}</radio>
            <radio :value="que.id" color="green">{{que.option[3]}}</radio>
        </radio-group>
    </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'Questions/index'
// component/Question/Question.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        que:{
            type:Object,
            value:{}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleChange(e){
            // console.log(e.detail.value);
            // let id = Number(e.detail.value[0]);
            // let value = Number(e.detail.value[2]);
            //子向父传递数据
            this.triggerEvent("optionChange",e.detail.value);
        }
    }
})
export default global['__wxComponents']['Questions/index']
</script>
<style platform="mp-weixin">
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