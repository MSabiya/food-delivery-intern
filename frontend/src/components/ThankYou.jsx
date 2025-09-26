import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Payment Successful!
      </h1>
      <p className="text-lg mb-6">Your order has been placed successfully.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ThankYou;
