import { useNavigate } from 'react-router-dom';

function Chat() {
    const navigate = useNavigate()

    function handleClick() {
        navigate("/")
    }

    return (
        <>
            <h1>Chap app</h1>
            <button onClick={handleClick}>Logout</button>
        </>
        
    )
}

export default Chat;