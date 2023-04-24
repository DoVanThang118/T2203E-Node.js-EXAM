const User = require("../models/user");
const bcrypt = require("bcryptjs");

//
exports.get = function(req,res){
    User.find({}).then(rs=>{
        res.render("user/list",{
            users: rs
        });
    }).catch(err=>{
        res.send(err);
    });
}
//
exports.register = (req,res)=>{
    res.render("user/register");
};
//
exports.create = async (req,res)=>{
    // kiem tra email da co hay chua
    let existUser = await User.findOne({email: req.body.email});
    if(existUser) res.status(422).send("Email is exist");
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    // save to db
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        mobile: req.body.mobile,
    });
    user.save().then(rs=>res.redirect("/")).catch(err=>res.send(err));
}
exports.editForm = (req,res)=>{
    let id = req.params.id;
    User.findById(id).then(rs=>{
        res.render("user/edit",{
            data: rs
        });
    }).catch(err=>{
        res.send(err);
    })
};
exports.update = (req,res)=>{
    let id = req.params.id;
    const files = req.files;
    let data = req.body;
    User.findByIdAndUpdate(id,data)
        .then(rs=>res.redirect("/"))
        .catch(err=>res.send(err));
};
exports.delete = (req,res)=>{
    let id = req.params.id;
    User.findByIdAndDelete(id)
        .then(rs=>res.redirect("/"))
        .catch(err=>res.send(err));
};
