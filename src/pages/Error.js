import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'

export default function Error(){

    return(
        <Row>
            <Col>
                <h1>404 - Page Not Found</h1>
                <Link to="/">Back to Homepage</Link>
            </Col>
        </Row>
    )
}
