const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Importa tu workflow de n8n
const n8nWorkflow = require('./workflow.js');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'n8n Workflow Agent running on Render',
    status: 'active',
    workflow: n8nWorkflow.name || 'Unknown workflow'
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`🚀 Agent running on port ${port}`);
});
