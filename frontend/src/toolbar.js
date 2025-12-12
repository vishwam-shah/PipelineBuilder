// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
            <h1 style={{
                color: 'white',
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '8px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                VectorShift Pipeline Builder
            </h1>
            <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px',
                marginBottom: '20px'
            }}>
                Drag and drop nodes to create your pipeline
            </p>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='aggregator' label='Aggregator' />
                <DraggableNode type='conditional' label='Conditional' />
                <DraggableNode type='api' label='API Call' />
            </div>
        </div>
    );
};
