import {useState, useEffect, useContext, Fragment} from 'react'
import {Image, Col, Table, Button, Row, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function OrderHistoryCard({orderHistoryProp}){

	const {_id, userId, cartList, totalAmount, purchasedOn, status, productId } = orderHistoryProp

	const {user} = useContext(UserContext)

	console.log(orderHistoryProp)
	function renderOrderHistoryListCards (cartList) {
		return cartList.map(cartItem => {
			return (
				
					<tr>
						<td>{cartItem.productId.name}</td>
						<td>{cartItem.productId.price}</td>
						<td>{cartItem.quantity}</td>
						<td>{cartItem.subTotal}</td>
					</tr>
				
				
			)
		});
	}


		return(
			<Fragment>
			<Container>
			<Row>
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
					  	{renderOrderHistoryListCards(cartList)}
					  	<br/>
					  	<h4>TOTAL AMOUNT DUE: ₱{totalAmount}</h4>
					  </tbody>

					</Table>
			</Row>
			<div>Order ID: {_id}</div>
			<div>Transaction Date: {purchasedOn}</div>
			<br/>
			</Container>
			</Fragment>
		)
}
