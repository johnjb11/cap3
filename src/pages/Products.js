import {Fragment, useEffect, useState, useContext} from 'react'
import { Navigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

import UserContext from '../UserContext'



export default function Products(){

const { user, setUser } = useContext(UserContext)


const [products, setProduct] = useState([])

useEffect(() => {
	fetch('http://localhost:4000/products/all')
	.then(res => res.json())
	.then(data => {
		console.log(data)
	
	setProduct(data.map(product => {
	return (
		<ProductCard key = {product.id} productProp = {product}/>
	)
}))


	})
}, [])



	return(

		(user.id !== null && user.isAdmin === true) ?
			<Navigate to='/admin' />

			:
				<Fragment>	
					<h1>Products</h1>
					{products}
				</Fragment>	
	)
}