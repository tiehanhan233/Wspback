const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = Schema;

const tableSchema = new Schema({
    tableNumber:Number,//桌子号
    orderId:{
        type:ObjectId,
        ref:"Order"
    },//当前桌子的订单
    tableId:String,//桌子id
    people:{
        type:Number,
        default:0
    },//桌子人数
    status:Number,//0:空闲,1:用餐
    meta:{
        createTime:Number,
    }
});

tableSchema.pre('save',function (next) {
    if (this.isNew){
        this.meta.createTime = Date.now();
    }
    next();
});

module.exports = mongoose.model('Table',tableSchema);
