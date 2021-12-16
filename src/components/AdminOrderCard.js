import {useState, useEffect, useContext, Fragment} from 'react'
import {Image, Col, Container, Row, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function AdminOrderCard({adminOrderProp}){

	const {_id, userId, cartList, totalAmount, purchasedOn, status, productId } = adminOrderProp


	const {user} = useContext(UserContext)

	function showListCards (cartList) {
		return cartList.map(cartItem => {
			return (
				<tr>
						<td>{cartItem.productId.name}</td>
						<td>{cartItem.productId.price}</td>
						<td>{cartItem.quantity}</td>
						<td>{cartItem.subTotal}</td>
					</tr>
			)
		})
	}

	return(

				<Fragment>
				
			<Container>

			<Row>
			<div>Order ID: {_id}</div>
			<div>User ID: {userId}</div>
			<div>Transaction Date: {purchasedOn}</div>
				
			<Table>
					  <thead>
					    <tr>
					      <th>Name</th>
					      <th>Price</th>
					      <th>Quantity</th>
					      <th>Subtotal</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{showListCards(cartList)}
					  	<br/>
					  	<h4>TOTAL AMOUNT DUE: ₱{totalAmount}</h4>
					  </tbody>

					</Table>
			</Row>
			
			<br/>
			</Container>
			</Fragment>
	)
}
