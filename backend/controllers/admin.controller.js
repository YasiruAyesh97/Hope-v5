const {fn,col} = require('sequelize');
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Company = db.company;
const Users_Roles = db.users_roles;
const Role = db.role;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
let {roleRegularUser} = require('../config/default.js');


exports.regularUserRegister = async (req, res) => {
    // Save User to Database
    console.log(JSON.stringify(req.body));
    try{

        let regularuserrole =await Role.findOne({
            where: {
                name: roleRegularUser
            }
        })
        let user =await User.findOne({
            where: {
                email:req.body.email
            }
        })
        if(user){
            return res.status(400).send({ message: "user already registered" });
        }
        User.create({
            username: req.body.username,
            email: req.body.email,
            password:   bcrypt.hashSync(req.body.password, 8),
            companyId: req.body.companyId,

        })
            .then(user => {
                Users_Roles.create({
                    roleId: regularuserrole.id,
                    userId: user.id,

                }).then(data=>{
                    return res.status(200).send({ message: "user register" });
                }).catch(err => {

                        return res.status(500).send({ message: err.message });
                });

            })
            .catch(err => {
                return res.status(401).send({ message: err.message });
            });

    }catch(err) {
        return res.status(500).send({ message: err.message });
    }

};

exports.regularUsersList = async (req, res) => {

    try{

        const role = await Role.findOne({
            where: {
                name :roleRegularUser
            }
        })

        //regular user role id
        const user_role =await Users_Roles.findAll({
            where: {
                roleId :role.id,


            }
        })
        let user_arr=[]
        for(i=0;i<user_role.length;i++){
            user_arr.push(user_role[i].userId)
        }


        const user =await User.findAll({
            attributes: [
                'id',
                'username',
                'email',
                'password',
                [fn('DATE', col('createdAt')), 'date'],
                ['active','status']


            ],
            where: {
                id: {
                    [Op.in]: user_arr
                },
                companyId:req.params.id

            },
        })

        let filter_user=[];
        for(i=0;i<user.length;i++){
            if(user[i].id !== req.userId){
                filter_user.push(user[i])
            }
        }

        return res.status(200).send(filter_user);

    }catch(err) {
        return res.status(500).send({ message: err });
    }

};



exports.deleteSelectedRegularUser = async (req, res) => {
    // Save User to Database

    try{

        const role = await Role.findOne({
            where: {
                name :'user'
            }
        })

        let deletedRecord =await Users_Roles.destroy({
            where: {
                userId :req.params.id,

            }

        })

        if(deletedRecord >= 1){
            let deletedUser =await User.destroy({
                where: {
                    id :req.params.id
                }

            })
            if(deletedUser==1){
                return res.status(200).send({ message: "user deleted" });
            }

        }




    }catch(err) {
        return res.status(500).send({ message: err.message });
    }

};


exports.selectedRegularUserStatusChange = async (req, res) => {

    try{

        let user =await User.findOne({

            where: { id: req.params.id }
        });

        if(!user){
            return res.status(401).send({ message:'no user found' });
        }

        User.update(
            { active: !user.active},
            { where: { id: req.params.id } }
        ).then(user => {
            return res.status(200).send({ message: "successfully" });
        }).catch(err => {
            return res.status(401).send({ message: err.message });
        });


    }catch(err) {
        return res.status(500).send({message: err.message });
    }

};