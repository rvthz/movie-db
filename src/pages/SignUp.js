import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/user/create', formData);
      console.log(response.data);
      setModalTitle('Sukces');
      setModalMessage('Rejestracja zakończona pomyślnie.');
      setModal(true);
      setTimeout(() => {
        setModal(false);
        navigate('/signin');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
      setModalTitle('Błąd');
      setModalMessage('Rejestracja nie powiodła się. Sprawdź swoje dane i spróbuj ponownie.');
      setModal(true);
    }
  };

  const toggleModal = () => setModal(!modal);

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <h2>Rejestracja</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nazwa:</label>
              <input type="text" id="name" name="name" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" id="email" name="email" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Hasło:</label>
              <input type="password" id="password" name="password" className="form-control" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Zarejestruj się</button>
          </form>
          <p className="mt-3">Masz już konto? <a href="/signin">Zaloguj się</a></p>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
        <ModalBody>
          {modalMessage}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>OK</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SignUp;
