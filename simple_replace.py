from pathlib import Path

path = Path('src/App.jsx')
text = path.read_text(encoding='utf-8')
text = text.replace('({ active })', '({ $active })')
text = text.replace('({ active, theme })', '({ $active, theme })')
text = text.replace('({ highlighted, theme })', '({ $highlighted, theme })')
text = text.replace('({ highlighted })', '({ $highlighted })')
text = text.replace('({ variant, theme })', '({ $variant, theme })')
text = text.replace('variant ===', '$variant ===')
path.write_text(text, encoding='utf-8')
