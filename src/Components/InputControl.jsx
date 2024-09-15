const InputControl = (props) => {
  return (
    <div className="flex flex-col gap-2">
      {props.label && (
        <label className="font-bold text-gray-800">{props.label}</label>
      )}
      <input
        type="text"
        {...props}
        className="border border-gray-300 rounded-md px-4 py-2 outline-none transition duration-300 focus:border-purple-600"
      />
    </div>
  );
};

export default InputControl;
