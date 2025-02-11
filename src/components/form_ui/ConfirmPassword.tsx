import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ConfirmPasswordProps {
  password: string;
  confirmPassword: string;
}

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({
  password,
  confirmPassword,
}) => {
  // Check if passwords match
  const passwordMatch = password === confirmPassword;

  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className={`transition-all duration-300 ease-in-out text-xs ${
          password && passwordMatch ? "text-green-500" : "text-slate-500"
        }`}
      />
      <p
        className={`text-sm ${
            password && passwordMatch ? "text-slate-900" : "text-slate-500"
        }`}
      >
        Passwords match
      </p>
    </div>
  );
};
export default ConfirmPassword;
