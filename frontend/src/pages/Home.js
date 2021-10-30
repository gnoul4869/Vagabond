import React from 'react';
import { Container } from 'react-bootstrap';
import ProductList from '../components/ProductList';

const Home = () => {
    return (
        <main className="text-center">
            <Container>
                <h1>Home</h1>
                <ProductList />
            </Container>
        </main>
    );
};

export default Home;
