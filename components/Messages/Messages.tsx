function Messages({ messages }: Props) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}
export default Messages;

type Props = {
  messages: Message[];
};
