let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let url = "mongodb://localhost:27017/";
let db
let manager, user

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  console.log("数据库连接已创建!");
  db=database;
  manager = db.db("test").collection("manager")
  user = db.db("test").collection("user")
});


module.exports = {
  isManager(params) {
    return new Promise((resolve, reject) => {
      manager.find({'account': params.username, 'password': params.password})
          .toArray((err, res) => {
            if (err) reject(err)
            if(res.length){
              let response = {code: 200, msg: 'success', user: res[0]}
              resolve(response)
            }else{
              let response = {code: 201, msg: '账号或者密码错误'}
              resolve(response)
            }
      })
    })
  },

  isUser(params){
    return new Promise((resolve, reject) => {
      user.find({ 'account': params.account, 'password': params.password })
        .toArray((err, res) => {
          if (err) reject(err)
          if (res.length) {
            let response = { code: 200, msg: 'success', user: res[0] }
            resolve(response)
          } else {
            let response = { code: 201, msg: '账号或者密码错误' }
            resolve(response)
          }
        })
    })
  },

  getUserListPage(params){
    return new Promise((resolve, reject) => {
      if(params){
        user.find(params).toArray((err, res) => {
          if (err) reject(err)
          if (res.length) {
            let response = { code: 200, msg: 'success', users: res }
            resolve(response)
          } else {
            let response = { code: 201, msg: '该用户不存在' }
            resolve(response)
          }
        })
      }else{
        user.find()
          .toArray((err, res) => {
            if (err) reject(err)
            let response = {code: 200, msg: 'success', users: res}
            resolve(response)
          })
      }
    })
  },

  addUser(params) {
    return new Promise((resolve, reject) => {
      user.insertOne(params, (err, res) => {
        if (err) reject(err);
        let response = {code: 200, msg: 'success'}
        resolve(response)
      })
    })
  },

  editUser(params) {
    return new Promise((resolve, reject) => {
      let id = ObjectId(params._id)
      delete params._id
      user.updateOne({_id: id},{ $set: params }, (err, res) => {
        if (err) reject(err);
        let response = {code: 200, msg: 'success'}
        resolve(response)
      })
    })
  },

  removeUser(params) {
    return new Promise((resolve, reject) => {
      // params = JSON.parse(JSON.stringify(params))
      params._id = ObjectId(params._id)
      user.deleteOne(params, (err, res) => {
        if (err) reject(err);
        if(res.result.ok){
          let response = {code: 200, msg: 'success'}
          resolve(response)
        }else{
          let response = {code: 201, msg: '删除失败'}
          resolve(response)
        }
      })
    })
  },

  batchRemoveUser(params) {
    return new Promise((resolve, reject) => {
      params.forEach(item=>item._id = ObjectId(item._id))
      console.log(params)
      user.deleteMany( {$or: params},(err, res) => {
        if (err) reject(err);
        resolve("success")
      })
    })
  },

 
}