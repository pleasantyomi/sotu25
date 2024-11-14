'use client';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { FaShare } from 'react-icons/fa'

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  const shareToInstagram = async () => {
    if (!pageRef.current) return;

    try {
      const canvas = await html2canvas(pageRef.current);
      const imageBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });

      if (navigator.share) {
        await navigator.share({
          files: [new File([imageBlob], 'sotu24.png', { type: 'image/png' })],
          title: 'SOTU24',
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const url = URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sotu24.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen relative" ref={pageRef}>
      <div className="h-screen grid items-center place-items-center">
        <h1 className="text-center font-semibold lg:text-[6rem] text-[4.5rem]">
          SOTU24
        </h1>
      </div>
      <button
        onClick={shareToInstagram}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
        aria-label="Share to Instagram"
      >
        <FaShare size={24} />
      </button>
    </div>
  );
}
