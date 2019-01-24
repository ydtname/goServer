let MongoClient = require('mongodb').MongoClient
let ObjectId = require('mongodb').ObjectID
let url = 'mongodb://localhost:27017/'
let db
let city

MongoClient.connect(
  url,
  function(err, database) {
    if (err) throw err
    console.log('数据库连接已创建!')
    db = database
    city = db.db('test').collection('city')
  }
)

module.exports = {
  getCityList(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        city.find(params).toArray((err, res) => {
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
        city.find().toArray((err, res) => {
          if (err) reject(err)
          let response = { code: 200, msg: 'success', list: res }
          resolve(response)
        })
      }
    })
  },

  getCityInfo(params) {
    return new Promise((resolve, reject) => {
      city.find(params).toArray((err, res) => {
        if (err) reject(err)
        if (res.length) {
          let response = { code: 200, msg: 'success', info: res[0] }
          resolve(response)
        } else {
          let response = { code: 201, msg: '该城市不存在' }
          resolve(response)
        }
      })
    })
  },

  addCity(params) {
    return new Promise((resolve, reject) => {
      city.insertOne(params, (err, res) => {
        if (err) reject(err)
        let response = { code: 200, msg: 'success' }
        resolve(response)
      })
    })
  },

  editCity(params) {
    return new Promise((resolve, reject) => {
      let id = ObjectId(params._id)
      delete params._id
      city.updateOne({ _id: id }, { $set: params }, (err, res) => {
        if (err) reject(err)
        let response = { code: 200, msg: 'success' }
        resolve(response)
      })
    })
  },

  removeCity(params) {
    return new Promise((resolve, reject) => {
      params._id = ObjectId(params._id)
      city.deleteOne(params, (err, res) => {
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

  batchRemoveCity(params) {
    return new Promise((resolve, reject) => {
      params.forEach(item => (item._id = ObjectId(item._id)))
      city.deleteMany({ $or: params }, (err, res) => {
        if (err) reject(err)
        resolve('success')
      })
    })
  }
}
