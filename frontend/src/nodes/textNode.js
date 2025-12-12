// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 220, height: 'auto' });
  const textareaRef = useRef(null);

  // Extract variables from text (e.g., {{variableName}})
  useEffect(() => {
    const regex = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1].trim();
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }

    setVariables(matches);
  }, [currText]);

  // Adjust dimensions based on content
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      // Calculate width based on content
      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length), 20);
      const newWidth = Math.min(Math.max(220, maxLineLength * 8), 500);

      // Calculate height based on scroll height
      textarea.style.height = 'auto';
      const newHeight = Math.max(60, textarea.scrollHeight);
      textarea.style.height = `${newHeight}px`;

      setDimensions({ width: newWidth, height: 'auto' });
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create handles for each variable
  const handles = [
    ...variables.map((varName, index) => ({
      type: 'target',
      id: varName,
      position: Position.Left,
      top: `${((index + 1) * 100) / (variables.length + 1)}%`,
      style: { background: '#10b981' }
    })),
    { type: 'source', id: 'output', position: Position.Right }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      icon="📝"
      color="#f59e0b"
      handles={handles}
      style={{ width: dimensions.width }}
    >
      <div className="node-field">
        <label className="node-label">Text Content</label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="node-textarea"
          placeholder="Enter text... Use {{variableName}} for dynamic inputs"
        />
      </div>

      {variables.length > 0 && (
        <div className="node-field">
          <label className="node-label">Variables Detected</label>
          <div>
            {variables.map((varName) => (
              <span key={varName} className="variable-badge">
                {varName}
              </span>
            ))}
          </div>
        </div>
      )}
    </BaseNode>
  );
}
