import React, { useEffect } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageFallback?: string;
  title: string;
  stepNumber?: number;
  totalSteps?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageFallback,
  title,
  stepNumber,
  totalSteps,
  onPrev,
  onNext,
}) => {
  const [currentSrc, setCurrentSrc] = React.useState(imageUrl);

  React.useEffect(() => {
    setCurrentSrc(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div
      id="image-preview-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-800/90 border-b border-slate-700 text-white">
          <div className="flex items-center gap-3">
            {stepNumber && (
              <span className="px-2.5 py-1 bg-[#004b87] text-white rounded-lg text-xs font-bold uppercase tracking-wider">
                Bước {stepNumber}{totalSteps ? ` / ${totalSteps}` : ''}
              </span>
            )}
            <h4 className="text-sm sm:text-base font-semibold text-slate-100 truncate max-w-md">
              {title}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
              title="Đóng xem ảnh"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image Body */}
        <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center min-h-[300px] bg-slate-950/60">
          <img
            src={currentSrc}
            alt={title}
            onError={() => {
              if (imageFallback && currentSrc !== imageFallback) {
                setCurrentSrc(imageFallback);
              }
            }}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
          />

          {/* Prev / Next buttons */}
          {onPrev && (
            <button
              id="btn-modal-prev"
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition shadow-lg"
              title="Bước trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {onNext && (
            <button
              id="btn-modal-next"
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition shadow-lg"
              title="Bước tiếp theo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-800/80 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
          <span>Dùng phím mũi tên ← → để chuyển bước, phím ESC để đóng.</span>
          <span className="flex items-center gap-1 text-slate-300">
            <ZoomIn className="w-3.5 h-3.5" /> Hình minh họa chuẩn VietinBank iPay
          </span>
        </div>
      </div>
    </div>
  );
};
