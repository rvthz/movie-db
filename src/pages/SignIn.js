import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const SignIn = ({ setIsLoggedIn }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(''); 
  const [modalTitle, setModalTitle] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/user/auth', {
        login,
        password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', login);
      setIsLoggedIn(true);
      setModalTitle('Sukces');
      setModalMessage('Logowanie zakończone pomyślnie.');
      setModal(true);
      setTimeout(() => {
        setModal(false);
        navigate('/');
      }, 2000);
      console.log('Response:', response.data);
    } catch (error) {
      setModalTitle('Błąd');
      setModalMessage('Logowanie nie powiodło się. Sprawdź swoje dane i spróbuj ponownie.');
      setModal(true);
      console.error('Error:', error);
    }
  };

  const toggleModal = () => setModal(!modal);

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 text-center">
          <h2>Logowanie</h2>
          <form onSubmit={handleSignIn}>
            <div className="mb-3">
              <label htmlFor="login" className="form-label">Login:</label>
              <input type="text" id="login" name="login" className="form-control" value={login} onChange={(e) => setLogin(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Hasło</label>
              <input type="password" id="password" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Zaloguj się</button>
          </form>
          <p className="mt-3">Nie masz konta? <a href="/signup">Zarejestruj się</a></p>
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

export default SignIn;
