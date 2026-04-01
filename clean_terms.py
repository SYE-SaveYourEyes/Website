from pathlib import Path
import re
text = Path('/tmp/sye_terms.md').read_text('utf-8', errors='replace')
text = re.sub(r'<bdt[^>]*>', '', text)
text = re.sub(r'<h[1-6][^>]*>', '\n\n', text)
text = re.sub(r'</h[1-6]>', '\n', text)
text = re.sub(r'<(?:p|div|section|article)[^>]*>', '\n', text)
text = re.sub(r'</(?:p|div|section|article|span|strong|em|u|a|b|i|style)[^>]*>', '', text)
text = re.sub(r'<li[^>]*>', '\n- ', text)
text = re.sub(r'</li>', '', text)
text = re.sub(r'<br\s*/?>', '\n', text)
text = re.sub(r'<[^>]+>', '', text)
text = re.sub(r'\r', '', text)
text = re.sub(r'\n[ \t]+', '\n', text)
text = re.sub(r'\n{3,}', '\n\n', text)
text = re.sub(r'[ \t]{2,}', ' ', text)
lines = text.strip().splitlines()
if lines and 'This Terms of Service was generated and customized using Termly’s Terms and Conditions Generator.' in lines[-1]:
    lines = lines[:-1]
clean = '\n'.join(lines).strip()
Path('/tmp/clean_terms_final.txt').write_text(clean, encoding='utf-8')
print(len(lines))
print(repr(lines[-1]))
