import {useState, useEffect,Fragment, useContext} from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab, Container} from 'react-bootstrap'
import UserContext from '../UserContext'
import AdminAdd from '../components/AdminAdd' 
import AdminGetAll from '../components/AdminGetAll'
import AdminProductCard from '../components/AdminProductCard'


import '../App.css'


export default function Admin(){

	const [adminProduct, setAdminProduct] = useState([])

	const {user, setUser} = useContext(UserContext)


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
				<Tabs>
				
					<Tab eventKey="allProducts" title="View All ">
						<div>
		    			<AdminGetAll/>
		    			</div>
		  			</Tab>

					 <Tab eventKey="addProduct" title="Add Product">
					 	<div>
					    <AdminAdd/>
					    </div>
					 </Tab>


				 </Tabs>
				 <div>
				 {adminProduct}
				 </div>
			</Container>
		</Fragment>	
	)
}
