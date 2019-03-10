const {ApolloServer, gql} = require('apollo-server-koa');

var {type, mutation} = require('./dish.schema');

// 使用 GraphQL schema language 构建一个 schema
var schema = gql(`
  type Table{
    tableNumber:Int!,
    orderId:String!,
    tableId:String!,
    people:Int!
    status:Int!
  }
  type Dish{
    name:String!,
    description:String!,
    image:String!
    price:Int!
    left:Int!
    category:String!
  }
  input DishInput{
    name:String!,
    description:String!,
    image:String!
    price:Int!
    left:Int!
    category:String!
  }
  input TableInput{
    tableNumber:Int!,
    orderId:String,
    tableId:String!,
    status:Int!
  }
  input ChangeTableStatus{
    tableId:String!,
    status:Int!
  }
  type RandomDice{
    numSides:Int!
    rollOnce:Int!
    roll(numRolls:Int!):[Int]
  }
  type Query {
    getDishes:[Dish]
    getTables:[Table]
  }
  type Mutation{
    addDish(input:DishInput):Dish
    addTable:Table
    changeTableStatus(input:ChangeTableStatus):Table
  }
`);
module.exports = schema;
