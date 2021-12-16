import { Fragment, useState, useEffect, useContext } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import UserContext from '../UserContext';

export default function Login() {

    //Allow us to consume the User Context object and it's properties to use for user validation
    const { user, setUser} = useContext(UserContext);
	// State hooks to store the values of the input fields
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(false);


	function authenticate(e) {

    // Prevents page redirection via form submission
    e.preventDefault();

    fetch('http://localhost:4000/users/login',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })

    })
    .then(res => res.json())
    .then(data => {
        console.log(data)

        if(typeof data.access !== "undefined"){
            localStorage.setItem('token', data.access)
            retrieveUserDetails(data.access)

            Swal.fire({
                title: "Welcome to Deadpool's Magic Shop",
                icon: 'success'
            })
            
        } else {

            Swal.fire({
                title: 'Authentication Failed.',
                icon: 'error',
                text: 'Check your login details'
            })
        }
    })


    setEmail('');
    setPassword('');


	
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


	useEffect(() => {

    // Validation to enable submit button when all fields are populated and both passwords match
    if(email !== '' && password !== ''){
        setIsActive(true);
    }else{
        setIsActive(false);
    }

	}, [email, password]);


    return (
    (user.id !== null) ? 
        <Navigate to="/" />
        :
        <Fragment>
        <Form onSubmit={(e) => authenticate(e)}>
            <Form.Group controlId="userEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                   	onChange={(e) => setEmail(e.target.value)} 
                    required
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
            </Form.Group>

	        { isActive ? 
	            <Button className= "my-3" variant="primary" type="submit" id="submitBtn">
	                Submit
	            </Button>
	            : 
	            <Button className= "my-3" variant="danger" type="submit" id="submitBtn" disabled>
	                Submit
	            </Button>
	        }

        </Form>

         <Row>
            <Col className = "text-center">Don't have an account yet? Click <a href="/register">here</a> to register</Col>

            </Row>
          
          </Fragment>  
    )
}
