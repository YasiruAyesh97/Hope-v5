import React, {useEffect, useState} from 'react'
import {Row, Col, Form, Button, FormCheck, Alert, Modal} from 'react-bootstrap'
import Card from '../../../components/Card'
import * as yup from "yup";
import { Formik } from "formik";
import {registerRegularUser,getDecodeJwt} from "../../../service/web/userService";

const schema = yup.object().shape({

    email: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required().min(8),


});
const AdminAdd =() =>{

    const auth = getDecodeJwt();

    useEffect(() => {
        setErrMsg('');
        setErrCode(0);
    }, [])
    const [errCode, setErrCode] = useState(0);


    const [errMsg, setErrMsg] = useState('');

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
            const response = await registerRegularUser(values.email,values.username,values.password,auth.companyId);

            if(response){
                setErrCode(200);
                setErrMsg('Registration successful');
                resetForm({})
                setShowSuccess(true)
            }

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
                setShowWarning(true)
            }else if (err.response?.status === 403) {
                setErrCode(403);
            } else {
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

                                        }}
                                    >
                                        {({
                                              handleSubmit,
                                              handleReset,
                                              handleChange,
                                              values,
                                              dirty,
                                              isValid,
                                              touched,
                                              errors }) => (

                                            <form noValidate onSubmit={handleSubmit}>
                                                <div className="row">

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