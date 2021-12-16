import {useState, useEffect, useContext, Fragment} from 'react'
import {Row, Col, Form, Button, Table} from 'react-bootstrap'
import {Navigate, useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'

export default function AddProduct(){

	const {user, setUser} = useContext(UserContext)

	const history = useNavigate()

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [stocks, setStocks] = useState('')
	const [availability, setAvailability] = useState('')
	const [isOutofStock, setIsOutofStock] = useState(true);
	const [isActive, setIsActive] = useState(false)

	function addNewProduct(e){

		e.preventDefault();

		fetch(`http://localhost:4000/products/create`, {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json",
				Authorization : `Bearer ${localStorage.getItem("token")}`
			}, 
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
				stocks: stocks,
				availability: availability
				
			})
		})
		.then(res =>{
			console.log(res)
			return res.json()
		})
		.then(data => {
			console.log(data)

			if(data){
				Swal.fire({
					title: "Product successfully added.",
					icon: 'success',
				})
			} else {
				Swal.fire({
					title: 'Failed',
					icon: 'error',
					text: 'Error: Duplicate item found.'
				})
			}

		})

		setName('');
		setDescription('')
		setPrice('')
		setStocks('')
		setAvailability('')
		setIsOutofStock('')
		setIsActive('')


	}

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

	useEffect (() => {
		if((name !== '' && description !== '' && price !== '' && stocks !== '' && availability !== '' && isOutofStock !== '' && isActive !== '')){
			setIsActive(true)
			setIsOutofStock(false)
		} else {
			setIsActive(false)
			setIsOutofStock(true)
		}
	}, [name, description, price, stocks, availability, isOutofStock, isActive])

	return(

		<Fragment  >
			<Row>
				<Col>
					<Form onSubmit={(e) => addNewProduct(e)}>
					<Table>
 						<thead>
						    <tr>
						      <th>Name</th>
						      <th>Description</th>
						      <th>Price</th>
						      <th>Stocks</th>
						      <th>Availability</th>
						      <th>isOutofStock</th>
						      <th>isActive</th>
						      
						    </tr>
						  </thead>
						  <tbody>
						    <tr>

						      <td>
						      <Form.Group controlId= "name">
							<Form.Control 
 								type = 'name'
 								placeholder = 'Product Name'
 								value = {name}
 								onChange = {e => setName(e.target.value)}
 								required
							/>
						</Form.Group>
						</td>


						      <td>
						      <Form.Group>
							<Form.Control 
								type = 'description'
 								placeholder = 'Description'
 								value = {description}
 								onChange = {e => setDescription(e.target.value)}
 								required
							/>
						</Form.Group>
						</td>

						      <td>
						      	<Form.Group>
							<Form.Control 
								type = 'price'
 								placeholder = 'Php'
 								value = {price}
 								onChange = {e => setPrice(e.target.value)}
 								required
							/>
						</Form.Group>
						</td>

						<td>
						<Form.Group>
							<Form.Control 
								type = 'stocks'
 								placeholder = 'Number of stocks'
 								value = {stocks}
 								onChange = {e => setStocks(e.target.value)}
 								required
							/>
						</Form.Group>
						</td>

						<td>
						<Form.Group>
							<Form.Control 
								type = 'availability'
 								placeholder = 'Availability'
 								value = {availability}
 								onChange = {e => setAvailability(e.target.value)}
 								required
							/>
						</Form.Group>
						</td>
							

							<td>
						<Form.Group>
							<Form.Control 
								type = 'isOutofStock'
 								placeholder = 'isOutofStock'
 								value = {isOutofStock}
 								onChange = {e => setIsOutofStock(e.target.value)}
 								required
							/>
						</Form.Group>
						</td>
						<td>
						<Form.Group>
							<Form.Control 
								type = 'isActive'
 								placeholder = 'isActive'
 								value = {isActive}
 								onChange = {e => setIsActive(e.target.value)}
 								required
							/>
						</Form.Group>
						</td>
						</tr>


						 <tr>
						      
						<div>
							<Button variant = 'primary' type= 'submit' id = 'submitBtn'>
								Add
							</Button>

						</div>
						     
						    </tr>
						  </tbody>
						</Table>
					</Form>
				</Col>
			</Row>
		</Fragment>
	)
}
