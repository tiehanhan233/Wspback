const uuid = require('uuid');

const Dish = require('../mongodb/dish');
const Table = require('../mongodb/table');
/**
 * 对应graphql的Schema Type.
 * 定义数据结构key的方法
 */
class RandomDice {
    /**
     * 这个Type初始化传参
     */
    constructor(numSides) {
        this.numSides = numSides;
    }

    /**
     * 每个key的方法.
     */
    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll({numRolls}) {
        var output = [];
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }
}

// root 规定了顶层的 API 入口端点
var root = {
    //顶层查询入口
    Query:{
        getDishes:()=>{
            return Dish.find();
        },
        getTables:()=>{
            return Table.find();
        }
    },
    Mutation: {
        addDish(type,args,context,info){
            const {input} = args;
            const dish = new Dish(input);

            return dish.save();
        },
        addTable:async (type,args,context,info)=>{
            const count = await Table.count();
            const table = new Table({
                tableNumber:count+1,
                people:0,
                tableId:uuid.v4(),
                status:0
            });
            return table.save();
        },
        changeTableStatus:async (type,args,context,info)=>{
            const {input} = args;
            const {tableId,status} = input;
            const table = await Table.findOne({tableId});
            if (table){
                table.status = status;
                return await table.save();
            }
        }
    }

};

module.exports = root;
