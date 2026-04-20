"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Coins, CheckCircle, Copy, Check } from "lucide-react";

export default function DonationWidget() {
  const [amount, setAmount] = useState<number>(50);
  const [currency, setCurrency] = useState("USD");
  const [frequency, setFrequency] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("fiat");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [cryptoType, setCryptoType] = useState("USDT");
  const [copied, setCopied] = useState(false);
  const [cryptoAddresses, setCryptoAddresses] = useState<any>({
    USDT: "Loading...",
    BTC: "Loading...",
    ETH: "Loading..."
  });

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        setCryptoAddresses({
          USDT: data.usdtAddress || "0x123...abc",
          BTC: data.btcAddress || "bc1qxy2...def",
          ETH: data.ethAddress || "0x456...ghi"
        });
      })
      .catch(() => console.error("Failed to load crypto addresses"));
  }, []);

  const handleCopy = () => {
    const address = cryptoAddresses[cryptoType as keyof typeof cryptoAddresses];
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFiatDonation = async () => {
    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          isAnonymous,
          campaignId: "medical-supplies"
        }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        const msg = data.error || "Please check your Stripe configuration in .env.local";
        alert(`⚠️ Donation Failed\n\nReason: ${msg}`);
        console.error("Payment API error response:", data);
      }
    } catch (e: any) {
      alert("❌ Technical Connection Error: " + (e.message || "Could not reach the server."));
      console.error("Network/Fetch Error:", e);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Frequency Toggle */}
      <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
        {["one-time", "monthly"].map((type) => (
          <button
            key={type}
            onClick={() => setFrequency(type)}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              frequency === type 
                ? "bg-white text-primary-blue shadow-sm ring-1 ring-gray-100" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Amount Selector */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Select Amount ({currency})</label>
        <div className="grid grid-cols-3 gap-3">
          {[20, 50, 100].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`py-4 rounded-2xl font-black text-lg transition-all border-2 ${
                amount === val 
                  ? "border-primary-green bg-emerald-50 text-primary-green" 
                  : "border-gray-100 bg-white text-gray-800 hover:border-gray-200"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-300 group-focus-within:text-primary-blue transition-colors">{currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-primary-blue focus:outline-none font-black text-lg transition-all"
            placeholder="Other Amount"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Payment Gateway</label>
        <div className="flex gap-3">
          <button
            onClick={() => setPaymentMethod("fiat")}
            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
              paymentMethod === "fiat" ? "border-primary-blue bg-blue-50 text-primary-blue" : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase">Card / PayPal</span>
          </button>
          <button
            onClick={() => setPaymentMethod("crypto")}
            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
              paymentMethod === "crypto" ? "border-primary-green bg-emerald-50 text-primary-green" : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <Coins className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase">Crypto Assets</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {paymentMethod === "fiat" ? (
          <motion.div
            key="fiat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={isAnonymous} 
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 rounded-lg border-2 border-gray-100 checked:bg-primary-green transition-all"
              />
              <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">Hide my identity from public</span>
            </label>
            <button 
              onClick={handleFiatDonation}
              className="w-full btn-primary text-xl py-6 rounded-[2rem] shadow-2xl shadow-emerald-200"
            >
              Confirm Donation
            </button>
            <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest leading-loose">
              Direct & Instant <br /> Secure SSL Protected Verification
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="crypto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 space-y-4"
          >
            <select 
              value={cryptoType} 
              onChange={(e) => setCryptoType(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-gray-200 font-black text-sm uppercase tracking-widest focus:outline-none focus:border-primary-green"
            >
              <option value="USDT">USDT (Stablecoin)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
            </select>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col items-center gap-4">
               <div className="w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center font-black text-gray-200 text-xs text-center p-4">
                  QR CODE <br /> GENERATING...
               </div>
               <div className="w-full space-y-2">
                 <p className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em] text-center">Network Address</p>
                 <div className="w-full flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                   <p className="flex-1 text-[10px] font-mono break-all font-bold text-gray-600 italic">
                     {cryptoAddresses[cryptoType as keyof typeof cryptoAddresses]}
                   </p>
                   <button 
                    onClick={handleCopy}
                    className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all active:scale-90"
                   >
                     {copied ? <Check className="w-4 h-4 text-primary-green" /> : <Copy className="w-4 h-4 text-gray-400" />}
                   </button>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
