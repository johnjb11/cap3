import {useState, useEffect, useContext, Fragment} from 'react';
import {Row, Col, Form, Button, CardGroup,Card, Image, Table,Container} from 'react-bootstrap';
import {Navigate, useNavigate, Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import UserContext from '../UserContext';
import CheckoutCard from '../components/CheckoutCard'

export default function Checkout() {

	// Fetch all user details to be used for shipping
	const {user, setUser} = useContext(UserContext)

	const history = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [address, setAddress] = useState('')
	const [mobileNo, setMobileNo] = useState('')

	const [orderId, setOrderId] = useState('')

	useEffect(() => {

		fetch(`http://localhost:4000/users/details`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
		 	setName(data.name)
		 	setEmail(data.email)
		 	setAddress(data.address)
		 	setMobileNo(data.mobileNo)
		})
	}, [])

	useEffect(() => {

		fetch(`http://localhost:4000/orders/myOrder`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			data = data[0];
			console.log(data)
			
			if(data._id !== undefined){
			setOrderId(data._id)
			} else {
				setOrderId('')
			}
			
		})
	}, [])

	console.log(orderId)

	function archiveOrder(e) {
		e.preventDefault(e);

		fetch(`http://localhost:4000/orders/${orderId}/archive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			
			if(data){
				Swal.fire({
					title: 'Thank you for shopping!',
					icon: 'success'
				})

				history('/')
				
			} else {
				Swal.fire({
					title: 'Please try again.',
					icon: 'error'
				})
			}
		})

	}

	return (
	<Fragment>
	<Container>
		<Row>
		<h1>ORDERS</h1>
		<CheckoutCard/>
		</Row>
		<Row>
	   <Link className= "btn btn-success" to = {`/`} onClick={(e)=> archiveOrder(e)} >Checkout</Link>
	   	</Row>
	 </Container>
	</Fragment>


		)
}
