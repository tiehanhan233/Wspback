const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchema = new Schema({
    userName:String,
    password:String,
    auth:{
        default:0,//默认是没权限,1:权限1,2:权限2,3:权限max
        type:Number
    },
    meta:{
        createTime:Number,
    }
});

adminSchema.pre('save',function (next) {
    if (this.isNew){
        this.meta.createTime = Date.now();
    }
    next();
});

module.exports = mongoose.model('Admin',adminSchema);
