// outputNode.js

import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handles = [
    { type: 'target', id: 'value', position: Position.Left }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      icon="📤"
      color="#ef4444"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-label">Name</label>
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="node-input"
          placeholder="Enter output name"
        />
      </div>
      <div className="node-field">
        <label className="node-label">Type</label>
        <select
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          className="node-select"
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}
