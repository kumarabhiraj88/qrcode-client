import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from '@material-ui/core';
import { Nav } from 'react-bootstrap';
import { sideNav } from '../../../constants/sidenavLinks';

const RenderLink = () => {

	const loggedPrivilegeId = localStorage.getItem('privilegeId');

	return sideNav.map((data, index) => (
       
		<NavLink
			className={loggedPrivilegeId==2 && data.routeLabel=='Users' ? 'hide-LinkStyle' : 'LinkStyle' }
			activeClassName='is-active'
			to={data.link}
			key={index}
		>

		{ data.icon }{ data.routeLabel }
		</NavLink>
		));
};

export default RenderLink;