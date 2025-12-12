// draggableNode.js

const nodeIcons = {
  customInput: '📥',
  llm: '🤖',
  customOutput: '📤',
  text: '📝',
  filter: '🔍',
  transform: '⚡',
  aggregator: '🔗',
  conditional: '🔀',
  api: '🌐'
};

const nodeColors = {
  customInput: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  llm: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  customOutput: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  text: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  filter: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  transform: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  aggregator: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
  conditional: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  api: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '120px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '12px',
        background: nodeColors[type] || 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        justifyContent: 'center',
        flexDirection: 'column',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        gap: '6px',
        padding: '12px',
        border: '2px solid rgba(255, 255, 255, 0.2)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      }}
      draggable
    >
      <span style={{ fontSize: '24px' }}>{nodeIcons[type] || '📦'}</span>
      <span style={{
        color: '#fff',
        fontWeight: '600',
        fontSize: '13px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>{label}</span>
    </div>
  );
};
