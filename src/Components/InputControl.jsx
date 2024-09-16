const InputControl = ({ label, type, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-bold text-primary">{label}</label>
      )}
      <input
        type={type}
        {...props}
        className="border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-300 focus:border-gray_bg"
      />
    </div>
  );
};

export default InputControl;
