import {useState, useEffect, useContext} from 'react'
import {Col, Card, CardGroup, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function ProductCard({productProp}){

    console.log(productProp)

    const {name, description, price, stocks, availability, _id, isOutofStock} = productProp

    const {user} = useContext(UserContext)

    //order
    const [orderId, setOrderId] = useState('')
    const [userId, setUserId] = useState('')
    const [cartList, setCartList] = useState([])
    const [quantity, setQuantity] = useState('')
    const [subTotal, setSubTotal] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [status, setStatus] = useState('') 



    const addCart = async (_id) => {
        //console.log(_id)
        fetch(`http://localhost:4000/orders/order`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                orderId: orderId,
                userId: user.id,
                productId: _id,
                quantity: 1, 
                subTotal: subTotal,
                status: status,
                totalAmount: totalAmount
            })
        })
        .then(res => {
            return res.json()
        })
        .then(data => {

            if(data){
                Swal.fire({
                    title: 'Product added to cart',
                    icon: 'success'
                })

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

            //console.log(data)
            setOrderId(data.orderId)
            setUserId(data.userId)
            setCartList(data.cartList)
            setQuantity(data.quantity)
            setSubTotal(data.subTotal)
            setTotalAmount(data.totalAmount)
            setStatus(data.status)
        })
    }, [_id])


    return(
            
                <Col>
                    <CardGroup>
                    <Card>

                    <Card.Body >
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle>{description}</Card.Subtitle>
                        <Card.Text>Php {price}</Card.Text>

                        <Link className= "btn btn-primary m-2" to = {`/products/${_id}`}>See Details</Link>
                    </Card.Body>
                    </Card>
                    </CardGroup>
                </Col>
            
        
    )
}
