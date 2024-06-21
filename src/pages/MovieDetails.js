import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardTitle, CardText, Container, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const examplePoster = 'https://s.studiobinder.com/wp-content/uploads/2019/06/Movie-Poster-Template-Movie-Credits-StudioBinder.jpg';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false); // Nowy stan dla modalu potwierdzającego usunięcie

  useEffect(() => {
    axios.get(`http://localhost:3001/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const toggleModal = () => setModal(!modal);

  const toggleConfirmDeleteModal = () => setConfirmDeleteModal(!confirmDeleteModal);

  const handleDelete = () => {
    toggleConfirmDeleteModal(); // Pokazanie modalu potwierdzającego usunięcie
  };

  const confirmDelete = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Musisz się zalogować, aby usunąć film');
      toggleModal();
      return;
    }

    axios.delete(`http://localhost:3001/api/movies/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Film został usunięty:', response.data);
      toggleConfirmDeleteModal(); // Ukrycie modalu potwierdzającego
      toggleModal(); // Pokazanie modalu potwierdzającego usunięcie
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        setError('Musisz się zalogować, aby usunąć film');
      } else {
        console.error('Błąd podczas usuwania filmu:', error);
        setError(error.message);
      }
      toggleModal();
    });
  };

  if (loading) {
    return <div>Łączenie...</div>;
  }

  return (
    <>
        <Container className="mt-4">
          <Row className="d-flex justify-content-center">
            {movie ? (
              <Card className="mt-3" style={{minHeight: '50%', width: '80%', padding: '5px' }}>
                <Row noGutters>
                  <Col md={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={movie.image || examplePoster} 
                      alt={movie.title} 
                      style={{ maxHeight: '100%', minWidth: '100%' }} 
                    />
                  </Col>
                  <Col md={8}>
                  <CardBody className="text-center">
                    <p style={{ fontSize: '1.5em' }}><strong>{movie.title}</strong></p>
                    <p className="card-text-unlimited">{movie.content}</p>
                    <Button color="danger" onClick={handleDelete} className="mt-auto">Usuń Film</Button>
                  </CardBody>
                  </Col>
                </Row>
              </Card>
            ) : (
              <p>Nie znaleziono filmu</p>
            )}
          </Row>
        </Container>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Błąd</ModalHeader>
        <ModalBody>
          {error}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>OK</Button>
        </ModalFooter>
      </Modal>
          {}
      <Modal isOpen={confirmDeleteModal} toggle={toggleConfirmDeleteModal}>
        <ModalHeader toggle={toggleConfirmDeleteModal}>Potwierdzenie</ModalHeader>
        <ModalBody>
          Czy na pewno chcesz usunąć ten film?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete}>Tak</Button>
          <Button color="secondary" onClick={toggleConfirmDeleteModal}>Nie</Button>
        </ModalFooter>
      </Modal>

      {}
      <Modal isOpen={modal && !confirmDeleteModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Sukces</ModalHeader>
        <ModalBody>
          Film został usunięty pomyślnie
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => navigate('/')}>OK</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MovieDetails;
