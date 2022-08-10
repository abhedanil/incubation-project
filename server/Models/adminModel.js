const mongoose=require ("mongoose")
const bcrypt=require('bcrypt')

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Email is Required'],
    },
    email:{
        type:String,
        required: [true,'Email is Required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password is Required"]
    },
});



adminSchema.statics.login=async function (email,password){
    const admin=await this.findOne({email});
    if(admin){
        const auth= await bcrypt.compare(password,admin.password)
        if(auth){
            return admin;
        }
        throw Error('incorrect Password');
    }
    throw Error('incorrect Email')
}

module.exports=mongoose.model("Admins",adminSchema)