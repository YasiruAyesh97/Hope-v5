const {fn,col} = require('sequelize');
const db = require("../models");
const Company = db.company;
const Op = db.Sequelize.Op;
let {superAdminCompany} = require('../config/default.js');

exports.registerCompany = async (req, res) => {

   try{

       let company =await Company.findOne({
           where: {
               name:req.body.name
           }
       })
       if(company){
           return res.status(400).send({ message: "company already registered" });
       }
       Company.create({
           name: req.body.name,

       })
           .then(company => {
               if(company){
                   return res.status(200).send({ message: "successfully inserted" });
               }

           })
           .catch(err => {
               return res.status(401).send({ message: err.message });
           });

   }catch(err) {
       return res.status(500).send({ message: err.message });
   }

};

exports.companyList = async (req, res) => {

    try{

        let company =await Company.findAll({

            attributes: [
                'id',
                'name',
                [fn('DATE', col('createdAt')), 'date'],
                ['active','status']

            ],
            where: {
                name: {
                    [Op.not]: superAdminCompany
                }
            }

        });

        if(company){
            return res.status(200).send(company);
        }


    }catch(err) {
        return res.status(500).send({ message: err.message });
    }

};

exports.activeCompanyList = async (req, res) => {

    try{

        let company =await Company.findAll({

            attributes: [
                'id',
                'name',
                [fn('DATE', col('createdAt')), 'date'],
                ['active','status']

            ],
            where: {
                name: {
                    [Op.not]: superAdminCompany
                },
                active:true
            }

        });

        if(company){
            return res.status(200).send(company);
        }


    }catch(err) {
        return res.status(500).send({ message: err.message });
    }

};


exports.selectedCompanyStatusChange = async (req, res) => {

    try{

        let company =await Company.findOne({

        where: { id: req.params.id }
        });

        if(!company){
            return res.status(401).send({ message: "No found company" });
        }

        Company.update(
            { active: !company.active},
            { where: { id: req.params.id } }
        ).then(company => {
            return res.status(200).send({ message: "successfully" });
         }).catch(err => {
            return res.status(401).send({ message: err.message });
         });


    }catch(err) {
        return res.status(500).send({message: err.message });
    }

};

exports.deleteSelectedCompany = async (req, res) => {

    try{

        let deletedRecord =await Company.destroy({
            where: {
                id :req.params.id
            }

        })

        if(deletedRecord == 1){
            return res.status(200).send({ message: "company deleted" });

        }


    }catch(err) {
        return res.status(500).send({ message: err.message });
    }

};