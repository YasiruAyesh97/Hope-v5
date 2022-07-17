const {fn,col} = require('sequelize');
const db = require("../models");
const Company = db.company;
const Catalog_1 = db.catalog_3;
const Op = db.Sequelize.Op;

exports.insertCatalog1 = async (req, res) => {

   try{

       let catalog =await Catalog_1.findOne({
           where: {
               name:req.body.name
           }
       })
       if(catalog){
           return res.status(400).send({ message: "catalog list already registered" });
       }
       Catalog_1.create({
           name: req.body.name,
           companyId:req.body.companyId

       })
           .then(c => {
               if(c){
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

exports.catalog1List = async (req, res) => {

    try{

        let company =await Catalog_1.findAll({

            attributes: [
                'id',
                'name',
                [fn('DATE', col('createdAt')), 'date'],
                ['active','status']

            ],
            where: {
                companyId : req.params.companyId
            }


        });

        if(company){
            return res.status(200).send(company);
        }


    }catch(err) {
        return res.status(500).send({ message: err.message });
    }

};

exports.activeCatalog1List = async (req, res) => {

    try{

        let company =await Catalog_1.findAll({

            attributes: [
                'id',
                'name',
                [fn('DATE', col('createdAt')), 'date'],
                ['active','status']

            ],
            where: {
                companyId : req.params.companyId,
                active : true
            }

        });

        if(company){
            return res.status(200).send(company);
        }


    }catch(err) {
        return res.status(500).send({ message: err.message });
    }

};


exports.selectedCatalog1StatusChange = async (req, res) => {

    try{

        let ct1 =await Catalog_1.findOne({

        where: { id: req.params.id }
        });

        if(!ct1){
            return res.status(401).send({ message: 'not found catalog'});
        }

        Catalog_1.update(
            { active: !ct1.active},
            { where: { id: req.params.id } }
        ).then(company => {
            return res.status(200).send({ message: "successfully" });
         }).catch(err => {
            return  res.status(401).send({ message: err.message });
         });


    }catch(err) {
        return res.status(500).send({message: err.message });
    }

};

exports.deleteSelectedCatalog = async (req, res) => {

    try{

        let deletedRecord =await Catalog_1.destroy({
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