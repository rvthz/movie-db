import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Container, Row, Col } from 'reactstrap';
import axios from 'axios';

const examplePoster = 'https://s.studiobinder.com/wp-content/uploads/2019/06/Movie-Poster-Template-Movie-Credits-StudioBinder.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/movies')
            .then(response => {
                this.setState({ movies: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error: error.message, loading: false });
            });
    }

    render() {
        const { movies, loading, error } = this.state;

        if (loading) {
            return <div>Łączenie...</div>;
        }

        if (error) {
            return <div>Błąd: {error}</div>;
        }

        return (
            <Container className="mt-4">
                <Row xs="1" sm="2" md="3" lg="4" xl="5">
                    {movies.map(movie => (
                        <Col key={movie.id} className="mb-4">
                            <Card className="h-100">
                                <CardImg top width="100%" src={movie.image || examplePoster} alt={movie.title} />
                                <CardBody className="d-flex flex-column">
                                    <CardTitle tag="h5" className="card-title">{movie.title}</CardTitle>
                                    <CardText className="card-text">{movie.content}</CardText>
                                    <Button color="primary" tag={Link} to={`/details/${movie.id}`} className="mt-auto">
                                        Szczegóły
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default Home;
