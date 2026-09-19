import React from 'react';
import { Phone, Shield, ExternalLink, Heart } from 'lucide-react';
import { HeaderData, AdvisorData } from '../types';

interface FooterProps {
  headerData: HeaderData;
  advisorData: AdvisorData;
}

export const Footer: React.FC<FooterProps> = ({ headerData, advisorData }) => {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200/90 text-slate-600 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left col: VietinBank Brand & Disclaimer */}
          <div>
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-800 text-base">
              <span className="text-[#004b87]">VietinBank</span>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-semibold uppercase text-slate-500">iPay Hỗ Trợ Khách Hàng</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-3">
              Hệ thống hướng dẫn thao tác nghiệp vụ trực tuyến dành cho khách hàng cá nhân sử dụng ứng dụng Ngân hàng số VietinBank iPay Mobile.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bảo mật chuẩn an toàn Ngân hàng Nhà nước</span>
            </div>
          </div>

          {/* Center col: Hotlines */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2.5">
              Đường dây nóng hỗ trợ
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#004b87]"></span>
                <span>Tổng đài VietinBank 24/7:</span>
                <a href="tel:1900558868" className="font-bold text-[#004b87] hover:underline">
                  {headerData.hotline}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e31b23]"></span>
                <span>Chuyên viên tư vấn hỗ trợ:</span>
                <a href={`tel:${advisorData.phoneRaw}`} className="font-bold text-[#e31b23] hover:underline">
                  {advisorData.phone}
                </a>
              </li>
              <li className="text-slate-400 text-[11px] pt-1">
                Chuyên viên: <strong>{advisorData.name}</strong> ({advisorData.role})
              </li>
            </ul>
          </div>

          {/* Right col: Official Channels */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2.5">
              Kênh chính thức
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="https://www.vietinbank.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-600 hover:text-[#004b87] transition"
              >
                <span>Website chính thức: www.vietinbank.vn</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="https://www.youtube.com/@vietinbank"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-600 hover:text-red-600 transition"
              >
                <span>Kênh YouTube VietinBank</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} Ngân hàng TMCP Công Thương Việt Nam - VietinBank. Nâng giá trị cuộc sống.</p>
          <p className="flex items-center gap-1">
            Ứng dụng hỗ trợ thao tác iPay
          </p>
        </div>
      </div>
    </footer>
  );
};
