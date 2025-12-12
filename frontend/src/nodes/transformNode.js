// transformNode.js - Data transformation node

import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
    const [operation, setOperation] = useState(data?.operation || 'uppercase');

    const handles = [
        { type: 'target', id: 'input', position: Position.Left },
        { type: 'source', id: 'output', position: Position.Right }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Transform"
            icon="⚡"
            color="#ec4899"
            handles={handles}
        >
            <div className="node-field">
                <label className="node-label">Operation</label>
                <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className="node-select"
                >
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="trim">Trim Whitespace</option>
                    <option value="reverse">Reverse</option>
                    <option value="capitalize">Capitalize</option>
                </select>
            </div>
            <div className="node-description">
                Transform text data using various operations
            </div>
        </BaseNode>
    );
}
