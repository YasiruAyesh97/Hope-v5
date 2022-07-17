import React, {useEffect, useState} from 'react'
import {Row, Col, Form, Button, FormCheck, Alert} from 'react-bootstrap'
import Card from '../../../components/Card'
import * as yup from "yup";
import { Formik } from "formik";

import {registerAdminOrUser,activeCompanyListData} from "../../../service/web/userService";

const schema = yup.object().shape({

    email: yup.string().required(),
    username: yup.string().required(),
    password: yup.string()
                .required("Password is required")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                )
                .label("Password"),
    companyId: yup.string().required("Company is required"),
    roles:yup.boolean().oneOf([true],'at least one role is required').required()

});
const AdminAdd =() =>{
    const [companyList,setCompanyList]=useState([])
    useEffect(() => {
        getCompanyList();
        setErrMsg('');
        setErrCode(0);
    }, [])

    async function getCompanyList(){
        const {data:companies} =await activeCompanyListData();
        setCompanyList(companies)
    }

    const [errMsg, setErrMsg] = useState('');
    const [errCode, setErrCode] = useState(0);

    //alert 200 404 500
    const [showSuccess ,setShowSuccess]= useState(false);
    const [showWarning,setShowWarning]= useState(false);
    const [showDanger,setShowDanger]= useState(false);

    useEffect(() => {
        if(showSuccess){
            setTimeout(() => {
                setShowSuccess(false)

            }, 30000)
        }if(showWarning){
            setTimeout(() => {
                if(showWarning){
                    setShowWarning(false)
                }
            }, 30000)
        }if(showDanger){
            setTimeout(() => {
                if(showDanger){
                    setShowDanger(false)
                }
            }, 30000)
        }

    },[showSuccess,showWarning,showDanger]);

    const handleSubmit = async (values,{resetForm }) => {
        try {

            const response = await registerAdminOrUser(values.email,values.username,values.password,values.companyId,values.checkadmin,values.checkuser);

            if(response){
                setErrCode(200);
                setShowSuccess(true);
                setErrMsg('Add new record successful');
                resetForm({})
            }

            // navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                setErrCode(500);
                setShowDanger(true)
            } else if (err.response?.status === 400) {
                setErrMsg('User already registered');
                setErrCode(400);
                setShowWarning(true)
            } else if (err.response?.status === 401) {
                setErrMsg('Registration Failed');
                setErrCode(401);
            } else if (err.response?.status === 403) {
                setErrCode(403);
            }else {
                setErrMsg('Registration Failed');
            }
        }
    }
   return(
       <>
          <div>
             <Row>
                <Col>
                   <Card>
                      <Card.Header className="d-flex justify-content-between">
                         <div className="header-title">
                            <h4 className="card-title">New User Information</h4>
                         </div>
                          <br/>
                          <Row className="justify-content-center">
                              <Col className="justify-content-center">
                                  <Alert variant="success alert-left alert-dismissible fade show mb-3" role="alert" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
                                      <span>{errMsg}</span>
                                  </Alert>
                                  <Alert variant="warning alert-left alert-dismissible fade show mb-3" role="alert" show={showWarning} onClose={() => setShowWarning(false)} dismissible>
                                      <span>{errMsg}</span>
                                  </Alert>
                                  <Alert variant="danger alert-left alert-dismissible fade show mb-3" role="alert" show={showDanger} onClose={() => setShowDanger(false)} dismissible>
                                      <span>{errMsg}</span>
                                  </Alert>
                              </Col>
                          </Row>

                      </Card.Header>

                      <Card.Body>

                         {/*<Card.Alert color="danger">done</Card.Alert>*/}
                         <div className="new-user-info">
                            <Formik
                                validationSchema={schema}
                                onSubmit={handleSubmit}

                                initialValues={{
                                   username: "",
                                   email: "",
                                   companyId:"",
                                   password:"",
                                   checkadmin:false,
                                   checkuser:false,
                                   roles:false


                                }}
                            >
                               {({
                                     handleSubmit,
                                     handleReset,
                                     handleChange,

                                     setFieldValue,
                                     dirty,
                                     isValid,
                                     values,
                                     touched,
                                     errors }) => (

                                   <form noValidate onSubmit={handleSubmit}>
                                      <div className="row">
                                         <Form.Group className="col-sm-12 form-group">
                                            <Form.Label>Company:</Form.Label>
                                            <Form.Select
                                                name="type"
                                                className="selectpicker form-control"
                                                data-style="py-0"
                                                value={values.companyId}
                                                onChange={handleChange("companyId")}
                                                isValid={touched.companyId && !errors.companyId}
                                                isInvalid={errors.companyId}
                                            >
                                                <option value="">select</option>
                                                {companyList.map((option) => (
                                                    <option value={option.id}>{option.name}</option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type={errors.companyId?"invalid":"valid"}>
                                               {errors.companyId}
                                            </Form.Control.Feedback>
                                         </Form.Group>


                                         <Form.Group className="form-group">
                                            <Form.Label htmlFor="username"> Username:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="username"
                                                name="username"
                                                placeholder=" "
                                                value={values.username}
                                                onChange={handleChange("username")}
                                                isValid={touched.username && !errors.username}
                                                isInvalid={errors.username}

                                            />
                                            <Form.Control.Feedback type={errors.username?"invalid":"valid"}>
                                               {errors.username}
                                            </Form.Control.Feedback>
                                         </Form.Group>

                                         <Form.Group className="form-group">
                                            <Form.Label htmlFor="email">Email address:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="email"
                                                name="email"
                                                placeholder=" "
                                                value={values.email}
                                                onChange={handleChange("email")}
                                                isValid={touched.email && !errors.email}
                                                isInvalid={errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                               {errors.email}
                                            </Form.Control.Feedback>

                                         </Form.Group>

                                          <Form.Group className="form-group">
                                              <Form.Label htmlFor="password">Password:</Form.Label>
                                              <Form.Control
                                                  type="password"
                                                  id="password"
                                                  name="password"
                                                  placeholder=" "
                                                  value={values.password}
                                                  onChange={handleChange("password")}
                                                  isValid={touched.password && !errors.password}
                                                  isInvalid={errors.password}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                  {errors.password}
                                              </Form.Control.Feedback>

                                          </Form.Group>




                                          <Form.Group className="form-group">
                                              <Form.Label htmlFor="password">User Role:</Form.Label>
                                              <br/>
                                              <Form.Check className=" form-check-inline">

                                                  <FormCheck.Label className="form-check-label pl-2" htmlFor="customCheck5">Admin</FormCheck.Label>
                                                  <FormCheck.Input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      id="checkadmin"
                                                      name="checkadmin"
                                                      checked={values.checkadmin}
                                                      onChange={() => {
                                                          const previous =values.checkadmin
                                                          setFieldValue("checkadmin", !previous)

                                                          if(!previous || values.checkuser){
                                                              setFieldValue("roles", true)
                                                          }else{
                                                              setFieldValue("roles", false)
                                                          }


                                                      }}


                                                      isValid={touched.checkadmin && !errors.roles}
                                                      isInvalid={errors.roles}


                                                  />

                                              </Form.Check>
                                              <br/>
                                              <Form.Check className=" form-check-inline">
                                                  <FormCheck.Label className="form-check-label pl-2" htmlFor="customCheck6">Regular User</FormCheck.Label>
                                                  <FormCheck.Input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      id="checkuser"
                                                      name="checkuser"
                                                      onChange={() => {

                                                          const previous =values.checkuser
                                                          setFieldValue("checkuser", !previous)

                                                          if(!previous || values.checkadmin){
                                                              setFieldValue("roles", true)
                                                          }else{
                                                              setFieldValue("roles", false)
                                                          }
                                                      }}
                                                      isValid={touched.checkuser && !errors.roles}
                                                      isInvalid={errors.roles}
                                                  />
                                                  <Form.Control.Feedback type="invalid" style={{marginRight: '2em',marginLeft: '-1.5em'}}>
                                                      {errors.roles}
                                                  </Form.Control.Feedback>
                                              </Form.Check>

                                          </Form.Group>

                                      </div>
                                      <Button
                                          type="submit"
                                          variant="btn btn-primary"
                                          disabled={!(dirty && isValid)}
                                      >Submit</Button>{' '}
                                      <Button type="reset" variant="secondary" onClick={handleReset}> Reset </Button>

                                   </form>
                               )}
                            </Formik>
                         </div>
                      </Card.Body>

                   </Card>
                </Col>
             </Row>
          </div>
       </>
   )

}

export default AdminAdd;