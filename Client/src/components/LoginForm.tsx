import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import RegisterForm from './ModalForm';



function LoginForm() {
  const [modalShow, setModalShow] = useState(false);
  
  const handleShow = () => setModalShow(true);
  
  return (
    <div className='row border border-primary min-vh-100 align-items-center'>
        <div className='col-12 col-md-8 col-lg-6 col-xl-5 mx-auto'>            
            <Card className='border rounded-3 bg-dark text-white'>
                <Card.Body className='p-4'>                    
                    <h2 className="fw-bold mb-2 text-uppercase text-center">Login</h2>
                    <p className="text-white-50 mb-5 text-center">Please enter your login and password!</p>    

                    <Form>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />        
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>      
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                    <div className='mt-5'>
                    <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold" onClick={handleShow}>Sign Up</a>
                    </p>
                    </div>
                </Card.Body>
            </Card>      
        </div>

        {/* Modal */}
        <RegisterForm 
        show={modalShow}
        onHide={() => setModalShow(false)}
        ></RegisterForm>
    </div>
  );
}

export default LoginForm;