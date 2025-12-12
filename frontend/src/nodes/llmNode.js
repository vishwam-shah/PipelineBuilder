// llmNode.js

import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', id: 'system', position: Position.Left, top: '33%' },
    { type: 'target', id: 'prompt', position: Position.Left, top: '66%' },
    { type: 'source', id: 'response', position: Position.Right }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      icon="🤖"
      color="#8b5cf6"
      handles={handles}
    >
      <div className="node-description">
        Large Language Model processor. Connect system instructions and prompts to generate AI responses.
      </div>
    </BaseNode>
  );
}
