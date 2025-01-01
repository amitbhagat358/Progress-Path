//loading page for next js dashboard
import './loading.css';

export const LoadingForDashboard = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="container">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};
export default LoadingForDashboard;
