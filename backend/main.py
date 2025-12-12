from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses DFS-based cycle detection with color marking.
    """
    if not nodes:
        return True
    
    # Build adjacency list
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)
    
    # Color states: 0 = white (unvisited), 1 = gray (visiting), 2 = black (visited)
    color = {node.id: 0 for node in nodes}
    
    def has_cycle(node_id: str) -> bool:
        """DFS helper to detect cycles"""
        color[node_id] = 1  # Mark as visiting (gray)
        
        for neighbor in graph.get(node_id, []):
            if neighbor not in color:
                continue
            if color[neighbor] == 1:  # Back edge found - cycle detected
                return True
            if color[neighbor] == 0 and has_cycle(neighbor):
                return True
        
        color[node_id] = 2  # Mark as visited (black)
        return False
    
    # Check all nodes for cycles
    for node in nodes:
        if color[node.id] == 0:
            if has_cycle(node.id):
                return False
    
    return True

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    """
    Parse the pipeline and return:
    - num_nodes: number of nodes in the pipeline
    - num_edges: number of edges in the pipeline
    - is_dag: whether the pipeline forms a valid DAG
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_status = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_status
    }
