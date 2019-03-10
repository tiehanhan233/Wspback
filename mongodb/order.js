const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    openid:String,
    unionid:String,
    nonceStr:String,

    status:{
        type:Number,
        default:1
    },//0:成功.1:待支付.2:取消,3:失败

    tableId:String,//唯一指定到桌子标志
    price:Number,//分
    dish:[],//{name,image,price,amount}

    meta:{
        createTime:Number,
        updateTime:Number
    }
});

orderSchema.pre('save',function (next) {
    if (this.isNew){
        this.meta.createTime = Date.now();
    }
    next();
});

module.exports = mongoose.model('Order',orderSchema);
