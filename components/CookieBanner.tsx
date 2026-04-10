'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('vda_cookie_consent');
        if (!consent) {
            // Small delay so it doesn't flash on load
            const t = setTimeout(() => setIsVisible(true), 800);
            return () => clearTimeout(t);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('vda_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const decline = () => {
        localStorage.setItem('vda_cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 w-full sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 z-[100] animate-fade-in-up"
            style={{ animation: 'fadeInUp .5s ease-out forwards' }}
        >
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(100%); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @media (min-width: 640px) {
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translate(-50%, 16px); }
                        to   { opacity: 1; transform: translate(-50%, 0); }
                    }
                }
            `}</style>
            
            <div className="mx-auto w-full max-w-4xl p-4 sm:p-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:px-6 sm:py-4 rounded-t-2xl sm:rounded-2xl bg-[#0a0f1c]/95 backdrop-blur-xl border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,.5)] sm:shadow-[0_10px_40px_rgba(0,0,0,.5)]">
                    
                    <div className="flex-1 pr-2">
                        <h4 className="text-white text-sm font-bold tracking-wide mb-1">Privacidade e Cookies</h4>
                        <p className="text-[12px] sm:text-xs text-slate-400 font-medium leading-relaxed">
                            Usamos cookies para lembrar suas preferências e respeitar as leis de proteção de dados (LGPD), garantindo uma experiência segura e personalizada. Você pode gerenciar suas opções abaixo.
                        </p>
                    </div>

                    <div className="flex w-full sm:w-auto items-center gap-3 mt-2 sm:mt-0">
                        <button
                            onClick={decline}
                            className="flex-1 sm:flex-none border border-white/10 bg-transparent text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/5 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-300"
                        >
                            Recusar
                        </button>
                        <button
                            onClick={accept}
                            className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-400 text-black py-2.5 px-6 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                        >
                            Aceitar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
