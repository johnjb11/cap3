
import { Fragment, useContext } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar(){

	
	const { user } = useContext(UserContext);

	return(
	<Navbar bg="light" expand="lg">
	  <Navbar.Brand as={Link} to="/" exact>DMS</Navbar.Brand>
	  <Navbar.Toggle aria-controls="basic-navbar-nav" />
	  <Navbar.Collapse id="basic-navbar-nav">
	    <Nav className="mr-auto">
					<Nav.Link as={Link} to="/">Home</Nav.Link>

					{(user.id !== null && user.isAdmin == false) ?
						<Fragment>
							<Nav.Link as={Link} to="/products">Products</Nav.Link>
							<Nav.Link as={Link} to="/myOrder">View Cart</Nav.Link>
							<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
						</Fragment>

						: (user.id !== null && user.isAdmin == true) ?
							<Fragment>
								<Nav.Link as={Link} to="/Admin">Products (Admin)</Nav.Link>
								<Nav.Link as={Link} to="/AdminOrderView">Orders (Admin)</Nav.Link>
								<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
							</Fragment>


								:
								<Fragment>

									<Nav.Link as={Link} to="/register" exact>Register</Nav.Link>

									<Nav.Link as={Link} to="/login">Login</Nav.Link>

								</Fragment>
					}

				</Nav>
			</Navbar.Collapse>
		</Navbar>





	)
}


