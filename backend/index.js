const express = require('express');
const cors = require('cors');
let bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
let {superAdminCompany,roleSuperAdmin,roleAdmin,roleRegularUser,superAdminUsername,superAdminEmail,superAdminPassword} = require('./config/default.js');

const db = require('./models')
const Role = db.role;
const User = db.user;
const UserRole = db.users_roles;
const Company = db.company;

// Routers

require('./routes/auth.routes')(app);
require('./routes/company.routes')(app);
require('./routes/superadmin.routes')(app);
require('./routes/admin.routes')(app);
require('./routes/catalog1.routes')(app);
require('./routes/catalog2.routes')(app);
require('./routes/catalog3.routes')(app);
require('./routes/document.routes')(app);

db.sequelize.sync({alter:true}).then(() => {

  console.log('Drop and Re-sync of DB');
  initial();

  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

function initial() {

  Company.findOne({
    where: {
      name:superAdminCompany
    }
  }).then(c => {
     if(!c){
       Company.create({
         name:superAdminCompany
       }).then(company => {

         Role.findOne({
           where: {
             name:roleSuperAdmin
           }
         }).then(role => {
           if(!role){
             Role.create({
               name: roleSuperAdmin
             }).then((role) => {

               User.findOne({
                 where: {
                   email:superAdminEmail
                 }

               }).then(user => {
                 if(!user){
                   User.create({
                     "username": superAdminUsername,
                     "email": superAdminEmail,
                     "password":  bcrypt.hashSync(superAdminPassword, 8),
                     "companyId": company.id,
                   }).then(user=>{

                     UserRole.create({
                       roleId:role.id,
                       userId:user.id
                     })
                   })
                       .catch(err => {
                         console.log("err in initial function1"+err)
                       });
                 }
               }).catch(err => {
                 console.log("err in initial function"+err)
               });


             }).catch(err => {
               console.log("err in initial function2"+err)
             });
           }

         }).catch(err => {
           console.log("err in initial function3"+err)
         });
       })
     }
  }).catch(err => {
        console.log("err in initial function4"+err)
   });


  Role.findOne({
    where: {
      name:roleAdmin
    }
  }).then(role => {
    if(!role){
      Role.create({
        name: roleAdmin
      });
    }

  }).catch(err => {
    console.log("err in initial function"+err)
  });

  Role.findOne({
    where: {
      name:roleRegularUser
    }
  }).then(role => {
    if(!role){
      Role.create({
        name: roleRegularUser
      });
    }

  }).catch(err => {
    console.log("err in initial function"+err)
  });


}