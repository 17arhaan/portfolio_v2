const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const projects = [
  {
    name: 'jarvis',
    title: 'J.A.R.V.I.S',
    color: '#4F46E5',
    icon: '🤖',
    elements: [
      { type: 'circle', x: 200, y: 150, radius: 50, color: '#6366F1' },
      { type: 'circle', x: 600, y: 150, radius: 50, color: '#818CF8' },
      { type: 'line', x1: 200, y1: 300, x2: 600, y2: 300, color: '#6366F1' },
      { type: 'text', text: 'AI Assistant', x: 400, y: 400, color: '#818CF8' }
    ]
  },
  {
    name: 'wealth',
    title: 'W.E.A.L.T.H',
    color: '#10B981',
    icon: '💰',
    elements: [
      { type: 'rect', x: 150, y: 150, width: 500, height: 200, color: '#34D399' },
      { type: 'line', x1: 150, y1: 250, x2: 650, y2: 250, color: '#6EE7B7' },
      { type: 'line', x1: 150, y1: 350, x2: 650, y2: 350, color: '#6EE7B7' },
      { type: 'text', text: 'Finance Tracker', x: 400, y: 400, color: '#6EE7B7' }
    ]
  },
  {
    name: 'sentiment',
    title: 'Sentiment Analysis',
    color: '#F59E0B',
    icon: '📊',
    elements: [
      { type: 'bar', x: 200, y: 200, width: 60, height: 150, color: '#FBBF24' },
      { type: 'bar', x: 300, y: 200, width: 60, height: 100, color: '#FCD34D' },
      { type: 'bar', x: 400, y: 200, width: 60, height: 200, color: '#FBBF24' },
      { type: 'text', text: 'Data Analytics', x: 400, y: 400, color: '#FCD34D' }
    ]
  },
  {
    name: 'snakecv',
    title: 'SnakeCV',
    color: '#EF4444',
    icon: '🐍',
    elements: [
      { type: 'grid', x: 150, y: 150, size: 20, color: '#F87171' },
      { type: 'circle', x: 400, y: 300, radius: 10, color: '#F87171' },
      { type: 'circle', x: 420, y: 300, radius: 10, color: '#F87171' },
      { type: 'text', text: 'Computer Vision Game', x: 400, y: 400, color: '#F87171' }
    ]
  },
  {
    name: 'therapai',
    title: 'TherapAI',
    color: '#8B5CF6',
    icon: '🧠',
    elements: [
      { type: 'wave', x: 150, y: 200, width: 500, height: 100, color: '#A78BFA' },
      { type: 'wave', x: 150, y: 300, width: 500, height: 100, color: '#C4B5FD' },
      { type: 'circle', x: 400, y: 150, radius: 30, color: '#A78BFA' },
      { type: 'text', text: 'Mental Health AI', x: 400, y: 400, color: '#C4B5FD' }
    ]
  }
];

function drawWave(ctx, x, y, width, height, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i = 0; i <= width; i += 10) {
    ctx.lineTo(x + i, y + Math.sin(i / 20) * height);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawBar(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y - height, width, height);
}

function drawGrid(ctx, x, y, size, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.strokeRect(x + i * size, y + j * size, size, size);
    }
  }
}

function generateProjectImage(project) {
  try {
    const width = 800;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    // Grid Pattern
    ctx.fillStyle = '#2a2a2a';
    for (let i = 0; i <= width; i += 100) {
      ctx.fillRect(i, 0, 1, height);
    }
    for (let i = 0; i <= height; i += 100) {
      ctx.fillRect(0, i, width, 1);
    }

    // Draw project-specific elements
    project.elements.forEach(element => {
      switch (element.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
          ctx.fillStyle = element.color;
          ctx.fill();
          break;
        case 'rect':
          ctx.fillStyle = element.color;
          ctx.fillRect(element.x, element.y, element.width, element.height);
          break;
        case 'line':
          ctx.beginPath();
          ctx.moveTo(element.x1, element.y1);
          ctx.lineTo(element.x2, element.y2);
          ctx.strokeStyle = element.color;
          ctx.lineWidth = 2;
          ctx.stroke();
          break;
        case 'bar':
          drawBar(ctx, element.x, element.y, element.width, element.height, element.color);
          break;
        case 'grid':
          drawGrid(ctx, element.x, element.y, element.size, element.color);
          break;
        case 'wave':
          drawWave(ctx, element.x, element.y, element.width, element.height, element.color);
          break;
        case 'text':
          ctx.font = '24px Arial';
          ctx.fillStyle = element.color;
          ctx.textAlign = 'center';
          ctx.fillText(element.text, element.x, element.y);
          break;
      }
    });

    // Project Icon
    ctx.font = '120px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = project.color;
    ctx.fillText(project.icon, width / 2, height / 2 - 50);

    // Project Title
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(project.title, width / 2, height / 2 + 50);

    // Save the image
    const buffer = canvas.toBuffer('image/png');
    const outputPath = path.join(__dirname, `${project.name}.png`);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Successfully generated image for ${project.title} at ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error generating image for ${project.title}:`, error);
    return false;
  }
}

// Generate images for all projects
console.log('Starting image generation for all projects...');
let successCount = 0;

projects.forEach(project => {
  if (generateProjectImage(project)) {
    successCount++;
  }
});

console.log(`\nImage generation complete. Successfully generated ${successCount} out of ${projects.length} images.`); 