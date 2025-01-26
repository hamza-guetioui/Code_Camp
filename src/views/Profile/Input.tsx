import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // Destructure commonly used props (optional)
  const {
    children,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    className = "",
    ...rest
  } = props;

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="ml-2 font-semibold">{label} :</span>
        
        <input
          type={type} // Dynamic input type (text, password, email, etc.)
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref} // Forward the ref
          {...rest} // Spread all other props
          className={`outline-none border-solid border-2 rounded-full border-black/70 p-2 px-4 ${className}`}
        />
      </label>

      {children}
    </div>
  );
});

// Set a display name for the component (useful for debugging)
Input.displayName = "Input";

export default Input;

interface InputErrorMessageProps {
  state: string; // Error message to display
}

export const InputErrorMessage: React.FC<InputErrorMessageProps> = ({
  state,
}) => {
  return (
    <div
      className={`text-red-500 text-sm transition-all duration-300 ease-in-out ${
        state ? "opacity-100 h-6" : "opacity-0 h-0"
      }`}
    >
      {state && <p>{state}</p>}
    </div>
  );
};
