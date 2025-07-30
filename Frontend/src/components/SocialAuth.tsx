import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div className="flex flex-col space-y-4">
      <button className="flex items-center justify-center gap-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition text-white">
        <FcGoogle size={24} />
        <span>Continue with Google</span>
      </button>
      <button className="flex items-center justify-center gap-3 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition text-white">
        <FaFacebook size={24} className="text-blue-500" />
        <span>Continue with Facebook</span>
      </button>
    </div>
  );
}
