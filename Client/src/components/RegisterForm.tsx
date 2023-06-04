import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertDismissible from './Alert';

interface FormData {
    firstname: string,
    lastname: string,
    username: string,
    password: string
}

const RegisterForm: React.FC = () => {
  const [status, setStatus] = useState('typing') // 'typing', 'submitting', or 'success' 
  const [error, setError] = useState<string | null>(null);
  const [person, setPerson] = useState<FormData>({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  
  // Event handlers
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting'); 

    try {
        const response = await fetch('http://localhost:80/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...person})
        })
        
        const data = await response.json()

        if (response.ok) {
            console.log(data)        
            setStatus('success')
            navigate("/chat")    
        } else {
            throw new Error(data.message)
        }                        
            
    } catch (error: any) {
        console.log(error);
        setStatus('typing');
        setError(error.message);
                
    }    
  }

  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {    
    setPerson({
        ...person,
        firstname: e.target.value
    })
  }

  function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {    
    setPerson({
        ...person,
        lastname: e.target.value
    })
  }

  function handleUserNameChange(e: ChangeEvent<HTMLInputElement>) {    
    setPerson({
        ...person,
        username: e.target.value
    })
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {    
    setPerson({
        ...person,
        password: e.target.value
    })
  }
  
  return (
    <div className='row border border-primary min-vh-100 align-items-center'>
        <div className='col-12 col-md-8 col-lg-6 col-xl-5 mx-auto'>
            
            {error !== null && 
                <AlertDismissible variant='danger' message={error}></AlertDismissible>
            }

            <Card className='border rounded-3 bg-dark text-white'>
                <Card.Body className='p-4'>                    
                    <h2 className="fw-bold mb-2 text-uppercase text-center">Register</h2>
                    <p className="text-white-50 mb-5 text-center">Please provide the required information!</p>                                            

                    <Form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-12 col-sm-6'>
                            <Form.Group className="mb-3" controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" value={person.firstname} onChange={handleFirstNameChange} placeholder="Enter First Name" />        
                            </Form.Group>
                            </div>
                            <div className='col-12 col-sm-6'>
                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={person.lastname} onChange={handleLastNameChange} placeholder="Enter Last Name" />        
                            </Form.Group>
                            </div>
                        </div>                                                
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={person.username} onChange={handleUserNameChange} placeholder="Enter Username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={person.password} onChange={handlePasswordChange} placeholder="Enter Password" />
                        </Form.Group>

                        <Button 
                        variant="primary" 
                        type="submit"
                        disabled={
                            person.firstname.length === 0 ||
                            person.lastname.length === 0 ||
                            person.username.length === 0 ||
                            person.password.length === 0 ||
                            status === 'submitting'
                        }
                        >
                        {status === 'submitting' ? 'Loading...' : 'Submit'}
                        </Button>
                    </Form>
                    <div className='mt-3 text-center'>          
                        <p className="mb-0">Already have an account?<Link to="/"> <span className='text-white-50 fw-bold'>Login here</span></Link></p>                        
                    </div>                  
                </Card.Body>
            </Card>
        </div>
    </div>
  );
}

export default RegisterForm;