import {useState, Fragment, useEffect} from 'react'

import {Row, Col, Card, Container, Button} from 'react-bootstrap'

import Swal from 'sweetalert2'

import '../App.css'

export default function AdminProductCard({adminProductProp}){

	const {name, description, price, stocks, availability, _id} = adminProductProp
	
	return(
		<Fragment>
		<Container>
		<Row>
			<Col>
				<Card>
					<Card.Body>
					<Container>
					<Row>
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle>Description:</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price: </Card.Subtitle>
						<Card.Text>{price}</Card.Text>
						<Card.Subtitle>Stocks: </Card.Subtitle>
						<Card.Text>{stocks}</Card.Text>
						<Card.Subtitle>Availability: </Card.Subtitle>
						<Card.Text>{availability}</Card.Text>
						
						</Row>
					</Container>
					</Card.Body>
				</Card>
			</Col>
		</Row>
		</Container>
		</Fragment>
	)
}
