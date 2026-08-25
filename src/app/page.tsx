'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const [text, setText] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerate = () => {
    if (text.trim()) {
      setQrGenerated(true);
    }
  };

  const handleDownload = () => {
    const svg = document.getElementById('qr-code') as unknown as SVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#ededed] mb-2">
            QR Creator
          </h1>
          <p className="text-[#a1a1aa]">
            Generá códigos QR al instante
          </p>
        </div>

        <div className="bg-[#141414] rounded-2xl p-6 shadow-2xl border border-[#262626]">
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#a1a1aa] mb-2">
              Ingresá el texto o URL
            </label>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setQrGenerated(false);
              }}
              placeholder="https://ejemplo.com"
              className="w-full h-32 px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-[#ededed] placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-[#e85d04] focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!text.trim()}
            className="w-full py-3 px-6 bg-[#e85d04] hover:bg-[#d45203] disabled:bg-[#262626] disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Generar QR
          </button>

          {qrGenerated && text.trim() && (
            <div className="mt-6 flex flex-col items-center">
              <div className="bg-white p-4 rounded-xl mb-4 relative">
                <QRCodeSVG
                  id="qr-code"
                  value={text}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#0a0a0a] p-2 rounded-lg">
                    <img
                      src="/logo.png"
                      alt="Logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="py-2 px-6 bg-[#262626] hover:bg-[#333] text-[#ededed] font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar PNG
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-[#737373] text-sm mt-6">
          Generá y descargá códigos QR gratis
        </p>
      </div>
    </div>
  );
}