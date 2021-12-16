import {useState, useEffect, useContext, Fragment} from 'react'
import {Col, Table, Button, Row, Container, ButtonGroup} from 'react-bootstrap'
import {Navigate, useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function OrderCard(){


	const {user} = useContext(UserContext)

	const history = useNavigate()

	
	const [orderId, setOrderId] = useState('')
	const [userId, setUserId] = useState('')
	const [cartList, setCartList] = useState([])
	const [quantity, setQuantity] = useState('')
	const [subTotal, setSubTotal] = useState('')
	const [totalAmount, setTotalAmount] = useState('')
	const [status, setStatus] = useState('') 
	const [purchasedOn, setPurchasedOn] = useState('')

	const [name, setName] = useState('')
	const [productId, setProductId] = useState('')


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

			if(data !== undefined){
		 	setOrderId(data._id)
			setUserId(data.userId)
			setCartList(data.cartList)
			setProductId(data.productId)
		
			setTotalAmount(data.totalAmount)
			setStatus(data.status)
			setPurchasedOn(data.purchasedOn)
			} else {
				setOrderId('')
			}

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


	function confirmDelete(e) {
		Swal.fire({
  			title: 'Remove order?',
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Remove'
		}).then((result) => {
 			 if (result.isConfirmed) {
  			deleteOrder(result)
  }
})
	}

	function deleteOrder(e){
		fetch(`http://localhost:4000/orders/${orderId}/delete`, {
			method: 'DELETE',
			headers: {
				Authorization:  `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

				  Swal.fire(
     			 'Successfully removed.',
      			'success'
    	)
				history('/')
		})
	}


		return(
			
			<Fragment>
			<Container >
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
			<Row>
			<Button variant = 'danger' type= 'submit' id = 'delete-btn' onClick={(e) => confirmDelete(e)}>Remove</Button>
			</Row>
			<br/>
			</Container>
			</Fragment>


		)
	


}
