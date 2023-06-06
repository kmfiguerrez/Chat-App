import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertDismissible from './Alert';

interface FormData {    
    username: string,
    password: string
}

function LoginForm () {
  const [status, setStatus] = useState('typing') // 'typing', 'submitting', or 'success'
  const [error, setError] = useState<string | null>(null);
  const [person, setPerson] = useState<FormData>({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  
  // Event handlers
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting');

    try {
        const response = await fetch('http://localhost:80/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...person})
        })
        
        const data = await response.json()

        if (response.ok) {
            console.log(data)
            setStatus('success');
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
    <div className='row min-vh-100 align-items-center'>
        <div className='col-12 col-md-8 col-lg-6 col-xl-5 mx-auto'>

            {error !== null && 
                <AlertDismissible variant='danger' message={error}></AlertDismissible>
            }
            
            <Card className='border rounded-3 bg-dark text-white'>
                <Card.Body className='p-4'>                    
                    <h2 className="fw-bold mb-2 text-uppercase text-center">Login</h2>
                    <p className="text-white-50 mb-5 text-center">Please provide the required information!</p>    

                    <Form onSubmit={handleSubmit}>                                             
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
                            person.username.length === 0 ||
                            person.password.length === 0 ||
                            status === 'submitting'
                        }
                        >
                        {status === 'submitting' ? 'Loading...' : 'Login'}
                        </Button>
                    </Form>
                    <div className='mt-3 text-center'>          
                        <p className="mb-0">Don't have an account?<Link to="/register"> <span className='text-white-50 fw-bold'>Sign Up</span></Link></p>                        
                    </div>
                </Card.Body>
            </Card>
        </div>
    </div>
  );
}

export default LoginForm;