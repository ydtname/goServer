let MongoClient = require('mongodb').MongoClient
let ObjectId = require('mongodb').ObjectID
let url = 'mongodb://localhost:27017/'
let db
let category

MongoClient.connect(
  url,
  function(err, database) {
    if (err) throw err
    console.log('数据库连接已创建!')
    db = database
    category = db.db('test').collection('category')
  }
)

module.exports = {
  getCategoryList(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        category.find(params).toArray((err, res) => {
          if (err) reject(err)
          if (res.length) {
            let response = { code: 200, msg: 'success', list: res }
            resolve(response)
          } else {
            let response = { code: 201, msg: '该城市不存在' }
            resolve(response)
          }
        })
      } else {
        category.find().toArray((err, res) => {
          if (err) reject(err)
          let response = { code: 200, msg: 'success', list: res }
          resolve(response)
        })
      }
    })
  },

  getDestination() {
    return new Promise((resolve, reject) => {
      category.find().toArray((err, res) => {
        if (err) reject(err)
        let data = []
        while(res.length > 0){
          let obj = { country: res[0].country, cityNum: 1, cityMenu: [res[0]] }
          res.splice(0, 1)
          for (let index = 0; index < res.length; index++) {
            if (obj.country === res[index].country) {
              obj.cityMenu.push(res[index])
              ++obj.cityNum
              res.splice(index, 1)
              --index
            }
          }
          data.push(obj)
        }
        let response = { code: 200, msg: 'success', list: data }
        resolve(response)
      })
    })
  },

  addCategory(params) {
    return new Promise((resolve, reject) => {
      category.insertOne(params, (err, res) => {
        if (err) reject(err)
        let response = { code: 200, msg: 'success' }
        resolve(response)
      })
    })
  },

  editCategory(params) {
    return new Promise((resolve, reject) => {
      let id = ObjectId(params._id)
      delete params._id
      category.updateOne({ _id: id }, { $set: params }, (err, res) => {
        if (err) reject(err)
        let response = { code: 200, msg: 'success' }
        resolve(response)
      })
    })
  },

  removeCategory(params) {
    return new Promise((resolve, reject) => {
      params._id = ObjectId(params._id)
      category.deleteOne(params, (err, res) => {
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

  batchRemoveCategory(params) {
    return new Promise((resolve, reject) => {
      params.forEach(item => (item._id = ObjectId(item._id)))
      category.deleteMany({ $or: params }, (err, res) => {
        if (err) reject(err)
        resolve('success')
      })
    })
  }
}
