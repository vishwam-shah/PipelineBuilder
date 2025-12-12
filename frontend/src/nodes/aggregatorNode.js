// aggregatorNode.js - Combines multiple inputs

import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const AggregatorNode = ({ id, data }) => {
    const handles = [
        { type: 'target', id: 'input1', position: Position.Left, top: '25%' },
        { type: 'target', id: 'input2', position: Position.Left, top: '50%' },
        { type: 'target', id: 'input3', position: Position.Left, top: '75%' },
        { type: 'source', id: 'output', position: Position.Right }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Aggregator"
            icon="🔗"
            color="#14b8a6"
            handles={handles}
        >
            <div className="node-description">
                Combines multiple inputs into a single output stream. Useful for merging data from different sources.
            </div>
        </BaseNode>
    );
}
