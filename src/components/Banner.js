import {Row, Col, Button} from 'react-bootstrap'

export default function Banner(){
	return(
	<Row>
		<Col className = "p-5">
			<h1>Deadpool's Magic Shop</h1>
			<p>Your Superhero's Wizardy Emporium</p>
			<Button variant = "warning"><a href="/products">Buy Now</a></Button>
		</Col>
	</Row>

	)
}