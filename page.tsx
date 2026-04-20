"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { ShieldCheck, Globe, Lock, Heart, ArrowRight } from "lucide-react";
import DonationWidget from "@/components/DonationWidget";

export default function Home() {
  const [stats, setStats] = useState<any>({ totalRaised: 850400, donorCount: 15402 });
  const [goal, setGoal] = useState(1000000);

  useEffect(() => {
    fetch("/api/stats").then(res => res.json()).then(data => setStats(data)).catch(() => {});
    fetch("/api/settings").then(res => res.json()).then(data => setGoal(data.targetGoal || 1000000)).catch(() => {});
  }, []);

  const impactStats = [
    { label: "Total Raised", value: `$${(stats?.totalRaised || 0).toLocaleString()}+`, icon: <Globe className="w-8 h-8 text-primary-blue" /> },
    { label: "Donors Worldwide", value: (stats?.donorCount || 0).toLocaleString(), icon: <Heart className="w-8 h-8 text-primary-green" /> },
    { label: "Families Helped", value: "4,200", icon: <ShieldCheck className="w-8 h-8 text-blue-500" /> },
  ];

  const recentDonors = [
    { name: "Sarah M.", amount: "$50", flag: "🇺🇸" },
    { name: "Anonymous", amount: "$500", flag: "🌍" },
    { name: "John D.", amount: "$100", flag: "🇬🇧" },
    { name: "Elena R.", amount: "$25", flag: "🇩🇪" },
    { name: "Anonymous", amount: "$1000", flag: "🌍" },
    { name: "Michael K.", amount: "$75", flag: "🇨🇦" },
    { name: "Sofia L.", amount: "$200", flag: "🇫🇷" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_aid_workers_1775987800391.png"
            alt="Aid workers helping child"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-[1.2] text-white text-center lg:text-left"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-blue-600/30 text-blue-200 px-6 py-2 rounded-full text-sm font-bold mb-6 tracking-widest uppercase border border-blue-400/20 backdrop-blur-md"
            >
              Urgent Humanitarian Appeal
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1]">
              Every Life <br />
              <span className="text-primary-green italic">Deserves Hope.</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl font-light leading-relaxed">
              We provide direct, life-saving aid to innocent families caught in conflict. Your support today means survival tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link href="/campaigns">
                <button className="btn-primary flex items-center justify-center gap-3 w-full sm:w-auto text-lg py-4 px-10 rounded-2xl">
                  Start Donating <ArrowRight className="w-6 h-6" />
                </button>
              </Link>
              <Link href="/transparency">
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-10 py-4 rounded-2xl font-bold transition-all w-full sm:w-auto text-lg shadow-lg">
                  See Proof of Aid
                </button>
              </Link>
            </div>

            {/* Trust Row */}
            <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-10 text-sm font-semibold opacity-70">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary-green" /> ISO-9001 VERIFIED
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-blue-400" /> BANK-GRADE SECURITY
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary-green" /> GLOBAL TRANSPARENCY
              </div>
            </div>
          </motion.div>

          {/* Elevated Donation Widget Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 w-full max-w-lg lg:max-w-md sticky top-24"
          >
             <div className="premium-card p-1 bg-white/95 backdrop-blur-xl">
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-1 text-primary-blue tracking-tight uppercase">Emergency Relief</h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium">100% of your donation reaches the field</p>
                  
                  <div className="mb-8">
                    <div className="flex justify-between text-sm mb-3">
                      <span className="font-bold text-gray-800">Raised: ${(stats?.totalRaised || 0).toLocaleString()}</span>
                      <span className="text-primary-green font-black tracking-tighter">{Math.round(((stats?.totalRaised || 0) / goal) * 100)}% COMPLETE</span>
                    </div>
                    <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(((stats?.totalRaised || 0) / goal) * 100, 100)}%` }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-primary-green relative overflow-hidden"
                      >
                         <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                  <DonationWidget />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner Marquee */}
      <div className="bg-white border-y border-gray-100 py-8 shadow-sm">
        <Marquee speed={50} gradient={true} gradientColor="white" gradientWidth={150}>
          {recentDonors.map((donor, i) => (
            <div key={i} className="flex items-center gap-4 px-12 border-r border-gray-100">
              <span className="text-3xl filter grayscale opacity-80">{donor.flag}</span>
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 tracking-tight">{donor.name}</span>
                <span className="text-primary-green font-black flex items-center gap-1">
                  {donor.amount} <span className="text-[10px] text-gray-400 font-normal uppercase tracking-widest">Received</span>
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Global Impact Stats */}
      <section className="py-32 container">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 tracking-tighter">World-Class Transparency.</h2>
          <p className="text-xl text-gray-500 font-medium">
            Join 15,000+ donors building a safer future for every child.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {impactStats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group premium-card p-12 text-center flex flex-col items-center gap-6 border-none ring-1 ring-gray-100"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center transition-all group-hover:bg-primary-blue group-hover:rotate-[10deg]">
                <div className="group-hover:text-white transition-colors">{stat.icon}</div>
              </div>
              <h3 className="text-5xl font-black text-gray-900 tracking-tighter">{stat.value}</h3>
              <p className="text-lg font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Visual Story */}
      <section className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full opacity-20 pointer-events-none">
          <Image src="/hero_child_portrait_1775987813159.png" alt="Overlay" fill className="object-cover" />
        </div>
        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Transparency <br />is our <span className="text-primary-blue">Religion.</span></h2>
            <div className="space-y-8">
              {[
                { title: "On-Ground Verification", desc: "Live GPS-tracked delivery receipts for every truckload." },
                { title: "Direct NGO Partnership", desc: "Partnering strictly with UN-certified local organizations." },
                { title: "Audited Financials", desc: "Monthly reports published openly for public scrutiny." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary-green transition-colors">
                    <ShieldCheck className="w-6 h-6 text-primary-green group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-2 group-hover:text-primary-green transition-colors">{item.title}</h4>
                    <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/transparency" className="inline-flex items-center gap-3 mt-4 text-primary-blue font-black text-xl hover:translate-x-2 transition-transform">
              Our Full Transparency Protocol <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <div className="flex-1 w-full overflow-hidden rounded-[3rem] shadow-3xl ring-1 ring-white/10 aspect-[4/5] relative">
             <Image 
               src="/hero_child_portrait_1775987813159.png" 
               alt="Resilience child portrait"
               fill
               className="object-cover"
             />
             <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-12">
               <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                 <p className="text-primary-green font-black uppercase tracking-widest text-xs mb-3">Field Update</p>
                 <p className="text-lg font-medium italic text-gray-200">"Because of your trust, Amira can smile again. We delivered her life-saving cardiac medicine last Tuesday."</p>
                 <p className="mt-4 text-sm font-bold opacity-60">— Dr. Reza, Field Medical Lead</p>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
