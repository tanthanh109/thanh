import React, { useState, useEffect } from 'react';
import contentRaw from './data/contentData.json';
import { ContentData, GuideTopic } from './types';
import { Header } from './components/Header';
import { TopicSelection } from './components/TopicSelection';
import { GuideDetail } from './components/GuideDetail';
import { EndChatModal } from './components/EndChatModal';
import { ImageModal } from './components/ImageModal';
import { Footer } from './components/Footer';

const contentData = contentRaw as unknown as ContentData;

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<GuideTopic | null>(null);
  const [isEndChatOpen, setIsEndChatOpen] = useState(false);

  // Image Modal state for zooming screenshots
  const [modalImageState, setModalImageState] = useState<{
    isOpen: boolean;
    imageUrl: string;
    imageFallback?: string;
    title: string;
    stepNumber: number;
  }>({
    isOpen: false,
    imageUrl: '',
    imageFallback: undefined,
    title: '',
    stepNumber: 1,
  });

  // Check URL query on initial load to restore topic if shared
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get('topic');
    if (topicParam) {
      const found = contentData.topics.find((t) => t.id === topicParam);
      if (found) {
        setSelectedTopic(found);
      }
    }
  }, []);

  const handleSelectTopic = (topic: GuideTopic) => {
    setSelectedTopic(topic);
    // Update URL query without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('topic', topic.id);
    window.history.pushState({}, '', url.toString());
  };

  const handleBackToMenu = () => {
    setSelectedTopic(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('topic');
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEndChat = () => {
    setIsEndChatOpen(true);
  };

  const handleRestartChat = () => {
    setIsEndChatOpen(false);
    handleBackToMenu();
  };

  const handleOpenImageModal = (
    image: string,
    fallback: string | undefined,
    title: string,
    step: number
  ) => {
    setModalImageState({
      isOpen: true,
      imageUrl: image,
      imageFallback: fallback,
      title,
      stepNumber: step,
    });
  };

  const handleModalPrev = () => {
    if (!selectedTopic) return;
    const currentStep = modalImageState.stepNumber;
    if (currentStep > 1) {
      const prevStep = selectedTopic.steps.find((s) => s.step === currentStep - 1);
      if (prevStep) {
        setModalImageState({
          isOpen: true,
          imageUrl: prevStep.image,
          imageFallback: prevStep.imageFallback,
          title: `Bước ${prevStep.step}: ${prevStep.title}`,
          stepNumber: prevStep.step,
        });
      }
    }
  };

  const handleModalNext = () => {
    if (!selectedTopic) return;
    const currentStep = modalImageState.stepNumber;
    if (currentStep < selectedTopic.steps.length) {
      const nextStep = selectedTopic.steps.find((s) => s.step === currentStep + 1);
      if (nextStep) {
        setModalImageState({
          isOpen: true,
          imageUrl: nextStep.image,
          imageFallback: nextStep.imageFallback,
          title: `Bước ${nextStep.step}: ${nextStep.title}`,
          stepNumber: nextStep.step,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-[#004b87] selection:text-white font-sans">
      {/* Headbar with VietinBank logo on left */}
      <Header
        headerData={contentData.header}
        advisorData={contentData.advisor}
        onGoHome={handleBackToMenu}
        activeTopicTitle={selectedTopic?.title}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedTopic ? (
          <GuideDetail
            topic={selectedTopic}
            advisorData={contentData.advisor}
            feedbackConfig={contentData.feedback}
            onBackToMenu={handleBackToMenu}
            onEndChat={handleOpenEndChat}
            onOpenImageModal={handleOpenImageModal}
          />
        ) : (
          <TopicSelection
            question={contentData.mainQuestion}
            subtitle={contentData.mainSubtitle}
            topics={contentData.topics}
            onSelectTopic={handleSelectTopic}
            advisorData={contentData.advisor}
          />
        )}
      </main>

      {/* Image zoom lightbox modal */}
      <ImageModal
        isOpen={modalImageState.isOpen}
        onClose={() => setModalImageState((prev) => ({ ...prev, isOpen: false }))}
        imageUrl={modalImageState.imageUrl}
        imageFallback={modalImageState.imageFallback}
        title={modalImageState.title}
        stepNumber={modalImageState.stepNumber}
        totalSteps={selectedTopic?.steps.length}
        onPrev={modalImageState.stepNumber > 1 ? handleModalPrev : undefined}
        onNext={
          selectedTopic && modalImageState.stepNumber < selectedTopic.steps.length
            ? handleModalNext
            : undefined
        }
      />

      {/* End Chat Dialog Modal with required thank you message */}
      <EndChatModal
        isOpen={isEndChatOpen}
        onClose={() => setIsEndChatOpen(false)}
        onRestart={handleRestartChat}
        advisorData={contentData.advisor}
        endMessage={contentData.feedback.endChatMessage}
      />

      {/* Footer */}
      <Footer
        headerData={contentData.header}
        advisorData={contentData.advisor}
      />
    </div>
  );
}
