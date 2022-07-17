import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Modal, Form, FormCheck} from 'react-bootstrap'
import Card from '../../../components/Card'

import {catalog1DataFetch,selectedCatalog1StatusUpdate,selectedCatalog1Delete,getDecodeJwt} from "../../../service/web/userService";

const UserList =() =>{
   const  auth  = getDecodeJwt();
   //initial record
   const [catalog1List,setCatalog1List]=useState([])
   //initial data load
   useEffect(() => {
      getCatalog1DataList();
   }, [])

   async function getCatalog1DataList(){
      const {data:company} =await catalog1DataFetch(auth.companyId);
      setCatalog1List(company)

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
         const response =await selectedCatalog1Delete(selectRow.id)
         if(response){

            let newArr = [...catalog1List];
            const result = newArr.filter(item => item.id != selectRow.id);
            setCatalog1List(result)
            setShow1(false)
         }

      }catch (err) {

      }
   };

   //handle toggle
   const  handleToggle=async (item,idx)=>{
      //update db api
      try{
         const response = await selectedCatalog1StatusUpdate(item.id)
         if(response){
            let newArr = [...catalog1List];
            newArr[idx]['status']= newArr[idx]['status']?0:1
            setCatalog1List(newArr)
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
                            <h4 className="card-title">Catalog 1</h4>
                         </div>
                      </Card.Header>
                      <Card.Body className="px-0">
                         <div className="table-responsive">
                            <table id="user-list-table" className="table table-striped" role="grid" data-toggle="data-table">
                               <thead>
                               <tr className="ligth">
                                  <th>Name</th>
                                  <th>Status</th>
                                  <th>Date</th>
                                  <th min-width= "100px">Action</th>
                               </tr>
                               </thead>
                               <tbody>
                               {
                                  catalog1List.map((item,idx) => (
                                      <tr key={idx}>
                                         <td>{item.name}</td>
                                         <td><span className={`badge ${item.status?"bg-primary":"bg-danger"}`}>{item.status?"active":"inactive"}</span></td>
                                         <td>{item.date}</td>
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


                                                  <Button className="btn btn-sm btn-icon " variant="danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" to="#" onClick={()=>handleShowDelete(item)}>
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



                      </Card.Body>
                   </Card>
                </Col>
             </Row>
          </div>
       </>
   )

}

export default UserList;