import {Fragment, useState, useEffect,useContext } from 'react'
import {Container, Row, Col, Card, Button, ButtonGroup, Modal, Form} from 'react-bootstrap'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import '../App.css'
import UserContext from '../UserContext'

export default function AdminEditCard({adminEditProp}){

	const {name, description, price, stocks, availability,_id} = adminEditProp
	
	console.log(adminEditProp)
	const [show, setShow] = useState(false);

	const [nameProduct, setNameProduct] = useState('');
	const [descriptionProduct, setDescriptionProduct] = useState('');
	const [priceProduct, setPriceProduct] = useState('');
	const [stocksProduct, setStocksProduct] = useState('');
	const [availabilityProduct, setAvailabilityProduct] = useState('');


	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const {user, setUser} = useContext(UserContext)

	const editProduct = (e, productId) =>{
		e.preventDefault();

		fetch(`http://localhost:4000/products/${productId}/update`, {
			method:'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body :JSON.stringify({
				name: nameProduct,
				description: descriptionProduct,
				price: priceProduct,
				stocks: stocksProduct,
				availability: availabilityProduct

			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		 	if (data) {
				
				Swal.fire({
					title: "Product updated.",
					icon: "success"
				});

			} else {

				Swal.fire({
					title: "Error updating. Try again.",
					icon: "error"
				});

			}
		})
	}


	function archiveProduct(e){
		e.preventDefault(e);

		fetch(`http://localhost:4000/products/${_id}/archive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				Swal.fire({
					title: 'Archived successfully!',
					icon: 'success',
				})

				
			} else {
				Swal.fire({
					title: 'Archiving failed.',
					icon: 'error'
				})
			}
		})
	}

	function activateProduct(e){
	

		fetch(`http://localhost:4000/products/${_id}/activate`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				console.log(data)
				Swal.fire({
					title: 'Successfully activated',
					icon: 'success'
				})
				
				
			} else {
				Swal.fire({
					title: 'Activation failed',
					icon: 'error'
				})
			}
		})
	}


	return(
		<Container>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Container>
								<Row>
									
											
									<Col>
										<Card.Title>Product Id:</Card.Title>
										<Card.Title>Name:</Card.Title>
										<Card.Title>Description:</Card.Title>
										<Card.Title>Price:</Card.Title>
										<Card.Title>Stocks:</Card.Title>
										<Card.Title>Availability:</Card.Title>
										
									
									</Col>

									<Col>
										<Card.Title>{_id}</Card.Title>
										<Card.Title>{name}</Card.Title>
										<Card.Title>{description}</Card.Title>
										
										<Card.Title>{price}</Card.Title>
										<Card.Title>{stocks}</Card.Title>
										<Card.Title>{availability}</Card.Title>
									
								
									</Col >

									<Col>
										<ButtonGroup>
										  <Button variant="primary" className="mx-1" onClick={handleShow}>Edit</Button>
										 
										  <Button variant="primary"className="mx-1" onClick={(e)=> archiveProduct(e)} >Archive</Button>
								
										  <Button variant="primary"className="mx-1" onClick={(e)=> activateProduct(e)} >Restore</Button>

										 
					  					</ButtonGroup>
									</Col>
								</Row>
						</Container>
					</Card.Body>
				</Card>
			</Col>
		</Row>

		<Modal show={show} onHide={handleClose}>
	        <Form onSubmit={e => editProduct(e, _id)}>
		        
		        <Modal.Body>
		        	<Form.Group>
		        		<Form.Label>Name</Form.Label>
		        		<Form.Control type="text" placeholder={name} onChange={e => setNameProduct(e.target.value)} required/>
		        	</Form.Group>

		        	<Form.Group>
		        		<Form.Label>Description</Form.Label>
		        		<Form.Control type="text" placeholder={description} onChange={e => setDescriptionProduct(e.target.value)} required/>
		        	</Form.Group>

		        	<Form.Group>
		        		<Form.Label>Price</Form.Label>
		        		<Form.Control type="text" placeholder={price} onChange={e => setPriceProduct(e.target.value)} required/>
		        	
		        	</Form.Group><Form.Group>
		        		<Form.Label>Stocks</Form.Label>
		        		<Form.Control type="text" placeholder={stocks} onChange={e => setStocksProduct(e.target.value)} required/>
		        	</Form.Group>

		        	<Form.Group>
		        		<Form.Label>Availability</Form.Label>
		        		<Form.Control type="text" placeholder={availability} onChange={e => setAvailabilityProduct(e.target.value)} required/>
		        	</Form.Group>

		        </Modal.Body>
		           
		            <Modal.Footer>
		            <Button variant="primary" type="submit">Submit</Button>
		        </Modal.Footer>

		        	
		    </Form>    
      </Modal>
	</Container>
	)
}
