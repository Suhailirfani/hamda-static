import os
import re

dir_path = r'd:\work\hamda_static'

for root, dirs, files in os.walk(dir_path):
    if '.git' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix tailwind config
            new_content = re.sub(r'gold:\s*\'#6f42c1\',', r"purple: '#6f42c1',", content)
            new_content = re.sub(r'gold:\s*\'#D4AF37\',', r"purple: '#6f42c1',", new_content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file_path}")
