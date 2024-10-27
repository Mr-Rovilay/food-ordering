
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-800 to-slate-900">
      {/* Floating particles in background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-emerald-500/10 animate-ping" />
        <div className="absolute w-32 h-32 rounded-full bg-emerald-500/5 animate-pulse" />
        <div className="absolute w-40 h-40 delay-150 rounded-full bg-emerald-500/5 animate-pulse" />
      </div>
      
      {/* Main loader container */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative">
          {/* Spinning circles around loader */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-0 w-2 h-2 -translate-x-1/2 -translate-y-8 rounded-full left-1/2 bg-emerald-400" />
            <div className="absolute bottom-0 w-2 h-2 -translate-x-1/2 translate-y-8 rounded-full left-1/2 bg-emerald-400" />
            <div className="absolute left-0 w-2 h-2 -translate-x-8 -translate-y-1/2 rounded-full top-1/2 bg-emerald-400" />
            <div className="absolute right-0 w-2 h-2 translate-x-8 -translate-y-1/2 rounded-full top-1/2 bg-emerald-400" />
          </div>
          
          {/* Main loader icon */}
          <Loader className="w-16 h-16 text-white animate-spin" />
        </div>
        
        {/* Loading text with shimmer effect */}
        <div className="relative mt-16">
          <span className="text-lg font-medium text-white">Loading....</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
};
export default Loading