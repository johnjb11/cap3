import {Row, Col, Card} from 'react-bootstrap'

export default function Highlights() {
	return(
	<Row className = "mt-3 mb-3">
		<Col xs = {12} md = {4} >
			<Card className = "cardHighlight p-3">
				<Card.Body>
					<Card.Title>
						<h2>EVERYDAY SALE. UP TO 70% OFF ON SELECTED ITEMS</h2>
					</Card.Title>
					<Card.Text>
					
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
		<Col xs = {12} md = {4}>
			<Card className = "cardHighlight p-3">
				<Card.Body>
					<Card.Title>
						<h2>FLEXIBLE INSTALLMENT PACKAGES</h2>
						<br/>
						<h6>24 months, 2% interest</h6>
						<h6>12 months, 1% interest</h6>
						<h6>6 months, 0% interest</h6>
						<h6>3 months, 0% interest</h6>
					</Card.Title>
					<Card.Text>
						
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
		<Col xs = {12} md = {4}>
			<Card className = "cardHighlight p-3">
				<Card.Body>
					<Card.Title>
						<h2>CONTACT US</h2>
						<br/>
						<h6>Mobile Number: 09171234567</h6>
						<h6>Email: DMS@mail.com</h6>
						<h6>Facebook: Deadpool Magic Shop</h6>
						<h6>Instagram: @deadpoolmagicshop</h6>
					</Card.Title>
					<Card.Text>
					
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	</Row>
	)
}