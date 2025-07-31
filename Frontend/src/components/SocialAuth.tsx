import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div className="flex flex-col space-y-4">
      <button className="flex items-center justify-center gap-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition text-white relative overflow-hidden group
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent 
        before:translate-x-[-100%] group-hover:before:translate-x-full before:transition-transform before:duration-700 before:opacity-20
        disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white/10 disabled:before:translate-x-[-100%]
      ">
        <FcGoogle size={24} />
        <span>Continue with Google</span>
        <span className="absolute top-0 left-[-100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80 rotate-[25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out pointer-events-none" />
      </button>

      <button className="flex items-center justify-center gap-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition text-white relative overflow-hidden group
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent 
        before:translate-x-[-100%] group-hover:before:translate-x-full before:transition-transform before:duration-700 before:opacity-20
        disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white/10 disabled:before:translate-x-[-100%]
      ">
        <FaGithub size={24} className="text-gray-300" />
        <span>Continue with GitHub</span>
        <span className="absolute top-0 left-[-100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80 rotate-[25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out pointer-events-none" />
      </button>
    </div>
  );
}
