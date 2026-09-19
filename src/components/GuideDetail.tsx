import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  ExternalLink,
  Youtube,
  PhoneCall,
  RotateCcw,
  LogOut,
  ZoomIn,
  MessageSquareHeart,
  ChevronRight,
  ShieldAlert,
  Play,
  Share2
} from 'lucide-react';
import { gsap } from 'gsap';
import { GuideTopic, GuideStep, AdvisorData, FeedbackConfig, UserFeedbackState } from '../types';

interface GuideDetailProps {
  topic: GuideTopic;
  advisorData: AdvisorData;
  feedbackConfig: FeedbackConfig;
  onBackToMenu: () => void;
  onEndChat: () => void;
  onOpenImageModal: (image: string, fallback: string | undefined, title: string, step: number) => void;
}

export const GuideDetail: React.FC<GuideDetailProps> = ({
  topic,
  advisorData,
  feedbackConfig,
  onBackToMenu,
  onEndChat,
  onOpenImageModal,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [userFeedback, setUserFeedback] = useState<UserFeedbackState>('unanswered');
  const [currentStepView, setCurrentStepView] = useState<'all' | number>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const feedbackSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCompletedSteps([]);
    setUserFeedback('unanswered');

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [topic.id]);

  const toggleStepCompleted = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const markAllComplete = () => {
    setCompletedSteps(topic.steps.map((s) => s.step));
    // Scroll smoothly to feedback
    setTimeout(() => {
      feedbackSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleFeedbackChoice = (choice: 'ok' | 'need_help') => {
    const newState: UserFeedbackState = choice === 'ok' ? 'completed_ok' : 'needs_support';
    setUserFeedback(newState);
    setTimeout(() => {
      feedbackSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const progressPercent = Math.round((completedSteps.length / topic.steps.length) * 100);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Navigation Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          id="btn-back-to-menu-top"
          onClick={onBackToMenu}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#004b87] bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          {feedbackConfig.backToMenu}
        </button>

        <div className="flex items-center gap-2">
          <button
            id="btn-share-guide"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 transition"
            title="Sao chép liên kết"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copiedLink ? 'Đã sao chép!' : 'Chia sẻ'}
          </button>

          <button
            id="btn-end-chat-top"
            onClick={onEndChat}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            {feedbackConfig.endChat}
          </button>
        </div>
      </div>

      {/* Topic Title Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="px-3 py-1 bg-[#004b87]/10 text-[#004b87] font-bold text-xs rounded-full border border-[#004b87]/20 uppercase tracking-wider">
            {topic.category}
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 font-semibold text-xs rounded-full">
            Tổng cộng {topic.stepCount} bước thực hiện
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-2.5">
          {topic.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mb-5">
          {topic.summary}
        </p>

        {/* Progress Bar and Quick Action */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
              <span>Tiến độ thực hiện theo hướng dẫn:</span>
              <span className="text-[#004b87] font-bold">
                {completedSteps.length}/{topic.steps.length} bước ({progressPercent}%)
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#004b87] to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllComplete}
              className="text-xs font-semibold text-slate-600 hover:text-[#004b87] hover:underline"
            >
              Đánh dấu hoàn thành tất cả
            </button>
          </div>
        </div>
      </div>

      {/* Step by Step List */}
      <div className="space-y-6 sm:space-y-8 mb-10">
        {topic.steps.map((stepItem: GuideStep) => {
          const isDone = completedSteps.includes(stepItem.step);

          return (
            <div
              key={stepItem.step}
              id={`step-${stepItem.step}`}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md ${
                isDone ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200/90'
              }`}
            >
              {/* Step Header */}
              <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-3 bg-slate-50/50 border-b border-slate-100">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs transition-colors ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#004b87] text-white'
                    }`}
                  >
                    {isDone ? '✓' : stepItem.step}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Bước {stepItem.step} / {topic.steps.length}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {stepItem.title}
                    </h3>
                  </div>
                </div>

                <button
                  id={`btn-check-step-${stepItem.step}`}
                  onClick={() => toggleStepCompleted(stepItem.step)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={isDone ? 'Bỏ đánh dấu' : 'Đánh dấu đã làm xong'}
                >
                  {isDone ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="hidden xs:inline">Đã làm</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-slate-400" />
                      <span className="hidden xs:inline">Chưa làm</span>
                    </>
                  )}
                </button>
              </div>

              {/* Step Content: Text + Screenshot */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Text explanation */}
                <div className="md:col-span-6 flex flex-col justify-center">
                  <div className="prose prose-sm text-slate-700 font-medium text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                    {stepItem.description}
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <span>Mẹo: Click vào hình ảnh để phóng to toàn màn hình</span>
                  </div>
                </div>

                {/* Illustrative Screenshot */}
                <div className="md:col-span-6 flex justify-center">
                  <div
                    onClick={() =>
                      onOpenImageModal(
                        stepItem.image,
                        stepItem.imageFallback,
                        `Bước ${stepItem.step}: ${stepItem.title}`,
                        stepItem.step
                      )
                    }
                    className="group relative max-w-[280px] sm:max-w-[320px] w-full bg-slate-100 rounded-2xl overflow-hidden border-2 border-slate-200/90 shadow-sm cursor-zoom-in hover:border-[#004b87] hover:shadow-lg transition-all"
                  >
                    <img
                      src={stepItem.image}
                      alt={`Minh họa bước ${stepItem.step}: ${stepItem.title}`}
                      onError={(e) => {
                        if (stepItem.imageFallback && e.currentTarget.src !== stepItem.imageFallback) {
                          e.currentTarget.src = stepItem.imageFallback;
                        }
                      }}
                      className="w-full h-auto max-h-[360px] object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-xs sm:text-sm gap-1.5 backdrop-blur-2xs">
                      <ZoomIn className="w-5 h-5" />
                      <span>Nhấn để phóng to ảnh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* YouTube Video Section (Requirement: cuối mỗi nội dung lớn là link video đến youtube để người dùng xem, để một icon video điều hướng tới app youtube) */}
      {topic.youtubeUrl && (
        <div
          id="topic-youtube-section"
          className="bg-gradient-to-r from-red-50 via-white to-red-50/40 rounded-2xl border-2 border-red-200/80 p-5 sm:p-7 mb-10 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/25 shrink-0 animate-pulse">
                <Youtube className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                  Video Hướng Dẫn Trực Quan
                </span>
                <h4 className="text-base sm:text-xl font-bold text-slate-900">
                  Xem video minh họa trên YouTube
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Theo dõi video từng bước thực hiện trên ứng dụng YouTube chính thức
                </p>
              </div>
            </div>

            <a
              id="btn-open-youtube-video"
              href={topic.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base shadow-md shadow-red-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              Mở xem trên YouTube
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Post-guide Feedback & Support Section */}
      {/* Requirements:
          - Sau mỗi phần hướng dẫn xong, hỏi khách hàng thực hiện ổn hay chưa? 
          - Nếu đã ổn quay lại menu chính cho khách hàng lựa chọn tiếp. 
          - Nếu khách hàng nói chưa ổn “ Cảm ơn Quý khách đã phản hồi. Quý khách có thể liên hệ Chuyên viên tư vấn Lê Tấn Thành – số điện thoại: 0905.12.19.18 để hỗ trợ trực tiếp. Em sẽ cố gắng cải thiện để phục vụ Quý khách tốt hơn!” 
          - Mục "Kết thúc cuộc trò chuyện" bên cạnh phần "Quay lại menu chính"
      */}
      <div
        ref={feedbackSectionRef}
        id="post-guide-feedback-section"
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg text-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-[#004b87] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <MessageSquareHeart className="w-4 h-4 text-[#004b87]" />
          Đánh Giá Trải Nghiệm Hướng Dẫn
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
          {feedbackConfig.question}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md mx-auto">
          Phản hồi của Quý khách giúp chúng tôi liên tục nâng cao chất lượng hỗ trợ người dùng VietinBank iPay.
        </p>

        {/* Choice Buttons: Đã ổn vs Chưa ổn */}
        {userFeedback === 'unanswered' && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              id="btn-feedback-ok"
              onClick={() => handleFeedbackChoice('ok')}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2.5 py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
            >
              <CheckCircle className="w-5 h-5" />
              {feedbackConfig.successOption}
            </button>

            <button
              id="btn-feedback-need-help"
              onClick={() => handleFeedbackChoice('need_help')}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2.5 py-3.5 px-5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-amber-500/20 transition-all hover:-translate-y-0.5"
            >
              <ShieldAlert className="w-5 h-5" />
              {feedbackConfig.helpOption}
            </button>
          </div>
        )}

        {/* State 1: When user says "Đã ổn" */}
        {userFeedback === 'completed_ok' && (
          <div className="animate-in fade-in zoom-in-95 duration-200 max-w-lg mx-auto">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 font-semibold text-sm sm:text-base mb-6 flex items-center justify-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>Tuyệt vời! Quý khách đã hoàn thành thao tác thành công.</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="btn-feedback-ok-back-menu"
                onClick={onBackToMenu}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#004b87] hover:bg-[#003b6f] shadow-md transition"
              >
                <RotateCcw className="w-4 h-4" />
                {feedbackConfig.backToMenu}
              </button>

              <button
                id="btn-feedback-ok-end-chat"
                onClick={onEndChat}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition"
              >
                <LogOut className="w-4 h-4 text-slate-500" />
                {feedbackConfig.endChat}
              </button>
            </div>
          </div>
        )}

        {/* State 2: When user says "Chưa ổn" -> Advisor message and direct contact */}
        {userFeedback === 'needs_support' && (
          <div className="animate-in fade-in zoom-in-95 duration-200 max-w-xl mx-auto">
            {/* Required message from document */}
            <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200/80 rounded-2xl text-slate-800 font-medium text-sm sm:text-base leading-relaxed mb-6 shadow-xs text-left">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneCall className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-900 text-base mb-1">
                    Hỗ trợ trực tiếp từ Chuyên viên VietinBank
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    "{advisorData.message}"
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Call Button for Advisor */}
            <div className="mb-6 flex justify-center">
              <a
                id="btn-call-advisor-direct"
                href={`tel:${advisorData.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-[#e31b23] hover:from-red-700 hover:to-red-600 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-5 h-5" />
                Gọi Chuyên viên Lê Tấn Thành: {advisorData.phone}
              </a>
            </div>

            {/* Navigation Options: Menu chính & Kết thúc cuộc trò chuyện side by side */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 border-t border-slate-100">
              <button
                id="btn-feedback-help-back-menu"
                onClick={onBackToMenu}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#004b87] hover:bg-[#003b6f] shadow-md transition"
              >
                <RotateCcw className="w-4 h-4" />
                {feedbackConfig.backToMenu}
              </button>

              <button
                id="btn-feedback-help-end-chat"
                onClick={onEndChat}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition"
              >
                <LogOut className="w-4 h-4 text-slate-500" />
                {feedbackConfig.endChat}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
