let MongoClient = require('mongodb').MongoClient
let ObjectId = require('mongodb').ObjectID
let url = 'mongodb://localhost:27017/'
let db
let home

MongoClient.connect(
  url,
  function(err, database) {
    if (err) throw err
    console.log('数据库连接已创建!')
    db = database
    home = db.db('test').collection('home')
  }
)

module.exports = {
  getHomeList(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        params._id = ObjectId(params._id)
        home.find(params).toArray((err, res) => {
          if (err) reject(err)
          let response = { code: 200, msg: 'success', list: res }
          resolve(response)
        })
      }else{
        home.find().toArray((err, res) => {
          if (err) reject(err)
          let response = { code: 200, msg: 'success', list: res }
          resolve(response)
        })
      }
    })
  },

  addHomeItem(params) {
    return new Promise((resolve, reject) => {
      home.insertOne(params, (err, res) => {
        if (err) reject(err)
        let response = { code: 200, msg: 'success' }
        resolve(response)
      })
    })
  },

  editHomeItem(params) {
    return new Promise((resolve, reject) => {
      let id = ObjectId(params._id)
      delete params._id
      home.updateOne({ _id: id }, { $set: params }, (err, res) => {
        if (err) reject(err)
        let response = { code: 200, msg: 'success' }
        resolve(response)
      })
    })
  },

  removeHomeItem(params) {
    return new Promise((resolve, reject) => {
      console.log(params)
      params._id = ObjectId(params._id)
      home.deleteOne(params, (err, res) => {
        if (err) reject(err)
        if (res.result.ok) {
          let response = { code: 200, msg: 'success' }
          resolve(response)
        } else {
          let response = { code: 201, msg: '删除失败' }
          resolve(response)
        }
      })
    })
  },

  batchRemoveHomeItem(params) {
    return new Promise((resolve, reject) => {
      params.forEach(item => (item._id = ObjectId(item._id)))
      home.deleteMany({ $or: params }, (err, res) => {
        if (err) reject(err)
        resolve('success')
      })
    })
  },

  addCommend(params) {
    return new Promise((resolve, reject) => {
      let id = ObjectId(params._id)
      delete params._id
      home.updateOne({ _id: id }, { $set: params }, (err, res) => {
        if (err) reject(err)
        console.log(res.result)
        let response = { code: 200, msg: '评论成功' }
        resolve(response)
      })
    })
  }
}
