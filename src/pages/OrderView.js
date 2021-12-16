import {Fragment, useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab, Col, Row, Container, Button} from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 
import OrderCard from '../components/OrderCard'
import OrderHistoryView from '../components/OrderHistoryView'

export default function OrderView() {

	const {user, setUser} = useContext(UserContext)
	const [orderId, setOrderId] = useState('')

		const retrieveUserDetails = (token) => {

		fetch('http://localhost:4000/users/details', {
			headers:{
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setUser({
				id: data._id,
				isAdmin: data.isAdmin

			})
		})

	}

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
			} else {
				setOrderId('0')
			}
			
		})
	}, [])

	return(

		<Fragment>
		 	<Container >
		 	<Row  >
			<Tabs defaultActiveKey="currentOrder" className="mt-5 tabs-link" tabClassName="text-secondary">
			
				<Tab eventKey="currentOrder" title="My Order">
    					{(orderId === '0') ?
    					<Fragment>
    					<Container>
    					<Row>
							<Col className = "p-5">
							<h1>Deadpool's Magic Shop</h1>
							<p>Your Superhero's Wizardy Emporium</p>
							<Button variant = "warning"><a href="/products">Buy Now</a></Button>
							</Col>
						</Row>
						</Container>
						</Fragment>
						:
    				<Container>
    					<Row>
    			
    						<OrderCard/>
    					
    						
    						<Link className= "btn btn-success" to = {`/checkout`}>Proceed</Link>
    						
  							
  						</Row>
  					</Container> }
  				</Tab>
			  
			  	<Tab eventKey="prev" title="Order History">
			    	<Container>
    					<Row>
    						<OrderHistoryView/>
  						</Row>
  					</Container>
			 	 </Tab>
			</Tabs>
			</Row>
			</Container>
		</Fragment>	
	)
}


