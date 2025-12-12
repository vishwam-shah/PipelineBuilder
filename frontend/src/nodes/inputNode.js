// inputNode.js

import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handles = [
    { type: 'source', id: 'value', position: Position.Right }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      icon="📥"
      color="#10b981"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-label">Name</label>
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="node-input"
          placeholder="Enter input name"
        />
      </div>
      <div className="node-field">
        <label className="node-label">Type</label>
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          className="node-select"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
}
