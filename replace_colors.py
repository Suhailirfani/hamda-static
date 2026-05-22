import os
import re

dir_path = r'd:\work\hamda_static'

replacements = [
    # CSS variable renames
    (r'premium-gold', r'theme-purple'),
    (r'gold-glow', r'purple-glow'),
    (r'gold-dark', r'purple-dark'),
    
    # Class name renames
    (r'text-gold', r'text-purple'),
    (r'btn-gold', r'btn-purple'),
    (r'btn-outline-gold', r'btn-outline-purple'),
    (r'border-gold', r'border-purple'),
    (r'shadow-gold', r'shadow-purple'),
    
    # Hex value replacements (Gold -> Purple)
    (r'(?i)#D4AF37', r'#6f42c1'),
    
    # CSS background and text variables for LIGHT mode
    (r'--bg-midnight:\s*#0B0406;', r'--bg-midnight: #FFFFFF;'),
    (r'--bg-card:\s*#16070B;', r'--bg-card: #F8F9FA;'),
    (r'--bg-card-hover:\s*#1E0C0F;', r'--bg-card-hover: #E9ECEF;'),
    (r'--bg-dark-accent:\s*#291016;', r'--bg-dark-accent: #DEE2E6;'),
    (r'--text-white:\s*#FFFFFF;', r'--text-white: #212529;'),
    (r'--text-light:\s*#F1F5F9;', r'--text-light: #495057;'),
    (r'--text-muted:\s*#94A3B8;', r'--text-muted: #6C757D;'),
    (r'--glass-bg:\s*rgba\(22, 7, 11, 0\.65\);', r'--glass-bg: rgba(255, 255, 255, 0.85);'),
    
    # Text classes in HTML that were for dark mode
    (r'text-slate-300', r'text-slate-700'),
    (r'text-slate-400', r'text-slate-600'),
    (r'text-white', r'text-dark'), # Change tailwind/bootstrap text-white to text-dark
    
    # Overlays in CSS for carousel and images
    (r'rgba\(11, 4, 6, 0\.3\)', r'rgba(255, 255, 255, 0.3)'),
    (r'rgba\(11, 4, 6, 0\.75\)', r'rgba(255, 255, 255, 0.75)'),
    (r'rgba\(11, 4, 6, 0\.95\)', r'rgba(255, 255, 255, 0.95)'),
    
    # CTA glossy bg
    (r'#090305', r'#F8F9FA'),
    (r'#16070B', r'#E9ECEF'),
    
    # Table background
    (r'rgba\(22, 7, 11, 0\.4\)', r'rgba(255, 255, 255, 0.6)'),
    
    # Contact inputs
    (r'rgba\(22, 7, 11, 0\.5\)', r'rgba(255, 255, 255, 0.8)'),
    (r'rgba\(22, 7, 11, 0\.8\)', r'rgba(255, 255, 255, 0.9)'),
]

for root, dirs, files in os.walk(dir_path):
    if '.git' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.css', '.js')):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements:
                new_content = re.sub(old, new, new_content)
                
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file_path}")
