// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Create user-friendly alert message
            const message = `
Pipeline Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Number of Nodes: ${data.num_nodes}
🔗 Number of Edges: ${data.num_edges}
${data.is_dag ? '✅' : '❌'} Is Valid DAG: ${data.is_dag ? 'Yes' : 'No'}

${data.is_dag
                    ? '✓ Your pipeline forms a valid Directed Acyclic Graph!'
                    : '⚠ Warning: Your pipeline contains cycles or is not a valid DAG.'}
            `.trim();

            alert(message);
        } catch (error) {
            alert(`Error submitting pipeline:\n${error.message}\n\nMake sure the backend server is running on http://localhost:8000`);
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <button
                type="submit"
                onClick={handleSubmit}
                style={{
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'white',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
