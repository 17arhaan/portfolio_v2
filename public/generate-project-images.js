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
      { type: 'circle', x: 400, y: 250, radius: 80, color: '#6366F1' },
      { type: 'circle', x: 400, y: 250, radius: 60, color: '#818CF8' },
      { type: 'circle', x: 400, y: 250, radius: 40, color: '#A5B4FC' },
      { type: 'text', text: 'AI Assistant', x: 400, y: 400, color: '#818CF8' }
    ]
  },
  {
    name: 'wealth',
    title: 'W.E.A.L.T.H',
    color: '#10B981',
    icon: '💰',
    elements: [
      { type: 'rect', x: 300, y: 250, width: 200, height: 40, color: '#34D399' },
      { type: 'rect', x: 300, y: 310, width: 150, height: 40, color: '#6EE7B7' },
      { type: 'rect', x: 300, y: 370, width: 100, height: 40, color: '#A7F3D0' },
      { type: 'text', text: 'Finance Tracker', x: 400, y: 450, color: '#6EE7B7' }
    ]
  },
  {
    name: 'sentiment',
    title: 'Sentiment Analysis',
    color: '#F59E0B',
    icon: '📊',
    elements: [
      { type: 'bar', x: 300, y: 350, width: 40, height: 200, color: '#FBBF24' },
      { type: 'bar', x: 400, y: 350, width: 40, height: 150, color: '#FCD34D' },
      { type: 'bar', x: 500, y: 350, width: 40, height: 250, color: '#FDE68A' },
      { type: 'text', text: 'Data Analytics', x: 400, y: 450, color: '#FCD34D' }
    ]
  },
  {
    name: 'snakecv',
    title: 'SnakeCV',
    color: '#EF4444',
    icon: '🐍',
    elements: [
      { type: 'grid', x: 250, y: 200, size: 30, color: '#F87171' },
      { type: 'circle', x: 400, y: 350, radius: 15, color: '#F87171' },
      { type: 'circle', x: 430, y: 350, radius: 15, color: '#F87171' },
      { type: 'circle', x: 460, y: 350, radius: 15, color: '#F87171' },
      { type: 'text', text: 'Computer Vision Game', x: 400, y: 450, color: '#F87171' }
    ]
  },
  {
    name: 'therapai',
    title: 'TherapAI',
    color: '#8B5CF6',
    icon: '🧠',
    elements: [
      { type: 'wave', x: 200, y: 250, width: 400, height: 40, color: '#A78BFA' },
      { type: 'wave', x: 200, y: 300, width: 400, height: 40, color: '#C4B5FD' },
      { type: 'circle', x: 400, y: 200, radius: 40, color: '#A78BFA' },
      { type: 'text', text: 'Mental Health AI', x: 400, y: 450, color: '#C4B5FD' }
    ]
  }
];

function drawWave(ctx, x, y, width, height, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i = 0; i <= width; i += 20) {
    ctx.lineTo(x + i, y + Math.sin(i / 30) * height);
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
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
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
    ctx.fillText(project.icon, width / 2, 150);

    // Project Title
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(project.title, width / 2, 500);

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