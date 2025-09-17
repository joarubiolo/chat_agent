const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Cargar el workflow JSON
const workflowPath = path.join(__dirname, 'workflow.json');
const workflowData = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

app.use(express.json());

// Endpoint principal
app.get('/', (req, res) => {
  res.json({
    message: '✅ n8n Workflow Agent running on Render',
    status: 'active',
    workflowName: workflowData.name || 'Unnamed Workflow',
    workflowId: workflowData.id,
    totalNodes: workflowData.nodes ? workflowData.nodes.length : 0
  });
});

// Endpoint para ver el workflow
app.get('/workflow', (req, res) => {
  res.json(workflowData);
});

// Endpoint de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Si quieres ejecutar algún nodo específico
app.post('/execute', async (req, res) => {
  try {
    // Aquí iría la lógica para ejecutar partes del workflow
    res.json({ 
      message: 'Execution endpoint', 
      receivedData: req.body 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 n8n Agent running on port ${port}`);
  console.log(`📋 Workflow: ${workflowData.name}`);
});
