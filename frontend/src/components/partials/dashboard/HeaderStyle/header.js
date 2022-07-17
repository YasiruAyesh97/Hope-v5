import React, {useEffect, useState} from 'react'
import { Navbar,Container,Nav,Dropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CustomToggle from '../../../dropdowns'
import {bindActionCreators} from "redux"

//img
import avatars1 from '../../../../assets/images/avatars/01.png'
import avatars2 from '../../../../assets/images/avatars/avtar_1.png'
import avatars3 from '../../../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../../../assets/images/avatars/avtar_5.png'
// logo
import Logo from '../../components/logo'
import { useHistory } from "react-router-dom";
// store
import {NavbarstyleAction, getDirMode, SchemeDirAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../../../store/setting/setting'
import {connect} from "react-redux"

import {expiresSoonDocumentListDataFetch, logout,getDecodeJwt} from "../../../../service/web/userService";

const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
        schemeDirMode: getDirMode(state),
        sidebarcolorMode: getSidebarColorMode(state),
        sidebarTypeMode: getSidebarTypeMode(state),
        sidebaractivestyleMode: getSidebarActiveMode(state),
        navbarstylemode: getNavbarStyleMode(state),
    };
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            SchemeDirAction,
            SidebarColorAction,
            SidebarActiveStyleAction,
            NavbarstyleAction,
        },
        dispatch
    )
})




const Header = (props) => {
    const history = useHistory();
    const auth= getDecodeJwt();
    const username = auth.username
    const email = auth.email
    const roles = auth.roles

    useEffect(() => {
        // navbarstylemode
        const navbarstyleMode1 = sessionStorage.getItem('Navbarstyle-mode');
        if(navbarstyleMode1===null){
            props.NavbarstyleAction(props.navbarstylemode);
        }
        else{
            props.NavbarstyleAction(navbarstyleMode1);

        }
    })
    useEffect(() => {
        getExipreSoonDocuments()
    },[])

    const minisidebar =() =>{
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }

    // notificaion
    const [expiredDocumentList,setExpireDocumentList]=useState([])

    async function getExipreSoonDocuments(){

        const {data:doc} =await expiresSoonDocumentListDataFetch(auth.companyId);
        setExpireDocumentList(doc)

    }

    return (
        <>
            <Navbar expand="lg" variant="light" className="nav iq-navbar">
                <Container fluid className="navbar-inner">
                    <Link to="/dashboard" className="navbar-brand">
                        <Logo color={true} />
                        <h4 className="logo-title">Hope UI</h4>
                    </Link>
                    <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                        <i className="icon">
                            <svg width="20px" height="20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                            </svg>
                        </i>
                    </div>
                    <div className="input-group search-input">
                        <span className="input-group-text" id="search-input">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                        <input type="search" className="form-control" placeholder="Search..."/>
                    </div>
                    <Navbar.Toggle aria-controls="navbarSupportedContent">
                        <span className="navbar-toggler-icon">
                            <span className="mt-2 navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse  id="navbarSupportedContent">
                        <Nav as="ul" className="mb-2 ms-auto navbar-list mb-lg-0">

                            <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle as={CustomToggle}  href="#"   variant=" nav-link" id="notification-drop" data-bs-toggle="dropdown" >
                                    <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453Z" fill="currentColor"></path>
                                        <path opacity="0.4" d="M14.0088 19.2283C13.5088 19.1215 10.4627 19.1215 9.96275 19.2283C9.53539 19.327 9.07324 19.5566 9.07324 20.0602C9.09809 20.5406 9.37935 20.9646 9.76895 21.2335L9.76795 21.2345C10.2718 21.6273 10.8632 21.877 11.4824 21.9667C11.8123 22.012 12.1482 22.01 12.4901 21.9667C13.1083 21.877 13.6997 21.6273 14.2036 21.2345L14.2026 21.2335C14.5922 20.9646 14.8734 20.5406 14.8983 20.0602C14.8983 19.5566 14.4361 19.327 14.0088 19.2283Z" fill="currentColor"></path>
                                    </svg>
                                    <span className="bg-danger dots"></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="p-0 sub-drop dropdown-menu-end" aria-labelledby="notification-drop">

                                    <div className="m-0 shadow-none card">
                                        <div className="py-3 card-header d-flex justify-content-between bg-primary">
                                            <div className="header-title">
                                                <h5 className="mb-0 text-white">All Notifications</h5>
                                            </div>
                                        </div>

                                        <div className="p-0 card-body">

                                            {expiredDocumentList === undefined || expiredDocumentList.length == 0?
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {roles.includes("ROLE_SUPERADMIN")? <p className="m-1">Nothing to show</p>: <p className="m-1">No documents abut expire</p>}
                                                </div>

                                                :

                                                expiredDocumentList.map((item,idx) => (
                                                    <Link to="#" className="iq-sub-card">
                                                        <div className="d-flex align-items-center">
                                                            <div className="ms-3 w-100">
                                                                <h6 className="mb-0 ">{item.name} document</h6>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <p className="mb-0">expire in {item.remain_days} days</p>
                                                                    {/*<small className="float-right font-size-12">Just Now</small>*/}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}

                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>

                            {expiredDocumentList.length?
                                <span style={{
                                    backgroundColor: "#fa3e3e",
                                    borderRadius: "50px",
                                    color: "white",
                                    padding: "0.5px 0.5px",
                                    justifyContent:"center",
                                    fontSize: "x-small",
                                    position: "absolute",
                                    top:"8px",
                                }}>{expiredDocumentList.length<10? "0"+expiredDocumentList.length:expiredDocumentList.length}</span>
                                :
                                null
                            }



                            <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle as={CustomToggle} variant=" nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={avatars1} alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded"/>
                                    <img src={avatars2} alt="User-Profile" className="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded"/>
                                    <img src={avatars3} alt="User-Profile" className="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded"/>
                                    <img src={avatars5} alt="User-Profile" className="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded"/>
                                    <img src={avatars6}alt="User-Profile" className="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded"/>
                                    <img src={avatars4} alt="User-Profile" className="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded"/>
                                    <div className="caption ms-3 d-none d-md-block ">
                                        <h6 className="mb-0 caption-title">{username}</h6>
                                        <p className="mb-0 caption-sub-title">{email}</p>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu  className="dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <Dropdown.Item onClick={()=>{
                                        logout()
                                        window.location="/"
                                    }}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
