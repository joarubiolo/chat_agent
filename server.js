const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Cargar el workflow JSON
const workflowPath = path.join(__dirname, 'workflow.json');
const workflowData = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

// Middleware
app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos

// Endpoint para el chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Aquí procesarías el mensaje con tu workflow de n8n
    // Por ahora simulamos una respuesta
    const response = await processMessageWithWorkflow(message);
    
    res.json({ 
      success: true, 
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simulación de procesamiento con n8n
async function processMessageWithWorkflow(message) {
  // Esto es temporal - luego integrarás con n8n-core
  return `He recibido tu mensaje: "${message}". Mi workflow "${workflowData.name}" está listo para procesarlo.`;
}

// Servir el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 n8n Agent with chat running on port ${port}`);
});
