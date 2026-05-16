'use client';

import { useMemo } from 'react';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const html = useMemo(() => {
    if (!content) return '';
    
    let processed = content
      // Code blocks: ```lang \n code \n ```
      .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<div class="code-block" data-lang="${lang}"><pre><code>${escapeHtml(code.trim())}</code></pre></div>`;
      })
      // Inline code: `code`
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      // Headers h2: ## text
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      // Headers h3: ### text
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // Bold: **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic: *text*
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links: [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Unordered lists: - item
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      // Wrap consecutive <li> into <ul>
      .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
      // Paragraphs (non-empty lines not already wrapped)
      .replace(/^(?!<[hl]|<ul|<li|<div|<pre|<code|<strong)(.+)$/gm, '<p>$1</p>');

    // Remove extra newlines
    return processed.replace(/\n/g, '');
  }, [content]);

  return (
    <div 
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// Helper to escape HTML in code blocks
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}