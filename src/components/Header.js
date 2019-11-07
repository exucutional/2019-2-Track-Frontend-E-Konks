import React from 'react'
import logo from '../assets/logo.svg'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
/*
const year = new Date().getFullYear()

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`

const TopBar = styled.div`
	background-color: #222;
	height: 150px;
	padding: 20px;
	color: #fff;

	.redux-logo {
		animation: ${rotate360} infinite 20s linear;
		height: 80px;
	}
`

function Header() {
	return (
		<TopBar>
			<img src={logo} className="redux-logo" alt="logo" />
			<h2>Track Mail.Ru, {year}</h2>
		</TopBar>
	)
}
*/

const TopBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	background-color: #8E24AA;
	height: 8vh;
`

const Title = styled.span`
	display: flex;
	font-size: 7vh;
	font-family: monospace;
	color: white;
`

function Header() {
	return (
		<TopBar>
			<Title>Title</Title>
		</TopBar>
	)
}
export default Header
