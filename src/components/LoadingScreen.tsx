import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="spinner">
        <span>Loading</span>
        <div className="half-spinner"></div>
      </div>
    </div>
  );
}
