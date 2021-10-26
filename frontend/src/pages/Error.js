import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Error = () => {
    return (
        <section>
            <Container>
                <h1>Error</h1>
                <Button variant="primary">
                    <Link to="/" className="text-light text-decoration-none">
                        Back Home
                    </Link>
                </Button>
            </Container>
        </section>
    );
};

export default Error;
