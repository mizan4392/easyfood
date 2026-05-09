export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="relative w-14 h-14">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>

        {/* Animated Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-400 animate-spin"></div>

        {/* Inner Glow */}
        <div className="absolute inset-2 rounded-full bg-orange-50 blur-sm"></div>
      </div>
    </div>
  );
}
