import { Fragment, useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AdminView(props){

	// Destructure our courses data from the props being passed by the parent component (courses page)
	// Includes the "fetchData" function that retrieves the courses from our database
	const { productsData, fetchData } = props;

	// States for form inputs
	const [productId, setProductId] = useState("");
	const [products, setProducts] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	// States to open/close modals
	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);

	// Functions to toggle the opening and closing of the "Add Course" modal
	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	/* 
	Function to open the "Edit Course" modal:
		- Fetches the selected course data using the course ID
		- Populates the values of the input fields in the modal form
		- Opens the "Edit Course" modal
	*/
	const openEdit = (productId) => {

		// Fetches the selected course data using the course ID
		fetch(`${ process.env.REACT_APP_API_URL}/products/${ productId }`)
		.then(res => res.json())
		.then(data => {

			// console.log(data);

			// Changes the states for binded to the input fields
			// Populates the values of the input files in the modal form
			setProductId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})

		// Opens the "Edit Course" modal
		setShowEdit(true);
	};

	/* 
	Function to close our "Edit Course" modal:
		- Reset from states back to their initial values
		- Empties the input fields in the form whenever the modal is opened for adding a course
	*/
	const closeEdit = () => {

		setShowEdit(false);
		setName("");
		setDescription("");
		setPrice(0);

	};

	const addProduct = (e) => {

		// Prevent the form from redirecting to a different page on submit 
		// Helps retain the data if adding a course is unsuccessful
		e.preventDefault()

		fetch(`${ process.env.REACT_APP_API_URL }/products`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			// If the new course is successfully added
			if (data === true) {

				// Invoke the "fetchData" function passed from our parent component (courses page)
				// Rerenders the page because of the "useEffect"
				fetchData();

				// Show a success message via sweet alert
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully added."					
				})

				// Reset all states to their initial values
				// Provides better user experience by clearing all the input fieles when the user adds another course
				setName("")
				setDescription("")
				setPrice(0)

				// Close the modal
				closeAdd();

			} else {

				fetchData();

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
			}
		})
	}

	const editProduct = (e, productId) => {
		
		e.preventDefault();

		fetch(`${ process.env.REACT_APP_API_URL }/products/${ productId }`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			if (data === true) {

				fetchData();

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully updated."
				});

				closeEdit();

			} else {

				fetchData();

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				});

			}

		})
	}

	// Map through the courses received from the parent component (course page)
	// Re-renders the table whenever the "coursesData" is updated by adding, editing and deleting a course
	useEffect(() => {

		const archiveToggle = (productId, isActive) => {

			console.log(!isActive);

			fetch(`${ process.env.REACT_APP_API_URL }/products/${ productId }/archive`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ localStorage.getItem('token') }`
				},
				body: JSON.stringify({
					isActive: !isActive
				})
			})
			.then(res => res.json())
			.then(data => {

				if (data === true) {

					fetchData();

					Swal.fire({
						title: "Success",
						icon: "success",
						text: "Product successfully archived/unarchived."
					});

				} else {

					fetchData();

					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please try again."
					});

				}
			})
		}

		const productsArr = productsData.map(product => {

			return(

				<tr key={product._id}>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td>
						{/* 
							- If the course's "isActive" field is "true" displays "available"
							- Else if the course's "isActive" field is "false" displays "unavailable"
						*/}
						{product.isActive
							? <span>Available</span>
							: <span>Unavailable</span>
						}
					</td>
					<td>
						<Button
							variant="primary"
							size="sm"
							onClick={() => openEdit(product._id)}
						>
							Update
						</Button>
						{/* 
							- Display a red "Disable" button if course is "active"
							- Else display a green "Enable" button if course is "inactive"
						*/}
						{product.isActive
							?
							<Button 
								variant="danger" 
								size="sm" 
								onClick={() => archiveToggle(product._id, product.isActive)}
							>
								Disable
							</Button>
							:
							<Button 
								variant="success"
								size="sm"
								onClick={() => archiveToggle(product._id, product.isActive)}
							>
								Enable
							</Button>
						}
					</td>
				</tr>

			)

		});

		// Set the "courses" state with the table rows returned by the map function
		// Renders table row elements inside the table via this "AdminView" return statement below
		setProducts(productsArr);

	}, [productsData, fetchData]);

	return(
		<Fragment>

			<div className="text-center my-4">
				<h2>Admin Dashboard</h2>
				<div className="d-flex justify-content-center">
					<Button variant="primary" onClick={openAdd}>Add New Product</Button>			
				</div>			
			</div>

			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Actions</th>
					</tr>					
				</thead>
				<tbody>
					{products}
				</tbody>
			</Table>

			{/*ADD MODAL*/}
			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e => addProduct(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>	
						<Form.Group controlId="productName">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="productDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" value={description}  onChange={e => setDescription(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="productPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" value={price}  onChange={e => setPrice(e.target.value)} required/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			{/*EDIT MODAL*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProduct(e, productId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>	
						<Form.Group controlId="productName">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="productDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" value={description}  onChange={e => setDescription(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="productPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" value={price}  onChange={e => setPrice(e.target.value)} required/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			
		</Fragment>
	)
}
