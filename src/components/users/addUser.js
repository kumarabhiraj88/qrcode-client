import React from 'react';
import { Container, Button, Grid } from '@material-ui/core';
import { Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import useFormValidation from "../../validators/useFormValidation";
import validateAddUser from "../../validators/validateAddUser";
import { addUserAction, updateUserAction } from "../../redux/actions/userActions";
import * as userTypes from "../../redux/types/userTypes";
import { connect } from "react-redux";

const AddUser = (props) => {

    const { toggleModal, addUserAction, updateUserAction, editFlag, userDbData } = props;
    
	let INITIAL_STATE = {
        userId: userDbData ?._id,
        fullName:userDbData ?.fullName ||'',
        email:userDbData ?.email ||'',
        privilegeId:userDbData ?.privilegeId ||'',
		pwd: '',
		cpassword: '',
	};
	const { handleChange, handleSubmit, values, errors } = useFormValidation(
		INITIAL_STATE,
		validateAddUser
		);


    return (
        <Container className="pageContainer">
           
           <Grid container direction="column" >
               <Form
                  onSubmit={async (e) => {
                   try {
                            if (editFlag) {
                                await handleSubmit(e, updateUserAction, toggleModal);
                            } else {
                                await handleSubmit(e, addUserAction, toggleModal);
                            }
                           
                   }
                   catch (error){ }
                   }}
               >

                   <Grid item xs={6} >
                       <InputGroup className="mb-3">
                           <FormControl
                               name="fullName"
                               type="text"
                               value={values.fullName}
                               onChange={handleChange}
                               placeholder='Name'
                           />
                       </InputGroup>
                   </Grid>

                   <Grid item xs={6} >
                       <InputGroup className="mb-3">
                           <FormControl
                               name="email"
                               type="text"
                               value={values.email}
                               onChange={handleChange}
                               placeholder='Email'
                           />
                       </InputGroup>
                   </Grid>

                   <Grid item xs={6} >
                            <InputGroup className="mb-3">
                                <FormControl
                                    name="pwd"
                                    type="password"
                                    value={values.pwd}
                                    onChange={handleChange}
									placeholder='New Password'
                                />
                            </InputGroup>
                        </Grid>

                        <Grid item xs={6} >
                            <InputGroup className="mb-3">
                                <FormControl
                                    name="cpassword"
                                    type="password"
                                    value={values.cpassword}
                                    onChange={handleChange}
									placeholder='Confirm Password'
                                />
                            </InputGroup>
                        </Grid>

                   <Grid item xs={6} >
                       <InputGroup className="mb-3">
                           <Form.Control 
                                as="select" 
                                name="privilegeId" 
                                id="privilegeId"
                                value={values.privilegeId} 
                                onChange={handleChange} 
                                placeholder='Privilege'
                                defaultValue={values.privilegeId ? values.privilegeId : 'Select Privilege'}
                            >
                                <option value="">Select Privilege</option>
                                {
                                    userTypes.privileges.map((item)=>{
                                        return  <option value={item._id}  >{item.Role}</option>;
                                    })
                                }
                            
                            </Form.Control>
                       </InputGroup>
                   </Grid>

                   <Grid  direction="row">
                       <Row >
                           <Col xs={3}>
                               <Button variant="contained" color="primary" type='submit'>
                                   Submit
                               </Button>
                           </Col>
                           <Col xs={3}>
                               <Button variant="contained" color="primary" onClick={toggleModal}>
                                   Cancel
                               </Button>
                           </Col>
                       </Row>
                   </Grid>
               </Form>
           
       </Grid>

      

   </Container>
    )
}


const mapStateToProps = (state) => ({
	userDbData: state.userReducer.userDetail,
	//companies: state.commonReducer.companylist
});


export default connect(mapStateToProps, { addUserAction, updateUserAction })(AddUser);