import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // Destructure commonly used props (optional)
  const {
    children,
    type = "text",
    placeholder,
    value,
    onChange,
    className = "",
    ...rest
  } = props;

  return (
    <div className="flex flex-col gap-4 relative mb-4">
      <input
        type={type} // Dynamic input type (text, password, email, etc.)
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref} // Forward the ref
        {...rest} // Spread all other props
        className={`outline-none border-b-solid border-b-2 border-black p-0 pb-2 ${className}`}
      />
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

export const InputErrorMessage: React.FC<InputErrorMessageProps> = ({ state }) => {
  return (
    <div
      className={`absolute top-full text-red-500 text-sm transition-all duration-300 ease-in-out ${
        state ? "opacity-100 h-6 translate-y-0" : "opacity-0 h-0 -translate-y-4"
      }`}
    >
      {state && <p>{state}</p>}
    </div>
  );
};