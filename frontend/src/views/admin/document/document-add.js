import React, {useEffect, useState} from 'react'
import {Row, Col, Form, Button, FormCheck, Alert, Modal} from 'react-bootstrap'
import Card from '../../../components/Card'
import * as yup from "yup";
import { Formik } from "formik";

import {
    activeCatalog1DataFetch,
    activeCatalog2DataFetch,
    activeCatalog3DataFetch,
    documentRecordInsert,
    getDecodeJwt
} from "../../../service/web/userService";

const schema = yup.object().shape({
    name: yup.string().required().label("name"),
    dueDate: yup.string().required().label("due date"),
    agentName: yup.string().required().label("agent name"),
    catalog1Id: yup.string().required().label("catalog 1"),
    catalog2Id: yup.string().required().label("catalog 2"),
    catalog3Id: yup.string().required().label("catalog 3"),
});
const AdminAdd =() =>{
    const auth = getDecodeJwt();
    const [catalog1List,setCatalog1List]=useState([])
    const [catalog2List,setCatalog2List]=useState([])
    const [catalog3List,setCatalog3List]=useState([])

    useEffect(() => {
        getCatalogList();
        setErrMsg('');
        setErrCode(0);
    }, [])
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

    //document add
    const handleSubmit = async (values,{resetForm}) => {
        try {


            const response = await documentRecordInsert(values.name,values.dueDate,values.agentName,values.catalog1Id,values.catalog2Id,values.catalog3Id,auth.companyId,auth.id);

            if(response){
                setErrCode(200);
                setErrMsg('Add new record successful');
                resetForm({})
                setShowSuccess(true)
            }

            // navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                setErrCode(500);
                setShowDanger(true)
            } else if (err.response?.status === 400) {
                setErrMsg('Document Already Inserted!');
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
                                    <h4 className="card-title">New Document Information</h4>
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
                                            name: "",
                                            dueDate: "",
                                            agentName: "",
                                            catalog1Id : "",
                                            catalog2Id : "",
                                            catalog3Id : "",

                                        }}
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