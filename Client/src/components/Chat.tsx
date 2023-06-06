import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Card, Container, Form, Nav, Navbar, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:80');

function Chat() {
    const [message, setMessage] = useState('')
    // const navigate = useNavigate()

    function handleSendMessage() {        
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

            <Card className='mt-3 mb-3 rounded-3 border border-dark ' style={{ width: '100%', height: '300px' }}>                
                <Card.Body>
                    <Card.Title>Messages</Card.Title>
                    <Card.Text>
                    Fake messages
                    </Card.Text>                    
                </Card.Body>
            </Card>

            <Stack direction="horizontal" gap={3}>
                <Form.Control 
                className="me-auto" 
                placeholder="Enter your message"
                value={message}
                onChange={handleMessageChange}
                />
                <Button variant="primary" onClick={handleSendMessage}>Send</Button>                 
            </Stack>
        </>        
    )
}

export default Chat;