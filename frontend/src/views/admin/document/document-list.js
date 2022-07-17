import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Modal, Form, FormCheck, Alert} from 'react-bootstrap'
import Card from '../../../components/Card'
import {
   documentListDataFetch,
   selectedDocumentStatusUpdate,
   selectedDocumentDelete,
   selectedDocumentDataFetch,
   selectedDocumentUpdate,
   activeCatalog1DataFetch,
   activeCatalog2DataFetch,
   activeCatalog3DataFetch,
   getDecodeJwt

} from "../../../service/web/userService";

import {Formik} from "formik";
import * as yup from "yup";


const schema = yup.object().shape({
   name: yup.string().required().label("name"),
   dueDate: yup.string().required().label("due date"),
   agentName: yup.string().required().label("agent name"),
   catalog1Id: yup.string().required().label("catalog 1"),
   catalog2Id: yup.string().required().label("catalog 2"),
   catalog3Id: yup.string().required().label("catalog 3"),
});

const UserList =() =>{
   const auth = getDecodeJwt();

   //initial record
   const [documentList,setDocumentList]=useState([])

   const [catalog1List,setCatalog1List]=useState([])
   const [catalog2List,setCatalog2List]=useState([])
   const [catalog3List,setCatalog3List]=useState([])

   const [errMsg, setErrMsg] = useState('');
   const [errCode, setErrCode] = useState(0);

   //alert 200 404 500
   const [showWarning,setShowWarning]= useState(false);
   const [showDanger,setShowDanger]= useState(false);

   //initial data load
   useEffect(() => {
      getDocumentDataList();
      getCatalogList();
   }, [])

   async function getDocumentDataList(){
      const {data:doc} =await documentListDataFetch(auth.companyId);
      setDocumentList(doc)
   }

   async function getCatalogList(){
      try{
         const {data:catalog1} =await activeCatalog1DataFetch(auth.companyId);
         const {data:catalog2} =await activeCatalog2DataFetch(auth.companyId);
         const {data:catalog3} =await activeCatalog3DataFetch(auth.companyId);

         setCatalog1List(catalog1)
         setCatalog2List(catalog2)
         setCatalog3List(catalog3)
      }catch (e) {

      }

   }
   //handle delete

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
         const response =await selectedDocumentDelete(selectRow.id)
         if(response){
            let newArr = [...documentList];
            const result = newArr.filter(item => item.id != selectRow.id);
            setDocumentList(result)
            setShow1(false)
         }

      }catch (err) {

      }
   };

   //handle toggle
   const  handleToggle=async (item,idx)=>{

      //update db api
      try{
         const response = await selectedDocumentStatusUpdate(item.id)
         if(response){
            let newArr = [...documentList];
            newArr[idx]['status']= newArr[idx]['status']?0:1
            setDocumentList(newArr)
         }
      }catch (err) {

      }

   }
   //edit model
   const [show, setShow] = useState(false);
   const [initialValues,setInitialValues]=useState({
      name:"",
      dueDate: "",
      agentName: "",
      catalog1Id : "",
      catalog2Id : "",
      catalog3Id : "",


   })

   const handleCloseEdit = () => setShow(false);

   const handleShowView =async (item) =>{

      try{
         setSelectRow(item)

         const {data:doc} =await selectedDocumentDataFetch(item.id);


         setInitialValues({
            name:doc.name,
            catalog1Id: doc.catalog1Id,
            catalog2Id: doc.catalog2Id,
            catalog3Id: doc.catalog3Id,
            dueDate: doc.dueDate.substring(0,10),
            agentName: doc.agentName,

         })

         setShow(true)
      }catch(err){

      }
   };

   const handleSubmit= async (values)=>{
      try {
         const response = await selectedDocumentUpdate(selectRow.id,values.name,values.dueDate,values.agentName,values.catalog1Id,values.catalog2Id,values.catalog3Id,auth.companyId,auth.id);

         if(response){
            setErrCode(200);
            setErrMsg('Add new record successful');
            getDocumentDataList()
         }
         handleCloseEdit()

      } catch (err) {
         if (!err?.response) {
            setErrMsg('No Server Response');
            setErrCode(500);
            setShowDanger(true)
         } else if (err.response?.status === 400) {
            setErrMsg('Document Name Already Inserted!');
            setErrCode(400);
            setShowWarning(true)
         } else if (err.response?.status === 401) {
            setErrMsg('Document Insertion Failed');
            setErrCode(401);
            setShowWarning(true)
         }  else if (err.response?.status === 403) {
            setErrCode(403);
         } else {
            setErrMsg('Document Insertion Failed');
            setShowDanger(true);
         }
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
                            <h4 className="card-title">Document List</h4>
                         </div>

                      </Card.Header>
                      <Card.Body className="px-0">
                         <div className="table-responsive">
                            <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                               <thead>
                               <tr className="ligth">

                                  <th>Name</th>

                                  <th>Status</th>

                                  <th>Catalog 1</th>
                                  <th>Catalog 2</th>
                                  <th>Catalog 3</th>
                                  <th>Due Date</th>
                                  <th min-width= "100px">Action</th>
                               </tr>
                               </thead>
                               <tbody>
                               {
                                  documentList.map((item,idx) => (
                                      <tr key={idx}>
                                         <td>{item.name}</td>
                                         <td><span className={`badge ${item.status?"bg-primary":"bg-danger"}`}>{item.status?"active":"inactive"}</span></td>
                                         <td>{item.catalog1name}</td>
                                         <td>{item.catalog2name}</td>
                                         <td>{item.catalog3name}</td>
                                         <td>{item.dueDate}</td>
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
                                                  <Button style={{ marginRight: 4 }} className="btn btn-sm btn-icon " variant="warning" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" to="#" onClick={()=>handleShowView(item)}>
                                                     <span className="btn-inner">
                                                      <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                         <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                         <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                         <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                      </svg>
                                                      </span>
                                                  </Button>
                                                  {' '}
                                                  <Button className="btn btn-sm btn-icon " variant="danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" to="#" onClick={()=>handleShowDelete(item)}>
                                                     <span className="btn-inner">
                                                        <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                           <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                           <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                           <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                     </span>
                                                  </Button>
                                                  {' '}
                                               </div>
                                            </div>
                                         </td>
                                      </tr>))}
                               </tbody>
                            </table>
                         </div>
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
                               <Button variant="danger"  onClick={deleteRecord}>Delete</Button>
                            </Modal.Footer>
                         </Modal>

                      {/*view model*/}

                         <Modal show={show} onHide={handleCloseEdit}>
                            <Modal.Header closeButton>
                               <Modal.Title>Document Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                               <Row className="justify-content-center">
                                  <Col className="justify-content-center">
                                     <Alert variant="warning alert-left alert-dismissible fade show mb-3" role="alert" show={showWarning} onClose={() => setShowWarning(false)} dismissible>
                                        <span>{errMsg}</span>
                                     </Alert>
                                     <Alert variant="danger alert-left alert-dismissible fade show mb-3" role="alert" show={showDanger} onClose={() => setShowDanger(false)} dismissible>
                                        <span>{errMsg}</span>
                                     </Alert>
                                  </Col>
                               </Row>
                               <br/>
                                  <Formik
                                      validationSchema={schema}
                                      onSubmit={handleSubmit}
                                      initialValues={initialValues}
                                  >
                                     {({
                                          handleSubmit,
                                          handleReset,
                                          handleChange,

                                          setFieldValue,
                                          dirty,
                                          isValid,
                                          isInvalid,
                                          values,
                                          touched,
                                          errors }) => (

                                         <form noValidate onSubmit={handleSubmit}>
                                            <div className="row">
                                               <Form.Group className="form-group">
                                                  <Form.Label htmlFor="name"> Name:</Form.Label>
                                                  <Form.Control
                                                      type="text"
                                                      id="name"
                                                      name="name"
                                                      placeholder=" "
                                                      value={values.name}
                                                      onChange={handleChange("name")}
                                                      isValid={touched.name && !errors.name}
                                                      isInvalid={errors.name}

                                                  />
                                                  <Form.Control.Feedback type={errors.name?"invalid":"valid"}>
                                                     {errors.name}
                                                  </Form.Control.Feedback>
                                               </Form.Group>

                                               <Form.Group className="col-sm-12 form-group">
                                                  <Form.Label>Catalog1 :</Form.Label>
                                                  <Form.Select
                                                      name="catalog1Id"
                                                      className="selectpicker form-control"
                                                      data-style="py-0"
                                                      value={values.catalog1Id}
                                                      onChange={handleChange("catalog1Id")}
                                                      isValid={touched.catalog1Id && !errors.catalog1Id}
                                                      isInvalid={errors.catalog1Id}
                                                  >
                                                     <option value="">select</option>
                                                     {catalog1List.map((option) => (
                                                         <option key={option.id} value={option.id}>{option.name}</option>
                                                     ))}
                                                  </Form.Select>
                                                  <Form.Control.Feedback type={errors.catalog1Id?"invalid":"valid"}>
                                                     {errors.catalog1Id}
                                                  </Form.Control.Feedback>
                                               </Form.Group>

                                               <Form.Group className="col-sm-12 form-group">
                                                  <Form.Label>Catalog2 :</Form.Label>
                                                  <Form.Select
                                                      name="catalog2Id"
                                                      className="selectpicker form-control"
                                                      data-style="py-0"
                                                      value={values.catalog2Id}
                                                      onChange={handleChange("catalog2Id")}
                                                      isValid={touched.catalog2Id && !errors.catalog2Id}
                                                      isInvalid={errors.catalog2Id}
                                                  >
                                                     <option value="">select</option>
                                                     {catalog2List.map((option) => (
                                                         <option key={option.id} value={option.id}>{option.name}</option>
                                                     ))}
                                                  </Form.Select>
                                                  <Form.Control.Feedback type={errors.catalog2Id?"invalid":"valid"}>
                                                     {errors.catalog2Id}
                                                  </Form.Control.Feedback>
                                               </Form.Group>

                                               <Form.Group className="col-sm-12 form-group">
                                                  <Form.Label>Catalog3 :</Form.Label>
                                                  <Form.Select
                                                      name="catalog3Id"
                                                      className="selectpicker form-control"
                                                      data-style="py-0"
                                                      value={values.catalog3Id}
                                                      onChange={handleChange("catalog3Id")}
                                                      isValid={touched.catalog3Id && !errors.catalog3Id}
                                                      isInvalid={errors.catalog3Id}
                                                  >
                                                     <option value="">select</option>
                                                     {catalog3List.map((option) => (
                                                         <option key={option.id} value={option.id}>{option.name}</option>
                                                     ))}
                                                  </Form.Select>
                                                  <Form.Control.Feedback type={errors.catalog3Id?"invalid":"valid"}>
                                                     {errors.catalog3Id}
                                                  </Form.Control.Feedback>
                                               </Form.Group>

                                               <Form.Group className="form-group">
                                                  <Form.Label htmlFor="agentName">Agent Name:</Form.Label>
                                                  <Form.Control
                                                      type="text"
                                                      id="agentName"
                                                      name="agentName"
                                                      placeholder=" "
                                                      value={values.agentName}
                                                      onChange={handleChange("agentName")}
                                                      isValid={touched.agentName && !errors.agentName}
                                                      isInvalid={errors.agentName}
                                                  />
                                                  <Form.Control.Feedback type="invalid">
                                                     {errors.agentName}
                                                  </Form.Control.Feedback>

                                               </Form.Group>

                                               <Form.Group className="form-group">
                                                  <Form.Label htmlFor="dueDate">dueDate:</Form.Label>
                                                  <Form.Control
                                                      type="date"
                                                      id="dueDate"
                                                      name="dueDate"
                                                      placeholder="Due Date"
                                                      value={values.dueDate}
                                                      onChange={handleChange("dueDate")}
                                                      isValid={touched.dueDate && !errors.dueDate}
                                                      isInvalid={errors.dueDate}
                                                  />
                                                  <Form.Control.Feedback type="invalid">
                                                     {errors.dueDate}
                                                  </Form.Control.Feedback>

                                               </Form.Group>


                                            </div>
                                            <Button
                                                type="submit"
                                                variant="btn btn-primary"
                                                disabled={!(dirty && isValid)}
                                            >Submit</Button>{' '}
                                            <Button variant="danger" onClick={handleCloseEdit}>
                                               Cancel
                                            </Button>
                                         </form>
                                     )}
                                  </Formik>


                            </Modal.Body>
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