import React, { useState } from 'react';
import { Phone, ShieldCheck, Headphones, RotateCcw } from 'lucide-react';
import { HeaderData, AdvisorData } from '../types';

interface HeaderProps {
  headerData: HeaderData;
  advisorData: AdvisorData;
  onGoHome: () => void;
  activeTopicTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  headerData,
  advisorData,
  onGoHome,
  activeTopicTitle,
}) => {
  const [logoSrc, setLogoSrc] = useState(headerData.logo);

  const handleLogoError = () => {
    if (logoSrc !== headerData.logoFallback) {
      setLogoSrc(headerData.logoFallback);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo & Brand on Left */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            id="btn-header-logo"
            onClick={onGoHome}
            className="flex items-center gap-3 text-left group transition focus:outline-none"
            title="Về trang chủ hướng dẫn"
          >
            <div className="h-10 sm:h-12 w-auto max-w-[170px] sm:max-w-[210px] flex items-center">
              <img
                src={logoSrc}
                alt="VietinBank Logo"
                onError={handleLogoError}
                className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </div>
            <div className="hidden md:block pl-3 border-l border-slate-200">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#004b87]">
                Hỗ Trợ Khách Hàng
              </span>
              <span className="block text-[13px] font-bold text-slate-700">
                VietinBank iPay Mobile
              </span>
            </div>
          </button>
        </div>

        {/* Center Breadcrumb indicator when inside topic */}
        {activeTopicTitle && (
          <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100/90 py-1.5 px-3 rounded-full border border-slate-200/60 max-w-sm truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-[#004b87] shrink-0" />
            <span className="truncate">Đang xem: <strong className="text-slate-700">{activeTopicTitle}</strong></span>
          </div>
        )}

        {/* Right actions: Advisor contact & Home */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            id="btn-call-advisor"
            href={`tel:${advisorData.phoneRaw}`}
            className="flex items-center gap-2 bg-[#004b87]/10 hover:bg-[#004b87]/15 text-[#004b87] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition border border-[#004b87]/20"
            title={`Gọi chuyên viên tư vấn ${advisorData.name}`}
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e31b23] animate-pulse" />
            <div className="text-left leading-tight hidden xs:block">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Tư vấn viên</span>
              <span className="font-bold text-[#004b87]">{advisorData.phone}</span>
            </div>
            <span className="xs:hidden font-bold">{advisorData.phone}</span>
          </a>

          {activeTopicTitle && (
            <button
              id="btn-header-home"
              onClick={onGoHome}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Menu chính</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
