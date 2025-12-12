// filterNode.js - Data filtering node

import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const [filterType, setFilterType] = useState(data?.filterType || 'contains');
    const [filterValue, setFilterValue] = useState(data?.filterValue || '');

    const handles = [
        { type: 'target', id: 'input', position: Position.Left },
        { type: 'source', id: 'output', position: Position.Right }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Filter"
            icon="🔍"
            color="#06b6d4"
            handles={handles}
        >
            <div className="node-field">
                <label className="node-label">Filter Type</label>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="node-select"
                >
                    <option value="contains">Contains</option>
                    <option value="equals">Equals</option>
                    <option value="startsWith">Starts With</option>
                    <option value="endsWith">Ends With</option>
                </select>
            </div>
            <div className="node-field">
                <label className="node-label">Filter Value</label>
                <input
                    type="text"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="node-input"
                    placeholder="Enter filter criteria"
                />
            </div>
        </BaseNode>
    );
}
