import React from 'react';
import { Link } from "react-router-dom";
import styled from '@emotion/styled';

const MenuToggle = styled.div`
	display: block;
	position: relative;
	top: 2vh;
	left: 3vw;

	z-index: 1;

	-webkit-user-select: none;
	user-select: none;
`;
const Input = styled.input`
	display: block;
	width: 40px;
	height: 32px;
	position: absolute;
	top: -7px;
	left: -5px;

	cursor: pointer;

	opacity: 0;
	z-index: 2;

	-webkit-touch-callout: none;

	&:checked ~ ul {
		transform: none;
	}
	&:hover ~ span {
		filter: invert(0.5);
	}
`;

const Cell = styled.span`
	display: block;
	width: 50px;
	height: 4px;
	margin-bottom: 10px;
	position: relative;

	background: white;
	border-radius: 3px;

	z-index: 1;
`;

const Menu = styled.ul`
	position: absolute;
	width: 5vw;
	margin: -100px 0 0 -50px;
	padding: 50px;
	padding-top: 125px;

	background: #8e24aa;
	list-style-type: none;
	-webkit-font-smoothing: antialiased;

	transform-origin: 0% 0%;
	transform: translate(-110%, 0);

	transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
	border-radius: 0.5em;
`;

const MenuCell = styled.li`
	padding: 10px 0;
	font-size: 22px;
	color: white;
`;

function MenuBar() {
	return (
		<MenuToggle>
			<Input type="checkbox"/>
			<Cell/>
			<Cell/>
			<Cell/>
			<Menu>
				<Link to='/profile' style={ { textDecoration: 'none'} }>
					<MenuCell>Profile</MenuCell>
				</Link>
			</Menu>
  		</MenuToggle>
	);
};

export default MenuBar;