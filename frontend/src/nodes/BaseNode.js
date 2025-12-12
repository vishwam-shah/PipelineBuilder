// BaseNode.js
// Abstraction for creating nodes with consistent styling and behavior

import { Handle, Position } from '@xyflow/react';
import './NodeStyles.css';

export const BaseNode = ({
    id,
    data,
    title,
    icon,
    color = '#6366f1',
    handles = [],
    children,
    className = '',
    style = {}
}) => {
    return (
        <div
            className={`base-node ${className}`}
            style={{
                borderColor: color,
                ...style
            }}
        >
            {/* Render input handles - must be direct children */}
            {handles
                .filter(h => h.type === 'target')
                .map((handle, index) => {
                    const targetHandles = handles.filter(h => h.type === 'target');
                    return (
                        <Handle
                            key={`${id}-${handle.id}`}
                            type="target"
                            position={handle.position || Position.Left}
                            id={`${id}-${handle.id}`}
                            style={{
                                top: handle.top || `${((index + 1) * 100) / (targetHandles.length + 1)}%`,
                                background: color,
                                ...handle.style
                            }}
                            className="node-handle"
                        />
                    );
                })}

            {/* Render output handles - must be direct children */}
            {handles
                .filter(h => h.type === 'source')
                .map((handle, index) => {
                    const sourceHandles = handles.filter(h => h.type === 'source');
                    return (
                        <Handle
                            key={`${id}-${handle.id}`}
                            type="source"
                            position={handle.position || Position.Right}
                            id={`${id}-${handle.id}`}
                            style={{
                                top: handle.top || `${((index + 1) * 100) / (sourceHandles.length + 1)}%`,
                                background: color,
                                ...handle.style
                            }}
                            className="node-handle"
                        />
                    );
                })}

            {/* Node header */}
            <div className="node-header" style={{ background: color }}>
                {icon && <span className="node-icon">{icon}</span>}
                <span className="node-title">{title}</span>
            </div>

            {/* Node content */}
            <div className="node-content">
                {children}
            </div>
        </div>
    );
};
