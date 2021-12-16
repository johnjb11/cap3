import {useState, useEffect, useContext, Fragment} from 'react'
import {Image, Col, Table, Button, Row, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function CheckoutCard(){

	const {user} = useContext(UserContext)

	const [orderId, setOrderId] = useState('')
	const [userId, setUserId] = useState('')
	const [cartList, setCartList] = useState([])
	const [quantity, setQuantity] = useState('')
	const [subTotal, setSubTotal] = useState('')
	const [totalAmount, setTotalAmount] = useState('')
	const [status, setStatus] = useState('') 
	const [purchasedOn, setPurchasedOn] = useState('')
	
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [category, setCategory] = useState('')
	const [inStock, setInStock] = useState('')

	useEffect(() => {

		fetch(`http://localhost:4000/orders/myOrder`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			data = data[0];
			console.log(data);

		 	setOrderId(data._id)
			setUserId(data.userId)
			setCartList(data.cartList)
			
			setTotalAmount(data.totalAmount)
			setStatus(data.status)
			setPurchasedOn(data.purchasedOn)
		})
	}, [])


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
					  	{showListCards(cartList)}
					 	<br/>
					  	<h4>TOTAL AMOUNT DUE: ₱{totalAmount}</h4>
					  		
					  	
					  </tbody>

					</Table>
			</Row>
			<div>Order ID: {orderId}</div>
			<div>Transaction Date: {purchasedOn}</div>
			<br/>
			</Container>
			</Fragment>
		)
}
