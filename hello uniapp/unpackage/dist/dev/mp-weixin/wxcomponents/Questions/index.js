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
