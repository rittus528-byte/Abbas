import Link from "next/link";
import { Heart, Globe, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-8 group">
            <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center group-hover:rotate-[10deg] transition-transform">
              <Heart className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              AidIran<span className="text-primary-green">.io</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            A global crowdfunding platform dedicated to providing direct, transparent aid to innocent families caught in crisis.
          </p>
          <div className="flex gap-4">
             {/* Social Mockup */}
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-blue transition-colors cursor-pointer"><Globe className="w-4 h-4" /></div>
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-blue transition-colors cursor-pointer"><Mail className="w-4 h-4" /></div>
          </div>
        </div>
        
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Navigation</h3>
          <ul className="space-y-4 text-sm font-medium text-gray-400">
            <li><Link href="/" className="hover:text-primary-blue transition-colors">Home</Link></li>
            <li><Link href="/campaigns" className="hover:text-primary-blue transition-colors">Emergency Campaigns</Link></li>
            <li><Link href="/transparency" className="hover:text-primary-blue transition-colors">Proof & Transparency</Link></li>
            <li><Link href="/contact" className="hover:text-primary-blue transition-colors">Partner With Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Governance</h3>
          <ul className="space-y-4 text-sm font-medium text-gray-400">
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Operations</Link></li>
            <li><Link href="/refunds" className="hover:text-white transition-colors">Refund Protocol</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Data Security</Link></li>
            <li className="flex items-center gap-2 text-primary-green">
                <ShieldCheck className="w-4 h-4" /> Vetted NGO Status
            </li>
          </ul>
        </div>

        <div>
           <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Official Contact</h3>
           <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">General Enquiries</p>
              <p className="font-bold text-lg mb-4">info@aidiran.io</p>
              <p className="text-xs text-primary-green font-black uppercase tracking-widest">Response Time: &lt; 24h</p>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} AidIran.io. 100% Tax Deductible (Reg No. 5824-D).
        </p>
        <div className="flex gap-8">
           {/* Trust Badges Mockup */}
           <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">SSL Encrypted</div>
           <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">Stripe Verified</div>
           <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">PayPal Verified</div>
        </div>
      </div>
    </footer>
  );
}
