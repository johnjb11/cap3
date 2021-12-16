import {Fragment, useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab, Col, Row, Container} from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 
import OrderHistoryCard from '../components/OrderHistoryCard'

export default function OrderHistoryView() {

  const {user, setUser} = useContext(UserContext)

  const [order, setOrder] = useState([])

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

    fetch(`http://localhost:4000/users/myOrderHistory`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      
      console.log(data)
      
      setOrder(data.map(order => {
        return (
          <Fragment>
            <OrderHistoryCard key= {order.id} orderHistoryProp = {order}/>
          </Fragment>
        )
      }))
      
    })
  }, [])

  return(

    <Fragment>
    
      <Container>
      <Row>
      {order}
      </Row>
      </Container>
    </Fragment> 
  )
}
