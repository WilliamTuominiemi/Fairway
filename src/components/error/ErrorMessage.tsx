type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <h1 className="text-xl p-2 text-red-500" data-testid="error-message">
    Error: {message}
  </h1>
);

export default ErrorMessage;
