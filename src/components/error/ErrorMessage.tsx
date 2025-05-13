type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <h1 className="text-4xl p-5 text-red-500">Error: {message}</h1>
);

export default ErrorMessage;
