import {useState, useEffect, useContext} from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import {useParams , useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

export default function ProductView(){

	const {productId} = useParams()

	const {user} = useContext(UserContext)

	const history = useNavigate() 

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice]= useState('')
	const [stocks, setStocks] = useState('')
	const [availability, setAvailability] = useState('')

	//order
	const [orderId, setOrderId] = useState('')
	const [userId, setUserId] = useState('')
	const [cartList, setCartList] = useState([])
	const [quantity, setQuantity] = useState('')
	const [subTotal, setSubTotal] = useState('')
	const [totalAmount, setTotalAmount] = useState('')
	const [status, setStatus] = useState('') 



	const addCart = async (productId) => {
		console.log(productId)
		fetch(`http://localhost:4000/orders/order`, {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				orderId: orderId,
				userId: user.id,
				productId: productId,
				quantity: 1, 
				subTotal: subTotal,
				status: status,
				totalAmount: totalAmount
			})
		})
		.then(res =>{
			return res.json()
		} )
		.then(data => {
		

			if(data){
				Swal.fire({
					title: 'Product added to cart',
					icon: 'success'
				})

				history(-1)

			} else { 
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error'
				})
			}

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

			setOrderId(data.orderId)
			setUserId(data.userId)
			setCartList(data.cartList)
			setQuantity(data.quantity)
			setSubTotal(data.subTotal)
			setTotalAmount(data.totalAmount)
			setStatus(data.status)
		})
	}, [productId])

	useEffect(() => {

		fetch(`http://localhost:4000/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
			setStocks(data.stocks)
			setAvailability(data.availability)
		})
	}, [productId])



	return(

		<Container>
			<Row>
				<Col>
					<Card>
						<Card.Body>
						<Container>
						<Row >
							<Col>
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description: </Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>₱{price}</Card.Text>
							<Card.Subtitle>Description: </Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Stocks: </Card.Subtitle>
							<Card.Text>{stocks}</Card.Text>
							<Card.Subtitle>Available: </Card.Subtitle>
							<Card.Text>{availability}</Card.Text>

							{ (user.id !== null && user.isAdmin === false) ?
								<Button variant = "primary" onClick={() => addCart(productId)}>Add to cart</Button>
								:
								<Button variant = "primary" as={Link} to="/logout" >Sign in</Button>
							}
							</Col>
						</Row>
						</Container>
						</Card.Body>	
					</Card>	
				</Col>	
			</Row>	
		</Container>	
	)
}

