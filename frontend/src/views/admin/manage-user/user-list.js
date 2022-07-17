import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Modal, Form, FormCheck} from 'react-bootstrap'
import Card from '../../../components/Card'
import * as yup from "yup";
import {
   RegularUserDataFetch,
   selectedRegularUserDelete,
   selectedRegularUserStatusUpdate,
   getDecodeJwt
} from "../../../service/web/userService";

const schema = yup.object().shape({

   email: yup.string().required(),
   username: yup.string().required(),
   password: yup.string().required(),
   companyId: yup.string().required("Company is required"),
   roles:yup.boolean().oneOf([true],'at least one role is required').required()

});


const UserList =() =>{
   const auth = getDecodeJwt();
   //initial record
   const [regularUserList,setRegularUserList]=useState([])
   //initial data load
   useEffect(() => {
      getRegularUserDataList();
   }, [])

   async function getRegularUserDataList(){
      try{
         const {data:user} =await RegularUserDataFetch(auth.companyId);
         setRegularUserList(user)
      }catch (err) {

      }
   }


   //edit model
   const [show, setShow] = useState(false);
   const [initialValues,setInitialValues]=useState({
      username: "",
      email: "",
      password:"",
      isAdmin:false,
      isRUser:false,
      roles:false,
      status:false,
   })

   //edit model
   const handleCloseEdit = () => setShow(false);

   const handleShowEdit = (item) =>{

      setSelectRow(item)
      setInitialValues({
         username:item.username,
         email: item.email,
         // companyId:item.companyId,
         password:item.password,
         isAdmin:item.isAdmin,
         isRUser:item.isRUser,
         roles:item.roles,
         status:item.status,
      })

      setShow(true)

   };

   //delete model
   const [show1, setShow1] = useState(false);
   const [selectRow, setSelectRow] = useState('');

   const handleCloseDelete = () => setShow1(false);
   const handleShowDelete = (item) =>{
      setSelectRow(item)
      setShow1(true)
   };

//delete record
   const  deleteRecord= async () =>{

      try{
         const response =await selectedRegularUserDelete(selectRow.id)
         if(response){
            let newArr = [...regularUserList];
            const result = newArr.filter(item => item.id != selectRow.id);
            setRegularUserList(result)
            setShow1(false)
         }

      }catch (err) {

      }
   };


   //handle toggle
   const  handleToggle=async (item,idx)=>{

      try{
         const response = await selectedRegularUserStatusUpdate(item.id)
         if(response){
            let newArr = [...regularUserList];
            newArr[idx]['status']= newArr[idx]['status']?0:1

            setRegularUserList(newArr)
         }
      }catch (err) {

      }

   }

   return(
       <>
          <div>
             <Row>
                <Col sm="12">
                   <Card>
                      <Card.Header className="d-flex justify-content-between">
                         <div className="header-title">
                            <h4 className="card-title">Users List</h4>
                         </div>
                      </Card.Header>
                      <Card.Body className="px-0">
                         <div className="table-responsive">
                            <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                               <thead>
                               <tr className="ligth">
                                  <th className="d-none">id</th>
                                  <th>Username</th>
                                  <th>Email</th>
                                  <th>Join Date</th>
                                  <th>Status</th>

                                  <th min-width= "100px">Action</th>
                               </tr>
                               </thead>
                               <tbody>
                               {
                                  regularUserList.map((item,idx) => (
                                      <tr key={idx}>

                                         <td className="d-none">{item.id}</td>
                                         <td>{item.username}</td>
                                         <td>{item.email}</td>
                                         <td>{item.date}</td>
                                         <td><span className={`badge ${item.status?"bg-primary":"bg-danger"}`}>{item.status?"Active":"Inactive"}</span></td>
                                         <td>
                                            <div className="flex align-items-center list-user-action">
                                                <div className="d-flex flex-row">
                                                   <Form.Check className="form-switch">
                                                      <FormCheck.Input
                                                          className="form-check-input"
                                                          type="checkbox"
                                                          id="rowcheck{item.id}"
                                                          checked={item.status?true:false}
                                                          onChange={()=>handleToggle(item,idx)}
                                                      />

                                                   </Form.Check>


                                                   {' '}
                                                   <Button className="btn btn-sm btn-icon btn-danger" variant="danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" onClick={() =>handleShowDelete(item) }>
                                                      {/*<Button className="btn btn-sm btn-icon btn-warning" variant="warning" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" onClick={() =>handleShowEdit(item) }>*/}
                                                      {/*    <span className="btn-inner">*/}
                                                      {/*       <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                                      {/*          <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>*/}
                                                      {/*          <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>*/}
                                                      {/*          <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>*/}
                                                      {/*       </svg>*/}
                                                      {/*    </span>*/}
                                                      {/*</Button>{' '}*/}

                                                      <span className="btn-inner">
                                             <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                             </svg>
                                          </span>
                                                   </Button>{' '}
                                                </div>

                                            </div>
                                         </td>
                                      </tr>))}
                               </tbody>
                            </table>
                         </div>




                         {/*edit model*/}

                         {/*<Modal show={show} onHide={handleCloseEdit}>*/}
                         {/*   <Modal.Header closeButton>*/}
                         {/*      <Modal.Title>Edit User</Modal.Title>*/}
                         {/*   </Modal.Header>*/}
                         {/*   <Modal.Body>*/}



                         {/*      <Formik*/}
                         {/*          // validationSchema={schema}*/}
                         {/*          onSubmit={handleSubmit}*/}

                         {/*          initialValues={initialValues}*/}
                         {/*      >*/}
                         {/*         {({*/}
                         {/*              handleSubmit,*/}
                         {/*              handleReset,*/}
                         {/*              handleChange,*/}

                         {/*              setFieldValue,*/}

                         {/*              values,*/}
                         {/*              touched,*/}
                         {/*              errors }) => (*/}

                         {/*             <form noValidate onSubmit={handleSubmit}>*/}
                         {/*                <div className="row">*/}



                         {/*                   <Form.Group className="mb-3">*/}
                         {/*                      <Form.Label htmlFor="email">Email address:</Form.Label>*/}
                         {/*                      <Form.Control*/}
                         {/*                          type="text"*/}
                         {/*                          id="email"*/}
                         {/*                          name="email"*/}
                         {/*                          placeholder="Enter Email address"*/}
                         {/*                          value={values.email}*/}
                         {/*                          onChange={handleChange("email")}*/}
                         {/*                          isValid={touched.email && !errors.email}*/}
                         {/*                          isInvalid={!!errors.email}*/}
                         {/*                      />*/}
                         {/*                      <Form.Control.Feedback type="invalid">*/}
                         {/*                         {errors.email}*/}
                         {/*                      </Form.Control.Feedback>*/}

                         {/*                   </Form.Group>*/}

                         {/*                   <Form.Group className="form-group">*/}
                         {/*                      <Form.Label htmlFor="password">Change Password:</Form.Label>*/}
                         {/*                      <Form.Control*/}
                         {/*                          type="password"*/}
                         {/*                          id="password"*/}
                         {/*                          name="password"*/}
                         {/*                          placeholder="Enter new password"*/}
                         {/*                          value={values.password}*/}
                         {/*                          onChange={handleChange("password")}*/}
                         {/*                          isValid={touched.password && !errors.password}*/}
                         {/*                          isInvalid={!!errors.password}*/}
                         {/*                      />*/}
                         {/*                      <Form.Control.Feedback type="invalid">*/}
                         {/*                         {errors.password}*/}
                         {/*                      </Form.Control.Feedback>*/}

                         {/*                   </Form.Group>*/}

                         {/*                   <Form.Group className="form-group">*/}
                         {/*                      <Form.Label htmlFor="password">Active status:</Form.Label>*/}
                         {/*                      <Form.Check className="form-switch">*/}
                         {/*                         <FormCheck.Input*/}
                         {/*                             className="form-check-input"*/}
                         {/*                             type="checkbox"*/}
                         {/*                             id="rowcheck{item.id}"*/}
                         {/*                             checked={values.status}*/}
                         {/*                             onChange={() => setFieldValue("status", !values.status)}*/}
                         {/*                          */}
                         {/*                         />*/}
                         {/*                         /!*<FormCheck.Label className="form-check-label" htmlFor="flexSwitchCheckChecked">Checked switch checkbox input</FormCheck.Label>*!/*/}
                         {/*                      </Form.Check>*/}
                         {/*                      <Form.Control.Feedback type="invalid">*/}
                         {/*                         {errors.password}*/}
                         {/*                      </Form.Control.Feedback>*/}

                         {/*                   </Form.Group>*/}


                         {/*                </div>*/}


                         {/*                <Button type="submit" variant="primary">*/}
                         {/*                   Save*/}
                         {/*                </Button>{' '}*/}
                         {/*                <Button variant="danger" onClick={handleCloseEdit}>*/}
                         {/*                   Cancel*/}
                         {/*                </Button>*/}

                         {/*             </form>*/}
                         {/*         )}*/}
                         {/*      </Formik>*/}

                         {/*   </Modal.Body>*/}
                         {/*</Modal>*/}
                         {/*delete model*/}
                         <Modal
                             show={show1}
                             onHide={handleCloseDelete}
                             backdrop="static"
                             keyboard={false}
                         >
                            <Modal.Header closeButton>
                               <Modal.Title>Delete Record</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                               Are You sure you want to delete this record?
                            </Modal.Body>
                            <Modal.Footer>
                               <Button variant="secondary" onClick={handleCloseDelete}>
                                  Close
                               </Button>
                               <Button variant="danger"   onClick={deleteRecord}>Delete</Button>
                            </Modal.Footer>
                         </Modal>
                      </Card.Body>
                   </Card>
                </Col>
             </Row>
          </div>
       </>
   )

}

export default UserList;