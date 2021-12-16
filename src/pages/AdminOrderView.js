import {Fragment, useContext, useState, useEffect} from 'react'
import {Navigate, useNavigate, Link} from 'react-router-dom'
import {Tabs, Tab, Col, Row, Container} from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 
import AdminOrderCard from '../components/AdminOrderCard'

export default function AdminOrderView() {

	const {user, setUser} = useContext(UserContext)

	const [order, setOrder] = useState([])

		const retrieveUserDetails = (token) => {

		fetch('http://localhost:4000/users/details', {
			headers:{
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			//console.log(data)

			setUser({
				id: data._id,
				isAdmin: data.isAdmin

			})
		})

	}

		useEffect(() => {

		fetch(`http://localhost:4000/orders/allOrder`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			
			//console.log(data)
			
			setOrder(data.map(order => {
				return (

					<Fragment>
						<AdminOrderCard key= {order.id} adminOrderProp = {order}/>
					</Fragment>

				)
			}))
			
		})
	}, [])

	return(
		

		<Fragment>
		<h1>ORDER HISTORY</h1>
			<Container>
			
			{order}
			
			</Container>
		</Fragment>	
	)
}

