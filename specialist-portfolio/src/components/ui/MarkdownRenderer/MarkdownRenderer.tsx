// src/components/ui/MarkdownRenderer/MarkdownRenderer.tsx
import React from 'react';

const MarkdownRenderer = ({ content }: { content: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default MarkdownRenderer;