const mongoose = require('mongoose');
const {Schema} = mongoose;

const dishSchema = new Schema({
    name:String,//名字
    description:String,//描述
    image:String,//图像地址
    price:Number,//单位是分
    left:Number,//剩余量
    category:String,//类型
    meta:{
        createTime:Number
    }
});

dishSchema.pre('save',function (next) {
    if (this.isNew){
        this.meta.createTime = Date.now();
    }
    next();
});

module.exports = mongoose.model('Dish',dishSchema);
