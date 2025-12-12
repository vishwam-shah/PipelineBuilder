// conditionalNode.js - Conditional logic node

import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || 'greater');
    const [threshold, setThreshold] = useState(data?.threshold || '0');

    const handles = [
        { type: 'target', id: 'input', position: Position.Left },
        { type: 'source', id: 'true', position: Position.Right, top: '33%' },
        { type: 'source', id: 'false', position: Position.Right, top: '66%' }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Conditional"
            icon="🔀"
            color="#f97316"
            handles={handles}
        >
            <div className="node-field">
                <label className="node-label">Condition</label>
                <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="node-select"
                >
                    <option value="greater">Greater Than</option>
                    <option value="less">Less Than</option>
                    <option value="equals">Equals</option>
                    <option value="notEquals">Not Equals</option>
                </select>
            </div>
            <div className="node-field">
                <label className="node-label">Threshold</label>
                <input
                    type="text"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="node-input"
                    placeholder="Enter threshold value"
                />
            </div>
        </BaseNode>
    );
}
