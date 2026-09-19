import React, { useState, useEffect, useRef } from 'react';
import {
  KeyRound,
  CreditCard,
  ScanFace,
  FileCheck,
  Receipt,
  CalendarDays,
  ArrowRight,
  Search,
  BookOpen,
  Sparkles,
  PhoneCall,
  PlayCircle
} from 'lucide-react';
import { gsap } from 'gsap';
import { GuideTopic, AdvisorData } from '../types';

interface TopicSelectionProps {
  question: string;
  subtitle: string;
  topics: GuideTopic[];
  onSelectTopic: (topic: GuideTopic) => void;
  advisorData: AdvisorData;
}

export const TopicSelection: React.FC<TopicSelectionProps> = ({
  question,
  subtitle,
  topics,
  onSelectTopic,
  advisorData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Icon selector based on topic id
  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'quen-mat-khau-ipay':
        return <KeyRound className="w-6 h-6 text-[#004b87]" />;
      case 'dong-the':
        return <CreditCard className="w-6 h-6 text-[#004b87]" />;
      case 'cap-nhat-sinh-trac-hoc':
        return <ScanFace className="w-6 h-6 text-[#004b87]" />;
      case 'nop-thue-dien-tu':
        return <Receipt className="w-6 h-6 text-[#004b87]" />;
      case 'dat-lich-qua-ipay':
        return <CalendarDays className="w-6 h-6 text-[#004b87]" />;
      default:
        return <BookOpen className="w-6 h-6 text-[#004b87]" />;
    }
  };

  const categories = ['Tất cả', 'Tài khoản & Đăng nhập', 'Dịch vụ Thẻ', 'Bảo mật & Sinh trắc', 'Thanh toán & Thuế', 'Tiện ích & Đặt lịch'];

  const filteredTopics = topics.filter((topic) => {
    const matchesCategory = activeCategory === 'Tất cả' || topic.category === activeCategory;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.steps.some((s) => s.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.topic-card-item');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
        );
      }
    }
  }, [activeCategory, searchTerm]);

  return (
    <section className="w-full py-6 sm:py-10">
      {/* Hero Title Section */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#004b87]/10 text-[#004b87] text-xs sm:text-sm font-bold tracking-wide uppercase mb-4 border border-[#004b87]/20 shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#e31b23]" />
          Cổng Trợ Giúp Trực Tuyến VietinBank iPay
        </div>

        {/* Primary Prompt Question */}
        <h1
          id="main-user-question"
          className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3.5"
        >
          {question}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          {subtitle}
        </p>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-topic"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm nội dung (mật khẩu, đóng thẻ, CCCD, nộp thuế...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004b87] focus:border-transparent transition shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full px-2 py-0.5"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* Filter categories pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#004b87] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid Cards */}
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto px-4"
      >
        {filteredTopics.map((topic, index) => {
          const firstStepImage = topic.steps[0]?.image;
          const firstStepImageFallback = topic.steps[0]?.imageFallback;

          return (
            <div
              key={topic.id}
              id={`topic-card-${topic.id}`}
              className="topic-card-item group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#004b87]"
            >
              {/* Card top banner / badge */}
              <div className="p-5 sm:p-6 pb-4">
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-100/80 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {getTopicIcon(topic.id)}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#004b87] bg-blue-50/90 px-2.5 py-1 rounded-full border border-blue-100">
                      {topic.stepCount} bước
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Chủ đề #{topic.number}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#004b87] transition-colors leading-snug mb-2">
                  {topic.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {topic.summary}
                </p>

                {/* Thumbnail preview badge */}
                <div className="relative h-28 w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-100 mb-2 flex items-center justify-center">
                  <img
                    src={firstStepImage}
                    alt={topic.title}
                    onError={(e) => {
                      if (firstStepImageFallback && e.currentTarget.src !== firstStepImageFallback) {
                        e.currentTarget.src = firstStepImageFallback;
                      }
                    }}
                    className="h-full w-full object-contain p-2 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-medium text-white flex items-center gap-1">
                      <PlayCircle className="w-3.5 h-3.5 text-red-400" /> Kèm video YouTube minh họa
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-5 sm:px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {topic.category}
                </span>
                <button
                  id={`btn-open-topic-${topic.id}`}
                  onClick={() => onSelectTopic(topic)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#004b87] hover:text-[#003b6f] group-hover:translate-x-0.5 transition-transform"
                >
                  Xem hướng dẫn
                  <ArrowRight className="w-4 h-4 text-[#e31b23]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto my-8 p-6 shadow-xs">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800 mb-1">Không tìm thấy nội dung phù hợp</h4>
          <p className="text-xs text-slate-500 mb-4">
            Vui lòng thử tìm kiếm với từ khóa khác hoặc quay lại danh sách tất cả chủ đề.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('Tất cả');
            }}
            className="px-4 py-2 bg-[#004b87] text-white rounded-xl text-xs font-semibold hover:bg-[#003b6f] transition"
          >
            Xem tất cả chủ đề
          </button>
        </div>
      )}

      {/* Floating / Quick Help Advisor Banner */}
      <div className="max-w-4xl mx-auto mt-10 sm:mt-14 px-4">
        <div className="bg-gradient-to-r from-blue-900 to-[#004b87] rounded-2xl p-4 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-800">
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <PhoneCall className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                Cần hỗ trợ trực tiếp từ Chuyên viên VietinBank?
              </h4>
              <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
                Liên hệ <strong className="text-white underline decoration-yellow-400">{advisorData.name}</strong> – Hotline tư vấn:{' '}
                <strong className="text-yellow-300">{advisorData.phone}</strong>
              </p>
            </div>
          </div>
          <a
            id="btn-banner-call-advisor"
            href={`tel:${advisorData.phoneRaw}`}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            Gọi ngay {advisorData.phone}
          </a>
        </div>
      </div>
    </section>
  );
};
