import jwtDecode from "jwt-decode";
import axios from "axios";
const config = require("../../config.json");


export async function login(email,password){
    const {data:jwt} =await axios.post(`${config["BASEURL"]}`+'/'+'api/auth/signin',{email,password});

    if(jwt){
        sessionStorage.setItem('userToken',jwt);
        return true;
    }
    return null;
}

export async function registerAdminOrUser(email,username,password,companyId,checkadmin,checkuser) {
  return await axios.post(`${config["BASEURL"]}`+'/'+'api/auth/signup',{email,username,password,companyId,checkadmin,checkuser},{
      headers: {
          'x-access-token': sessionStorage.getItem('userToken')
      }});
}
//
export function registerCompany(name){
  return  axios.post(`${config["BASEURL"]}`+'/'+'api/company/register',{name},{
      headers: {
          'x-access-token': sessionStorage.getItem('userToken')
      }});
}


export function companyListData(){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/company/all',{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function activeCompanyListData(){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/company/active-all',{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function adminRegularUserData(){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/super-admin/user-list',{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedUserDataFetch(id){
    return  axios.post(`${config["BASEURL"]}`+'/'+'api/super-admin/selected-user',{id},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedRegularUserOrAdminUpdate(id,username,email,password,status,isAdmin,isRUser){
    return  axios.put(`${config["BASEURL"]}`+'/'+'api/super-admin/edit-user'+'/'+id,{username, email, password,status, isAdmin, isRUser},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedRegularUserOrAdminStatusUpdate(id){
    return  axios.put(`${config["BASEURL"]}`+'/'+'api/super-admin/status'+'/'+id,{},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedUserDataDelete(id){
    return  axios.delete(`${config["BASEURL"]}`+'/'+'api/super-admin/delete-user'+'/'+id),{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }};
}

export function selectedCompanyStatusUpdate(id){
    return  axios.put(`${config["BASEURL"]}`+'/'+'api/company/status'+'/'+id,{},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedCompanyDelete(id){
    return  axios.delete(`${config["BASEURL"]}`+'/'+'api/company/delete'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

//admin

export async function registerRegularUser(email,username,password,companyId) {
    return await axios.post(`${config["BASEURL"]}`+'/'+'api/admin/add',{email,username,password,companyId},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function RegularUserDataFetch(companyId){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/admin/user-list'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedRegularUserDelete(id){
    return  axios.delete(`${config["BASEURL"]}`+'/'+'api/admin/delete-user'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedRegularUserStatusUpdate(id){
    return  axios.put(`${config["BASEURL"]}`+'/'+'api/admin/status'+'/'+id,{},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}


export function catalogRecordRegister(type,name,companyId){
    return  axios.post(`${config["BASEURL"]}`+'/'+'api/catalog'+`${type}`+'/insert',{name,companyId},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

//catalog 1
export function catalog1DataFetch(companyId){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/catalog1/all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function activeCatalog1DataFetch(companyId){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/catalog1/active-all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedCatalog1StatusUpdate(id){
    return  axios.put(`${config["BASEURL"]}`+'/'+'api/catalog1/status'+'/'+id,{},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedCatalog1Delete(id){
    return  axios.delete(`${config["BASEURL"]}`+'/'+'api/catalog1/delete'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
//catalog 2
export function catalog2DataFetch(companyId){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/catalog2/all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function activeCatalog2DataFetch(companyId){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/catalog2/active-all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedCatalog2StatusUpdate(id){
    return  axios.put(`${config["BASEURL"]}`+'/'+'api/catalog2/status'+'/'+id,{},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedCatalog2Delete(id){
    return  axios.delete(`${config["BASEURL"]}`+'/'+'api/catalog2/delete'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
//catalog 3
export function catalog3DataFetch(companyId){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/catalog3/all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function activeCatalog3DataFetch(companyId){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/catalog3/active-all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedCatalog3StatusUpdate(id){
    return  axios.put(`${config["BASEURL"]}`+'/'+'api/catalog3/status'+'/'+id,{},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedCatalog3Delete(id){
    return  axios.delete(`${config["BASEURL"]}`+'/'+'api/catalog3/delete'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

//document
export function documentListDataFetch(companyId){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/document/all'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedDocumentDataFetch(id){
    return  axios.get(`${config["BASEURL"]}`+'/'+'api/document'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedDocumentDelete(id){
    return  axios.delete(`${config["BASEURL"]}`+'/'+'api/document/delete'+'/'+id,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}
export function selectedDocumentStatusUpdate(id){
    return  axios.put(`${config["BASEURL"]}`+'/'+'api/document/status'+'/'+id,{},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}


export function documentRecordInsert(name,dueDate,agentName,catalog1Id,catalog2Id,catalog3Id,companyId,userId){
    return  axios.post(`${config["BASEURL"]}`+'/'+'api/document/insert',{name,dueDate,agentName,catalog1Id,catalog2Id,catalog3Id,companyId,userId},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function expiresSoonDocumentListDataFetch(companyId){

    return  axios.get(`${config["BASEURL"]}`+'/'+'api/document/expiresoon'+'/'+companyId,{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function selectedDocumentUpdate(id,name,dueDate,agentName,catalog1Id,catalog2Id,catalog3Id,companyId,userId){
    return  axios.put(`${config["BASEURL"]}`+'/'+'api/document'+'/'+id,{name,dueDate,agentName,catalog1Id,catalog2Id,catalog3Id,companyId,userId},{
        headers: {
            'x-access-token': sessionStorage.getItem('userToken')
        }});
}

export function logout(){
    sessionStorage.removeItem('userToken');
}
export function getJwt(){
    return sessionStorage.getItem('userToken');
}


export function getDecodeJwt(){
    const jwt =sessionStorage.getItem('userToken')
 return jwtDecode(jwt);
}