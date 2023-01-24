import "./chat.css"

const Chat = ({descendingOrderMessages}) => {
    return (
        <>
                <div className="chat--container">
                {descendingOrderMessages.map((message, _index) => (
                    <div key={_index}>
                        <div>
                            <div className="chat--image">
                                <img src={message.img} alt={message.name + ' profile'}/>
                            </div>
                            <p>{message.name}</p>
                        </div>
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Chat


