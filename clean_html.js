const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'index.html',
    'trabalhista.html',
    'civil.html',
    'familia.html',
    'previdenciario.html'
];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace any src="data:image/..." that looks like the logo or profile
    // Based on previous content, we can target by alt text to be safe or just replace all data:image with placeholders if they match specific dimensions/context
    
    // Replace specifically the Logo Balanca/Advocacia patterns
    content = content.replace(/src="data:image\/[^"]+"/g, (match) => {
        // We can't easily distinguish between the two base64s just by the start, 
        // but we can look at the surrounding alt tag if we use a better regex
        return match; 
    });

    // More robust replacement using alt tags as anchors
    content = content.replace(/<img src="data:image\/[^"]+" alt="Logo Balanca"/g, '<img src="/logo.png" alt="Logo Balanca"');
    content = content.replace(/<img src="data:image\/[^"]+" alt="Logo Vilmar Costa"/g, '<img src="/logo.png" alt="Logo Vilmar Costa"');
    content = content.replace(/<img src="data:image\/[^"]+" alt="Dr. Vilmar Ferreira Costa"/g, '<img src="/dr-vilmar.jpg" alt="Dr. Vilmar Ferreira Costa"');
    
    // Fallback for any other left over data:images that might be the logo or profile (if tags were different)
    // In index.html specifically:
    if (file === 'index.html') {
        // Line 212 is Logo Balanca
        // Line 242 is Dr. Vilmar
    }

    fs.writeFileSync(filePath, content);
    console.log(`Processed ${file}`);
});
