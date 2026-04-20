import Link from "next/link";
import { Heart } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary-blue rounded-xl flex items-center justify-center group-hover:rotate-[10deg] transition-transform">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="text-2xl font-black text-secondary-blue tracking-tighter">
            AidIran<span className="text-primary-green">.io</span>
          </span>
        </Link>
        
        <nav className="flex items-center gap-4 md:gap-10">
          <Link href="/" className="hidden md:block text-sm font-bold text-gray-600 hover:text-primary-blue transition-colors">Home</Link>
          <Link href="/campaigns" className="hidden lg:block text-sm font-bold text-gray-600 hover:text-primary-blue transition-colors">Campaigns</Link>
          <Link href="/transparency" className="hidden lg:block text-sm font-bold text-gray-600 hover:text-primary-blue transition-colors">Transparency</Link>
          <div className="hidden md:block h-6 w-px bg-gray-100 mx-1" />
          <Link href="/admin/login" className="text-xs md:text-sm font-black text-primary-blue hover:opacity-70 transition-colors uppercase tracking-widest px-2 md:px-4">
            Portal
          </Link>
          <Link href="/campaigns">
            <button className="bg-primary-green text-white px-4 md:px-6 py-2 rounded-xl font-black text-xs md:text-sm hover:bg-emerald-600 transition-all shadow-md active:scale-95">
              Donate Now
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">
            <button className="p-2 text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </div>
    </header>
  );
}
