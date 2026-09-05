import React, { useRef } from 'react';
import { Bold, Italic, List, Heading1, Heading2, Link as LinkIcon, Quote, Code } from 'lucide-react';

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  helperText?: string;
}

export function RichTextEditorSimple({
  label,
  value,
  onChange,
  placeholder = 'Write content here (supports Markdown formatting)...',
  rows = 5,
  helperText
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selectedText = previousText.substring(start, end) || 'text';

    const replacement = `${before}${selectedText}${after}`;
    const nextValue = previousText.substring(0, start) + replacement + previousText.substring(end);

    onChange(nextValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 10);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
          {label}
        </label>
        <span className="text-[11px] text-slate-500">Markdown formatting enabled</span>
      </div>

      <div className="border border-slate-700/80 rounded-xl overflow-hidden bg-slate-950/60 focus-within:border-purple-500 transition-colors">
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 bg-slate-900/80 border-b border-slate-800 text-slate-400">
          <button
            type="button"
            onClick={() => insertFormat('**', '**')}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Bold (**text**)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('*', '*')}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Italic (*text*)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-3.5 bg-slate-700 mx-1" />
          <button
            type="button"
            onClick={() => insertFormat('## ')}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Heading 2 (## Heading)"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('### ')}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Heading 3 (### Heading)"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-3.5 bg-slate-700 mx-1" />
          <button
            type="button"
            onClick={() => insertFormat('- ')}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Bullet List (- item)"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('> ')}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Quote (> Quote)"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('`', '`')}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Inline Code (`code`)"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('[Link Title](', ')')}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Link ([Title](url))"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Text Input Area */}
        <textarea
          ref={textareaRef}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent p-3 text-sm text-slate-100 placeholder-slate-500 outline-none resize-y leading-relaxed font-sans"
        />
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      )}
    </div>
  );
}
