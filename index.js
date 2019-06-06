var express = require('express')
var graphqlHTTP = require('express-graphql')
var { buildSchema, formatError } = require('graphql')
var Sequelize = require('sequelize')

var gql = require('./articles.gql')

// 使用 GraphQL schema language 构建 schema
var schema = buildSchema(gql)

class Article{
  constructor(res){
    Object.assign(this,res.dataValues);
  }
  admin(){
    return new Promise((res,rej)=>{
      setTimeout(()=>{
        res({id: 321})
      },1000)
    })
  }
}

class ArticleBatch{
  constructor(){

  }
  admin(){
    return article.findAll({ 
      where: {
        id:{
          $in:ids
        }
      },
      include:[admin]
    }).then(res=>{
      var a = new Article(res)
      return a
    })
  }
}

var root = {
  getArticleBatch({ ids }) {
    console.log(ids)

    return article.findAll({ 
      where: {
        id:{
          $in:ids
        }
      } 
    }).then(res=>{
      var a = new Article(res)
      return a
    })

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve([
    //       {
    //         id: 1,
    //         name: '123',
    //         author: '123',
    //         pv: 1,
    //         uv: 2,
    //         content: '123',
    //         authType: 3,
    //         point: 1,
    //         price: 1.2
    //       },
    //       {
    //         id: 2,
    //         name: '32123',
    //         author: '43214321',
    //         pv: 1,
    //         uv: 2,
    //         content: '432143214',
    //         authType: 3,
    //         point: 1,
    //         price: 1.2
    //       }
    //     ])
    //   }, 5000)
    // })
  },
  getArticle({ id }) {
    return article.findOne({ 
      where: {id} 
    }).then(res=>{
      // debugger
      var a = new Article(res)
      return a
    })

    throw new Error('作者名称至少4个字符')

    // return new Promise((resolve,reject)=>{
    //   // setTimeout(()=>{
    //   //   reject(new Error({}))
    //   // })
    //   setTimeout(()=>{
    //     resolve({
    //       id: 1,
    //       name: "123",
    //       author: "123",
    //       pv: 1,
    //       uv: 2,
    //       content: "123",
    //       authType: 3,
    //       point: 1,
    //       price: 1.2
    //     })
    //   },1000)
    // })
  },
  createArticle({ input }) {
    if (input.author && input.author.length < 4) {
      throw new Error('作者名称至少4个字符')
    }

    return article.create(input)
  },
  updateArticle({ id, input }) {}
}

// var app = express()
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
//   })
// )

const sequelize = new Sequelize(
  'database_development',
  'root',
  '123456',
  {
    dialect: 'mysql',
    host: 'localhost'
  }
)

const admin = sequelize.define(
  'admin',
  {
    name: Sequelize.STRING(60),
    nickName: Sequelize.STRING(60),
    phone: Sequelize.STRING(30),
    role: Sequelize.BIGINT(4)
  },
  {
    paranoid: true
  }
)

const article = sequelize.define(
  'aritcle',
  {
    name: Sequelize.STRING(60),
    author: Sequelize.STRING(60),
    pv: Sequelize.BIGINT,
    uv: Sequelize.BIGINT,
    content: Sequelize.TEXT,
    authType: Sequelize.BIGINT(4),
    point: Sequelize.BIGINT,
    price: Sequelize.DOUBLE
  },
  {
    paranoid: true
  }
)

const articleCategory = sequelize.define(
  'articleCategory',
  {
    // attr: {type:Sequelize.JSON, defaultValue:"{}"},
    name: Sequelize.STRING(20),
    level: Sequelize.INTEGER(4),
    childrenCount: Sequelize.INTEGER(8),
    type: Sequelize.STRING(20)
  },
  {
    paranoid: true
  }
)

article.belongsTo(admin)
article.belongsTo(articleCategory)

const banner = sequelize.define(
  'banner',
  {
    name: Sequelize.STRING(60),
    hotId: Sequelize.BIGINT(11),
    type: Sequelize.BIGINT(4)
  },
  {
    paranoid: true
  }
)

sequelize
  .authenticate()
  .then(res => {
    sequelize.sync().then(instance => {
      debugger
      // app.listen(7000, () => {
      //   console.log('Running a GraphQL API server at localhost:7000/graphql')
      // })

      // aa.create({
      //   title: 'XiaoMing',
      //   description: '1234567890',
      //   name: "123",
      //   price: 3.31,
      //   realprice: (Math.random() * 10000).toFixed(2),
      //   cccccc:2
      // },{
      //   include:[bb]
      // })
      //   .then(function(result) {
      //     // console.log(result)
      //     // console.log('inserted XiaoMing ok')
      //   })
      //   .catch(function(err) {
      //     // console.log('inserted XiaoMing error')
      //     console.log(err.message)
      //   })

      // aa.sum('price').then(
      //   result=>{
      //     console.log('price:  ' + result)
      //   },
      //   error => {
      //     console.log(error)
      //   }
      // )

      // bb.create({
      //   BBtitle: 'XiaoMing',
      //   BBdescription: '1234567890',
      //   BBname: "123",
      //   BBprice: 3.31,
      //   BBrealprice: (Math.random() * 10000).toFixed(2),
      // })
      //   .then(function(result) {
      //     // console.log(result)
      //     // console.log('inserted XiaoMing ok')
      //   })
      //   .catch(function(err) {
      //     // console.log('inserted XiaoMing error')
      //     console.log(err.message)
      //   })
      // aa.sum('price').then(
      //   result=>{
      //     console.log('price:  ' + result)
      //   },
      //   error => {
      //     console.log(error)
      //   }
      // )
      // aa.sum('price', {
      //   attributes: ['description','realprice'],
      //   group: 'description',
      //   plain: false
      // }).then(function(result) {
      //   console.log(result)
      // })
      // aa.findAll({
      //   // paranoid: false,
      //   // where:{
      //   //   "BB.BBtitle":'XiaoMing'
      //   // },
      //   // include:[bb]
      // }).then((res)=>{
      //   debugger
      // })
      // aa.destroy({
      //   where:{
      //     id: 3
      //   }
      // }).then((res)=>{
      //   debugger
      // })
    })
  })
  .catch(error => {
    console.log(error)
  })
