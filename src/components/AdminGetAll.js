import {useState, useEffect, useContext, Fragment} from 'react'
import {Row, Col, Form, FormControl, Container, Button} from 'react-bootstrap'
import {Navigate, useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'
import AdminProductCard from '../components/AdminProductCard'
import AdminEdit from '../components/AdminEdit'

export default function AdminAllProducts(){

	const [adminProduct, setAdminProduct] = useState([])
	const [adminEditProduct, setAdminEditProduct] = useState([])
	const [name, setName] = useState('')

	function searchProduct(e) {
		e.preventDefault(e);

		fetch('http://localhost:4000/products/search',{
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				name: name
			})
		})
		.then(res =>{
			console.log(res)
			return res.json()
		} )
		.then(data => {
			console.log(data)

			setAdminEditProduct(data.map(adminEditProduct => {
				return(
					<AdminEdit key={adminEditProduct.id} adminEditProp = {adminEditProduct}/>
				)
			}))
		}, [])
	}
	
	useEffect(() => {
		fetch('http://localhost:4000/products/all')
		.then(res => res.json())
		.then(data => {
		

			setAdminProduct(data.map((adminProduct, index) => {
				
				return(
					<Fragment>
					
					<AdminProductCard key={adminProduct.id} adminProductProp = {adminProduct}/>
								
					</Fragment>
				)
			}))
		})
	}, [])


	return(
		<Fragment>
		<Container>
		<div>
			
			</div>
			<Form>
				<Form.Group controlId="search-product">
					<br/>
					<Form.Label><h3>SEARCH FOR PRODUCT</h3></Form.Label>
					<Form.Control
						type= 'name'
						value= {name}
						placeholder= 'Type name of product'
						onChange = {(e) => setName(e.target.value)} 
					/>
					</Form.Group>
    				<Button variant = 'primary' type= 'submit' id = 'submitBtn' onClick={(e)=> searchProduct(e)}>Search</Button>
			</Form>	
			<br/>
			<div>
			{adminEditProduct}
			</div>
	
			</Container>
		</Fragment>
	)
	
}
