interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({ label, onClick, type = "button",disabled }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled} // Disable if email or password is not provided
  className={`w-full relative overflow-hidden group bg-blue-600 text-white py-2.5 rounded-md transition duration-300 shadow-md 
    hover:bg-blue-700 
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent 
    before:translate-x-[-100%] group-hover:before:translate-x-full before:transition-transform before:duration-700 before:opacity-20

    disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600 disabled:before:translate-x-[-100%]
  `}    >
      {label}

      {/* Enhanced Shine */}
      <span className="absolute top-0 left-[-100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80 rotate-[25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out pointer-events-none" />
    </button>
  );
}
