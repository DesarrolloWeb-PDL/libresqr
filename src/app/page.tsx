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
    const svg = document.getElementById('qr-code') as SVGElement;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            QR Creator
          </h1>
          <p className="text-gray-400">
            Generá códigos QR al instante
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ingresá el texto o URL
            </label>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setQrGenerated(false);
              }}
              placeholder="https://ejemplo.com"
              className="w-full h-32 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!text.trim()}
            className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Generar QR
          </button>

          {qrGenerated && text.trim() && (
            <div className="mt-6 flex flex-col items-center">
              <div className="bg-white p-4 rounded-xl mb-4">
                <QRCodeSVG
                  id="qr-code"
                  value={text}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <button
                onClick={handleDownload}
                className="py-2 px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar PNG
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Generá y descargá códigos QR gratis
        </p>
      </div>
    </div>
  );
}