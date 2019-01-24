const Router = require('koa-router')
const router = new Router()
const user = require('./controller/user')
const home = require('./controller/home')
const category = require('./controller/category')
const city = require('./controller/city')


const isManager = async(ctx, next)=>{
  let params = ctx.request.body
  let response = await user.isManager(params);
  ctx.response.body= response
  return response
}

const isUser = async (ctx, next) => {
  let params = ctx.request.body
  let response = await user.isUser(params)
  ctx.response.body = response
  return response
}

const getUserListPage = async(ctx, next)=>{
  let params = ctx.query
  if(Object.keys(params).length < 1 ){
    params = null
  }
  let response = await user.getUserListPage(params);
  ctx.response.body= response
  return response
}

const addUser = async(ctx, next)=>{
  let params = ctx.request.body 
  let response = await user.addUser(params);
  ctx.response.body= response
  return response
}

const editUser = async(ctx, next)=>{
  let params = ctx.request.body
  console.log(params)
  let response = await user.editUser(params);
  ctx.response.body= response
  return response
}

const removeUser = async(ctx, next)=>{
  let params = ctx.query
  let response = await user.removeUser(params);
  ctx.response.body= response
  return response
}

const batchRemoveUser = async(ctx, next)=>{
  let params = ctx.request.body
  let response = await user.batchRemoveUser(params);
  ctx.response.body= response
  return response
}

const getHomeList = async(ctx, next)=>{
  let params = ctx.query
  if (Object.keys(params).length < 1) {
    params = null
  }
  let response = await home.getHomeList(params)
  ctx.response.body= response
  return response
}

const addHomeItem = async(ctx, next)=>{
  let params = ctx.request.body
  let response = await home.addHomeItem(params);
  ctx.response.body= response
  return response
}

const editHomeItem = async(ctx, next)=>{
  let params = ctx.request.body
  let response = await home.editHomeItem(params);
  ctx.response.body= response
  return response
}

const removeHomeItem = async(ctx, next)=>{
  let params = ctx.query
  let response = await home.removeHomeItem(params);
  ctx.response.body= response
  return response
}

const batchRemoveHomeItem = async(ctx, next)=>{
  let params = ctx.request.body
  let response = await home.batchRemoveHomeItem(params);
  ctx.response.body= response
  return response
}

const addCommend = async (ctx, next) => {
  let params = ctx.request.body
  let response = await home.addCommend(params)
  ctx.response.body = response
  return response
}


const getCategoryList = async(ctx, next)=>{
  let params = ctx.query
  if (Object.keys(params).length < 1) {
    params = null
  }
  let response = await category.getCategoryList(params);
  ctx.response.body= response
  return response
}

const getDestination = async (ctx, next) => {
  let response = await category.getDestination()
  ctx.response.body = response
  return response
}

const getCityInfo = async (ctx, next) => {
  let params = ctx.query
  let response = await city.getCityInfo(params)
  ctx.response.body = response
  return response
}

const addCategory = async(ctx, next)=>{
  let params = ctx.request.body 
  let response = await category.addCategory(params);
  ctx.response.body= response
  return response
}

const editCategory = async(ctx, next)=>{
  let params = ctx.request.body
  console.log(params)
  let response = await category.editCategory(params);
  ctx.response.body= response
  return response
}

const removeCategory = async(ctx, next)=>{
  let params = ctx.query
  let response = await category.removeCategory(params);
  ctx.response.body= response
  return response
}

const batchRemoveCategory = async(ctx, next)=>{
  let params = ctx.request.body
  let response = await category.batchRemoveCategory(params);
  ctx.response.body= response
  return response
}

const getCategory = async(ctx, next)=>{
  let params = ctx.query
  let response = await category.getCategory(params);
  ctx.response.body= response
  return response
}

const getCityList = async(ctx, next)=>{
  let params = ctx.query
  if (Object.keys(params).length < 1) {
    params = null
  }
  let response = await city.getCityList(params);
  ctx.response.body= response
  return response
}

const addCity = async(ctx, next)=>{
  let params = ctx.request.body 
  let response = await city.addCity(params);
  ctx.response.body= response
  return response
}

const editCity = async(ctx, next)=>{
  let params = ctx.request.body
  console.log(params)
  let response = await city.editCity(params);
  ctx.response.body= response
  return response
}

const removeCity = async(ctx, next)=>{
  let params = ctx.query
  let response = await city.removeCity(params);
  ctx.response.body= response
  return response
}

const batchRemoveCity = async(ctx, next)=>{
  let params = ctx.request.body
  let response = await city.batchRemoveCity(params);
  ctx.response.body= response
  return response
}

const jsonp = async(ctx, next)=>{
  let {cb, msg} = ctx.query
  console.log(ctx.query)
  ctx.response.body = `${cb}('${JSON.stringify({msg: '回调函数'})}')`
}

router.post('/manager/login', isManager)
router.post('/user/login', isUser)
router.get('/user/listpage', getUserListPage)
router.post('/user/add', addUser)
router.post('/user/edit', editUser)
router.post('/user/changeFavourite', editUser)
router.post('/user/changeCollect', editUser)
router.get('/user/remove', removeUser)
router.post('/user/batchRemove', batchRemoveUser)

router.get('/home/list', getHomeList)
router.post('/home/add', addHomeItem)
router.post('/home/edit', editHomeItem)
router.get('/home/remove', removeHomeItem)
router.post('/home/batchRemove', batchRemoveHomeItem)
router.post('/home/addCommond', addCommend)

router.get('/category/list', getCategoryList)
router.get('/category/destination', getDestination)
router.get('/category/cityInfo', getCityInfo)
router.post('/category/add', addCategory)
router.post('/category/edit', editCategory)
router.get('/category/remove', removeCategory)
router.post('/category/batchRemove', batchRemoveCategory)

router.get('/city/list', getCityList)
router.post('/city/add', addCity)
router.post('/city/edit', editCity)
router.get('/city/remove', removeCity)
router.post('/city/batchRemove', batchRemoveCity)

router.get('/jsonp', jsonp)


module.exports = router