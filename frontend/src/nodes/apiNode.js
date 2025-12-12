// apiNode.js - API integration node

import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
    const [method, setMethod] = useState(data?.method || 'GET');
    const [endpoint, setEndpoint] = useState(data?.endpoint || '');

    const handles = [
        { type: 'target', id: 'params', position: Position.Left, top: '33%' },
        { type: 'target', id: 'body', position: Position.Left, top: '66%' },
        { type: 'source', id: 'response', position: Position.Right }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="API Call"
            icon="🌐"
            color="#3b82f6"
            handles={handles}
        >
            <div className="node-field">
                <label className="node-label">Method</label>
                <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="node-select"
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
            <div className="node-field">
                <label className="node-label">Endpoint</label>
                <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    className="node-input"
                    placeholder="https://api.example.com/endpoint"
                />
            </div>
        </BaseNode>
    );
}
