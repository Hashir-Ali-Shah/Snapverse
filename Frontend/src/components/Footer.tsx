export default function Footer() {
  return (
    <footer className="w-full px-6 py-6  bg-[#121212] text-gray-400 text-sm text-center border-t border-gray-800">
      © {new Date().getFullYear()} <span className="text-purple-500 font-semibold">Snapverse</span>. All rights reserved.
    </footer>
  );
}
