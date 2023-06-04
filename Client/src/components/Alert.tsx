import Alert from 'react-bootstrap/Alert';

interface AlertProps{
    variant: string,
    message: string
}

function AlertDismissible({ variant, message }: AlertProps) {
    return (
        <Alert variant={variant} dismissible>
            <p>{message}</p>
        </Alert>
    )
}

export default AlertDismissible;