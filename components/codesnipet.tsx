"use client"
import React, { useEffect, useRef } from 'react';
import { FaCopy } from 'react-icons/fa';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai.css'; // Voit vaihtaa teeman tarpeen mukaan

hljs.registerLanguage('javascript', javascript);

interface CodeSnippetProps {
  code: string;
  language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'javascript' }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="relative rounded-lg overflow-hidden inline-block">
      <pre className="p-4 bg-gray-800">
        <code ref={codeRef} className={`language-${language} text-sm`}>
          {code}
        </code>
      </pre>
      <button 
        onClick={copyToClipboard} 
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded p-2 focus:outline-none"
      >
        {isCopied ? 'Kopioitu!' : <FaCopy className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default CodeSnippet;