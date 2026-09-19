import React from 'react';
import { Heart, RotateCcw, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';
import { AdvisorData } from '../types';

interface EndChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  advisorData: AdvisorData;
  endMessage: string;
}

export const EndChatModal: React.FC<EndChatModalProps> = ({
  isOpen,
  onRestart,
  advisorData,
  endMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="end-chat-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300"
    >
      <div className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center transform transition-all animate-in zoom-in-95 duration-200">
        {/* VietinBank Emblem / Heart icon */}
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#004b87] to-[#0072ce] flex items-center justify-center shadow-lg shadow-[#004b87]/25 mb-5">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white/20 animate-bounce" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Phiên hỗ trợ hoàn tất
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
          VietinBank Đồng Hành Cùng Quý Khách
        </h3>

        {/* Required Thank You message */}
        <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-50/60 to-slate-50 rounded-2xl border border-blue-100 text-slate-700 font-medium text-base sm:text-lg leading-relaxed mb-6 shadow-xs">
          "{endMessage}"
        </div>

        {/* Advisor card reminder */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6 text-left flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#004b87]/10 flex items-center justify-center text-[#004b87] font-bold text-sm">
              LT
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">
                {advisorData.role}
              </div>
              <div className="text-sm font-bold text-slate-900">
                {advisorData.name}
              </div>
            </div>
          </div>
          <a
            id="btn-modal-advisor-phone"
            href={`tel:${advisorData.phoneRaw}`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#004b87] hover:bg-[#003b6f] text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            {advisorData.phone}
          </a>
        </div>

        {/* Action button to return to home/menu */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            id="btn-end-chat-restart"
            onClick={onRestart}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#004b87] to-[#0066b3] hover:from-[#003b6f] hover:to-[#004b87] shadow-md shadow-[#004b87]/20 transition-all hover:-translate-y-0.5"
          >
            <RotateCcw className="w-4 h-4" />
            Quay lại menu chính để tra cứu tiếp
          </button>
        </div>
      </div>
    </div>
  );
};
