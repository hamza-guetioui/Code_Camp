import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PasswordValidationProps {
  password: string;
}

const validatePassword = (password: string) => {
  const rules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(password),
    },
     {
      label: "At least one number",
      valid: /\d/.test(password),
    },
    {
      label: "At least one lowercase letter",
      valid: /[a-z]/.test(password),
    },
   
    {
      label: "At least one special character",
      valid: /[@$!%*?&]/.test(password),
    },
  ];

  return rules;
};

const PasswordValidation: React.FC<PasswordValidationProps> = ({
  password,
}) => {
  const rules = validatePassword(password);

  return (
    <div className="grid grid-cols-[1fr,1fr] ">
      {rules.map((rule) => (
        <div key={rule.label} className="flex items-center  gap-2 text-xs ">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={`transition-all duration-300 ease-in-out ${
              rule.valid ? "text-green-500" : "text-slate-500"
            }`}
          />
          <p
            className={`text-sm ${
              rule.valid ? "text-slate-900" : "text-slate-500"
            }`}
          >
            {rule.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PasswordValidation;
