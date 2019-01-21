const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId= Schema.Types.ObjectId
const bcrypt = require('bcryptjs')
const  SALT_WORK_FACTOR  = 10  //加盐10位
//创建UserShema
const userSchema = new Schema({
  UserId:ObjectId,
  userName:{unique:true,type:String},//unique不重复的意思
  password:String,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()}
})
//每次存储数据时都要执行
/**
 * bcryptjs对用户密码进行加盐加密
 */
userSchema.pre('save', function(next){
  console.log(this)
  bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
    if(err) return next(err)
    bcrypt.hash(this.password,salt, (err,hash)=>{
      if(err) return next(err)
      this.password = hash
      next()
    })
  })
})
//发布模型
mongoose.model('User',userSchema)