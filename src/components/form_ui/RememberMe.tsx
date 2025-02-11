const RememberMe = () => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        className="w-4 h-4 accent-blue-500 rounded"
      />
      <label htmlFor="rememberMe" className="text-sm text-gray-700">
        Remember Me
      </label>
    </div>
  );
};

export default RememberMe;
