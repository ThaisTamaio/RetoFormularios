import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [formValues, setFormValues] = useState({ email: '', password: '', favClass: '1' });
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
    // Validate email on each change
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
    // Validate password on each change
    validatePassword(e.target.value);
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isEmailValid = emailRegex.test(email);
    setEmailValid(isEmailValid);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,}$/;
    const isPasswordValid = passwordRegex.test(password);
    setPasswordValid(isPasswordValid);
  };

  const clickSubmit = () => {
    // Validate email and password before submitting
    validateEmail(formValues.email);
    validatePassword(formValues.password);

    // Check if both email and password are valid before submitting
    if (emailValid && passwordValid) {
      // Show the success modal and store the user's email and selected class
      setShowSuccessModal(true);
      setUserEmail(formValues.email);
      setSelectedClass(formValues.favClass);
    } else {
      // Show the error modal if the form is not valid
      setShowErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    // Close the error modal
    setShowErrorModal(false);
  };

  const handleCloseSuccessModal = () => {
    // Close the success modal
    setShowSuccessModal(false);
  };

  return (
    <div>
      <h1>My Form</h1>
      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            value={formValues.email}
            isInvalid={!emailValid}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={formValues.password}
            isInvalid={!passwordValid}
          />
          <Form.Control.Feedback type="invalid">
            Password should contain at least one letter, one number, and one special character and be at least 9 characters long.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange} value={formValues.favClass}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologias web</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please correct the form errors before submitting.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Congratulations! You have successfully submitted the form.
          <br />
          User Email: {userEmail}
          <br />
          Selected Class: {selectedClass === '1' ? 'ISIS3710' : 'Programación con tecnologias web'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;