import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Card, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:80');

function Chat() {
    const [message, setMessage] = useState('')
    // const navigate = useNavigate()

    function handleSendMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(message)
        socket.emit("send_message", message)
        setMessage('')
    }

    function handleMessageChange(e: ChangeEvent<HTMLInputElement>) {
        setMessage(e.target.value);
    }
    

    return (
        <>            
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Chat App</Navbar.Brand>
                <Nav className="ms-auto">                    
                    <Link to='/' style={{ color: 'gray', textDecoration: 'none' }}>Logout</Link>
                </Nav>
                </Container>
            </Navbar>

            <Card className='mt-3 mb-3 rounded-3 border border-light ' style={{ width: '100%', height: '300px' }}>                
                <Card.Body>
                    <Card.Title>Messages</Card.Title>
                    <Card.Text>
                    Fake messages
                    </Card.Text>                    
                </Card.Body>
            </Card>

            <Form onSubmit={handleSendMessage}>
                <div className='row'>
                    <div className='col-10'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                        <Form.Control 
                        type="text" 
                        placeholder="Enter your message"
                        value={message}
                        onChange={handleMessageChange} />                    
                    </Form.Group>
                    </div>
                    <div className='col-2'>
                        <Button type='submit' >Send</Button>
                    </div>
                </div>                                
            </Form>            
        </>        
    )
}

export default Chat;