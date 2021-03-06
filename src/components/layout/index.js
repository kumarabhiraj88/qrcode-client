import React from 'react';
import { Switch } from 'react-router-dom';
import { connect } from "react-redux";
import PrivateRoute from '../HOC/PrivateRoute';
import Header from '../common/header';
import Sidenav from '../common/sidenav/sidenav';
import Dashboard from '../dashboard/index';
import Users from '../users/index';
import QrcodeGen from '../qrcode/index';
import QrcodeArabicGen from '../qrcode-arabic/index';


const Layout = (props) => {
	const { sidebarToggle } = props;
	return (
		<>
			<Header />
			<div
				className={
					sidebarToggle
						? "parent-container grid-container"
						: "parent-container removeSidebar"
					}
			>
					<Sidenav />
					<div className="mainContent">
					<Switch>
						<PrivateRoute exact path="/admin/dashboard">
							<Dashboard />
						</PrivateRoute>

						<PrivateRoute exact path="/admin/users">
							<Users />
						</PrivateRoute>

						<PrivateRoute exact path="/admin/qrcode">
							<QrcodeGen />
						</PrivateRoute>

						<PrivateRoute exact path="/admin/qrcode-arabic">
							<QrcodeArabicGen />
						</PrivateRoute>

					</Switch>
					</div>
			</div>
		</>
	);
};


const mapStateToProps = (state) => ({
	sidebarToggle: state.sidebarReducer.showSidebar,
});

export default connect(mapStateToProps, null)(Layout);