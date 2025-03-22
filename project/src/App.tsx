import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useAltCodes, setUseAltCodes] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    // Common alt code characters that are widely supported
    const altCodes = 'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑ';

    let chars = letters;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;
    if (useAltCodes) chars += altCodes;

    const generatedPassword = Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');

    setPassword(generatedPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-lg shadow-2xl p-6 max-w-md w-full border border-zinc-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Password Generator</h1>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              readOnly
              value={password}
              placeholder="Click Generate to create password"
              className="w-full p-3 pr-10 border border-zinc-700 rounded bg-zinc-800 font-mono text-white placeholder-zinc-500"
            />
            {password && (
              <button
                onClick={copyToClipboard}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Copy className="w-5 h-5 text-zinc-400 hover:text-blue-400 transition-colors" />
              </button>
            )}
          </div>

          {copied && (
            <p className="text-emerald-400 text-sm text-center">Copied!</p>
          )}

          <div>
            <label className="block text-sm mb-1 text-zinc-300">Length: {length}</label>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center text-zinc-300">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="mr-2 accent-blue-500"
              />
              Numbers
            </label>
            <label className="flex items-center text-zinc-300">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="mr-2 accent-blue-500"
              />
              Symbols
            </label>
            <label className="flex items-center col-span-2 text-zinc-300">
              <input
                type="checkbox"
                checked={useAltCodes}
                onChange={(e) => setUseAltCodes(e.target.checked)}
                className="mr-2 accent-blue-500"
              />
              Special Characters (é, ñ, æ, etc.)
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Generate Password
          </button>

          {useAltCodes && (
            <p className="text-sm text-zinc-400 mt-2">
              Note: Special characters include: ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑ
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;