import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AccountCircle, ExitToApp, Menu } from '@material-ui/icons';
import { logoutAction } from '../../redux/actions/authActions';
import { toggleSidebar } from '../../redux/actions/toggleActions';
import ModalComponent from "./modal/modal";
import ChangePasswordModal from "./modal/ChangePasswordModal";
import * as userTypes from '../../redux/types/userTypes';

const Header = (props)=>{

    const { toggleSidebar, logoutAction } = props;

    const [changePasswordModalState, toggleChangePasswordModalState] = useState(false);
    const toggleChangePasswordModal = async () => {
        toggleChangePasswordModalState(!changePasswordModalState);
    }

    const history = useHistory();
    const logout = async () => { 
		await logoutAction();
		localStorage.removeItem('token');
		localStorage.removeItem('privilegeId');
		localStorage.removeItem('name');
		localStorage.removeItem('userid');
		history.push('/');
	}

    const [userId, setloggedUserId] = useState();
    const [userPrivilegeName, setUserPrivilegeName] = useState();
    const [userFullName, setUserFullName] = useState();
    

	useEffect(() => {
			const loggeduserId = localStorage.getItem('loggeduserid');
			setloggedUserId(loggeduserId);

            const loggedPrivilegeId = localStorage.getItem('privilegeId');
            //const loggedPrivilegeName= loggedPrivilegeId ? userTypes.privileges[loggedPrivilegeId].Role : '';
            const loggedPrivilegeName= userTypes.privileges.map((items)=>{
                if(items._id==loggedPrivilegeId){
                return items.Role
                }
            });
            setUserPrivilegeName(loggedPrivilegeName);

            const loggedUserName = localStorage.getItem('name');
            setUserFullName(loggedUserName);
	});

    return (
    <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Menu className="sidebarToggle" onClick={toggleSidebar} />
            <Container>
                {/* <Navbar.Brand href="#home">QRCode Generator</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                    <Nav.Link className="loggedinAs">
                        Logged in as : {userPrivilegeName}
                    </Nav.Link>
                    <Nav.Link  onClick={toggleChangePasswordModal}>
                        <AccountCircle  /> {userFullName}
                    </Nav.Link>
                    <Nav.Link eventKey={2} onClick={logout} >
                        <ExitToApp />
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Container>
        </Navbar>

        <ModalComponent
			title={"Change Password" }
			modalState={changePasswordModalState}
			message={
				<ChangePasswordModal toggleModal={toggleChangePasswordModal} userId={userId}  />
			}
            toggleModal={toggleChangePasswordModal}
		/>

    </>
    )
}

const mapDispatchToProps = {
	logoutAction,
    toggleSidebar
};

export default connect(null, mapDispatchToProps)(Header);