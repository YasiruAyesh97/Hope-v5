const {fn,col} = require('sequelize');
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Company = db.company;
const Users_Roles = db.users_roles;
const Role = db.role;
const Op = db.Sequelize.Op;
let bcrypt = require("bcryptjs");
let {roleAdmin,roleRegularUser,superAdminEmail} = require('../config/default.js');


exports.usersList = async (req, res) => {

    try{

        let user =await User.findAll({

            attributes: [
                'id',
                'username',
                'email',
                'password',
                'companyId',
                [ 'createdAt','datetime'],
                [db.Sequelize.literal('company.name'), 'cname'],
                ['active','status']


            ],
            include : { model: Company ,attributes: []},
            where: {
                email: {
                    [Op.not]: superAdminEmail
                }
            }

        });

        if(user){
            return res.status(200).send(user);
        }


    }catch(err) {
        return res.status(500).send({ message: err.message });
    }

};

exports.selectedUser = async (req, res) => {

    try{

        let user =await User.findOne({
            where: {
                id :req.body.id
            }

        })

        if(user){
            let isAdmin = false
            let roles = false
            let isRUser = false

            let ur =await Users_Roles.findAll({
                where: {
                    userId :user.id
                },
                attributes: [
                    'roleId'
                ]

            })

            for (let i = 0; i < ur.length; i++) {
                let role =await Role.findOne({
                    where: {
                        id :ur[i].roleId
                    },
                    attributes: [
                        'name'
                    ]

                })

                if(role.name === roleAdmin){
                    console.log("role : "+role.name)
                    isAdmin=true
                    roles=true
                }
                if(role.name === roleRegularUser){
                    console.log("role : "+role.name)
                    isRUser=true
                    roles=true
                }

            }

            return  res.status(200).send({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "companyId":user.companyId,
                "status": user.active,
                "isAdmin": isAdmin,
                "isRUser": isRUser,
                "roles": roles,

            });
        }


    }catch(err) {
        return res.status(500).send({ message: "Something wrrong" });
    }

};


exports.deleteSelectedUser = async (req, res) => {

    try{

        let deletedRecord =await Users_Roles.destroy({
            where: {
                userId :req.params.id
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


exports.selectedUserEdit = async (req, res) => {

    try{
        let isAdmin = req.body.isAdmin;
        let isRUser = req.body.isRUser;



        let adminrole =await Role.findOne({
            where: {
                name:roleAdmin
            }
        })
        let regularuserrole =await Role.findOne({
            where: {
                name:roleRegularUser
            }
        })

        let user =await User.findOne({

            where: { id: req.params.id }
        });

        if(!user){
            return res.status(401).send({ message:'no user found' });
        }

        let newUser =await User.findOne({

            where: {
                email: req.body.email,
                id: {[Op.not]:user.id}

            }
        });
        if(newUser){
            return res.status(400).send({ message: 'email already available'});
        }

        User.update(
            {
                username: req.body.username,
                email: req.body.email,
                active: req.body.status,
                password:  bcrypt.hashSync(req.body.password, 8),

            },
            { where: { id: req.params.id } }
        ).then(user => {
            if(user){
                Users_Roles.destroy({
                    where: {
                        userId :req.params.id
                    }

                }).then(deletedRecord=>{
                    if(deletedRecord>=1){
                        if(isAdmin ||isAdmin=='true'){
                            Users_Roles.create({
                                roleId: adminrole.id,
                                userId: req.params.id,

                            }).then(data=>{ console.log('Admin distroyee')})
                               .catch(err => {

                                    return res.status(500).send({ message: err.message });
                                });
                        }
                        if(isRUser||isRUser=='true'){
                            Users_Roles.create({
                                roleId: regularuserrole.id,
                                userId: req.params.id,

                            }).then(data=>{ console.log('')})
                              .catch(err => {

                                    return res.status(500).send({ message: err.message });
                                });
                        }
                        return res.status(200).send({ message: "successfully updated" });
                    }
                }).catch(err => {
                    return res.status(500).send({message: err.message });
                })
            }

        }).catch(err => {
            return res.status(401).send({ message: err.message });
        });

    }catch(err) {
        return res.status(500).send({message: err.message });
    }

};

exports.selectedRUserAdminStatusChange = async (req, res) => {

    try{

        let user =await User.findOne({

            where: { id: req.params.id }
        });

        if(!user){
            return res.status(401).send({ message: 'not found document'});
        }

        User.update(
            { active: !user.active},
            { where: { id: req.params.id } }
        ).then(data => {
            return res.status(200).send({ message: "successfully" });
        }).catch(err => {
            return res.status(401).send({ message: err.message });
        });


    }catch(err) {
        return res.status(500).send({message: err.message });
    }

};