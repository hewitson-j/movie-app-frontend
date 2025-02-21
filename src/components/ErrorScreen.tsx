import { useNavigate } from "react-router-dom";
import "./ErrorScreen.css";
import Title from "./Title";

interface ErrorScreenProps {
  customTitle?: string;
  customMessage?: string;
  customPath?: string;
  showButton?: boolean;
}

export default function ErrorScreen({
  customMessage,
  customPath,
  customTitle,
  showButton = true,
}: ErrorScreenProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (customPath) navigate(customPath);
    else navigate(-1);
  };

  return (
    <div className="error-screen">
      <Title>{customTitle || "Error!"}</Title>
      <img src="NotFound.jpg" alt="Error" width={250} />
      <p>
        {customMessage ||
          "Looks like we can't process your request. Please click the button to go home to safety."}
      </p>
      {showButton && <button onClick={handleNavigate}>Go Back</button>}
    </div>
  );
}
