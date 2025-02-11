import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PasswordStrengthChecklistProps {
  password: string;
}

const getPasswordValidationRules = (password: string) => {
  return [
    { label: "At least 6 characters", valid: password.length >= 6 },
    { label: "At least one uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "At least one number", valid: /\d/.test(password) },
    { label: "At least one lowercase letter", valid: /[a-z]/.test(password) },
    { label: "At least one special character", valid: /[@$!%*?&]/.test(password) },
  ];
};

const PasswordStrengthChecklist: React.FC<PasswordStrengthChecklistProps> = ({ password }) => {
  const rules = getPasswordValidationRules(password);

  return (
    <div className="grid grid-cols-2 gap-2">
      {rules.map(({ label, valid }) => (
        <div key={label} className="flex items-center gap-2 text-xs">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={`transition-all duration-300 ease-in-out ${valid ? "text-green-500" : "text-slate-500"}`}
          />
          <p className={`text-sm ${valid ? "text-slate-900" : "text-slate-500"}`}>{label}</p>
        </div>
      ))}
    </div>
  );
};

export default PasswordStrengthChecklist;
