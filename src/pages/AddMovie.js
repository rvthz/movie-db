import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, CardTitle, CardText, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: ''
  });
  const [modal, setModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/movies', formData);
      console.log('Response:', response.data);
      setModal(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleModal = () => setModal(!modal);

  const isFormDataValid = formData.title && formData.image && formData.content;

  return (
    <Container className='mt-5'>
      <Row>
        <Col md={6} style={{padding: '10%'}}>
          <h2>Dodaj film</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="image">Plakat</label>
              <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Wprowadź adres URL obrazu"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="title">Tytuł</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Wprowadź tytuł filmu"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="content">Opis</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="4"
                placeholder="Wprowadź opis filmu"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Dodaj film</button>
          </form>
        </Col>
        {isFormDataValid && (
          <Col md={6} className="ml-auto" style={{align: 'center'}}>
            <Card className="mt-3" style={{ width: '50%'}}>
              <CardImg top width="100%" src={formData.image} alt={formData.title} />
              <CardBody>
                <CardTitle tag="h5">{formData.title}</CardTitle>
                <CardText>{formData.content}</CardText>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Sukces</ModalHeader>
        <ModalBody>
          Film został dodany pomyślnie!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>OK</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AddMovie;
