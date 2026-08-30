
const Notification = ({message}) => {
    if(message == null){
        return null
    }

    return(
        <div className='successfulNotification'>
            <p>{message}</p>
        </div>
    )
}

export default Notification