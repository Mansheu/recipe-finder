from pathlib import Path

def replace(text, old, new, label):
    if old not in text:
        raise SystemExit(f"{label} block not found")
    return text.replace(old, new, 1)

path = Path('src/App.jsx')
text = path.read_text(encoding='utf-8')

diet_old = "const DietBtn = styled.button`\n  display:inline-flex;\n  align-items:center;\n  gap:8px;\n  padding:8px 14px;\n  border-radius:999px;\n  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'};\n  background: ${({ active }) => (active ? 'linear-gradient(90deg,var(--accent-2),var(--accent-3))' : 'transparent')};\n  color: ${({ active, theme }) => (active ? theme.palette.accentContrast : theme.palette.text)};\n  cursor:pointer;\n  font-weight:600;\n  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;\n\n  &:hover {\n    border-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'};\n    transform: translateY(-1px);\n  }\n\n  &:active {\n    transform: translateY(0);\n  }\n`;
"
diet_new = "const DietBtn = styled.button`\n  display:inline-flex;\n  align-items:center;\n  gap:8px;\n  padding:8px 14px;\n  border-radius:999px;\n  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'};\n  background: ${({ $active }) => ($active ? 'linear-gradient(90deg,var(--accent-2),var(--accent-3))' : 'transparent')};\n  color: ${({ $active, theme }) => ($active ? theme.palette.accentContrast : theme.palette.text)};\n  cursor:pointer;\n  font-weight:600;\n  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;\n\n  &:hover {\n    border-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'};\n    transform: translateY(-1px);\n  }\n\n  &:active {\n    transform: translateY(0);\n  }\n`;
"
text = replace(text, diet_old, diet_new, 'DietBtn')

ing_old = "const IngredientSpan = styled.span`\n  color: ${({ highlighted, theme }) =>\n    highlighted\n      ? (theme.mode === 'dark' ? 'var(--accent-2)' : theme.palette.accentDark)\n      : (theme.mode === 'dark' ? 'rgba(255,255,255,0.9)' : theme.palette.text)};\n  font-weight: ${({ highlighted }) => (highlighted ? 700 : 400)};\n`;
"
ing_new = "const IngredientSpan = styled.span`\n  color: ${({ $highlighted, theme }) =>\n    $highlighted\n      ? (theme.mode === 'dark' ? 'var(--accent-2)' : theme.palette.accentDark)\n      : (theme.mode === 'dark' ? 'rgba(255,255,255,0.9)' : theme.palette.text)};\n  font-weight: ${({ $highlighted }) => ($highlighted ? 700 : 400)};\n`;
"
text = replace(text, ing_old, ing_new, 'IngredientSpan')

header_old = "const HeaderIconBtn = styled.button`\n  display:inline-flex;\n  align-items:center;\n  justify-content:center;\n  padding: 4px 10px;\n  min-width: 36px;\n  border-radius:999px;\n  border: 1px solid ${({ variant, theme }) => (variant === 'primary' ? 'transparent' : theme.palette.btnSecondaryBorder)};\n  background: ${({ variant, theme }) => (variant === 'primary' ? `linear-gradient(135deg, ${theme.palette.accentMidLight}, ${theme.palette.accentMid})` : theme.palette.btnSecondaryBg)};\n  color: ${({ variant, theme }) => (variant === 'primary' ? theme.palette.accentContrast : theme.palette.btnSecondaryText)};\n  font-size: 0.72rem;\n  font-weight: 600;\n  cursor:pointer;\n  transition: transform 0.15s ease, border-color 0.2s ease, background 0.2s ease;\n  white-space: nowrap;\n\n  @media (max-width: 700px) {\n    width: 100%;\n  }\n\n  &:hover {\n    border-color: ${({ variant, theme }) => (variant === 'primary' ? 'transparent' : theme.mode === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.2)')};\n    transform: translateY(-1px);\n  }\n\n  &:active {\n    transform: translateY(0);\n  }\n\n  &:focus-visible {\n    outline: 2px solid var(--accent-1);\n    outline-offset: 2px;\n  }\n`;
"
header_new = "const HeaderIconBtn = styled.button`\n  display:inline-flex;\n  align-items:center;\n  justify-content:center;\n  padding: 4px 10px;\n  min-width: 36px;\n  border-radius:999px;\n  border: 1px solid ${({ $variant, theme }) => ($variant === 'primary' ? 'transparent' : theme.palette.btnSecondaryBorder)};\n  background: ${({ $variant, theme }) => ($variant === 'primary' ? `linear-gradient(135deg, ${theme.palette.accentMidLight}, ${theme.palette.accentMid})` : theme.palette.btnSecondaryBg)};\n  color: ${({ $variant, theme }) => ($variant === 'primary' ? theme.palette.accentContrast : theme.palette.btnSecondaryText)};\n  font-size: 0.72rem;\n  font-weight: 600;\n  cursor:pointer;\n  transition: transform 0.15s ease, border-color 0.2s ease, background 0.2s ease;\n  white-space: nowrap;\n\n  @media (max-width: 700px) {\n    width: 100%;\n  }\n\n  &:hover {\n    border-color: ${({ $variant, theme }) => ($variant === 'primary' ? 'transparent' : theme.mode === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.2)')};\n    transform: translateY(-1px);\n  }\n\n  &:active {\n    transform: translateY(0);\n  }\n\n  &:focus-visible {\n    outline: 2px solid var(--accent-1);\n    outline-offset: 2px;\n  }\n`;
"
text = replace(text, header_old, header_new, 'HeaderIconBtn')

path.write_text(text, encoding='utf-8')
