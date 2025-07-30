
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // <-- add this
  error?: string;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  className = "",
  error
}: InputProps) {
  return (
    <>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    onBlur={onBlur} // 
className={`w-full px-0 py-2 bg-transparent text-white placeholder-gray-400 border-b focus:outline-none transition-all duration-200 ${
  error
    ? "border-red-500 focus:border-red-500"
    : "border-white focus:border-blue-500"
} ${className}`}

    />
     {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </>
  );
}
