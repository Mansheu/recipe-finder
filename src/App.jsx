import React, { useState, useEffect, useMemo } from 'react'; 
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { FaShoppingCart, FaListUl, FaSearch, FaRegStar, FaStar, FaClock, FaUser, FaUtensils, FaChevronDown, FaChevronUp, FaLeaf, FaSeedling, FaHeart, FaRegHeart } from 'react-icons/fa';
import { TbBreadOff, TbMilkOff } from 'react-icons/tb';
import recipes from './recipes.js';
import allIngredients from './ingredients.js';

/*
  Modern minimal restyle using the provided palette:
  #a1e8b2 #83be91 #669572 #4b6f54 #314b37 #19291D #09130c

  Notes:
  - Uses CSS variables for the palette so it's easy to tweak.
  - Cleaner spacing, subtle shadows, compact components.
  - Accessibility: larger hit targets, visible focus outlines.
*/

const palettes = {
  dark: {
    accentLight: '#a1e8b2',
    accentMidLight: '#83be91',
    accentMid: '#669572',
    accentDark: '#4b6f54',
    accentDarker: '#314b37',
    gradientTop: '#09130c',
    gradientBottom: '#19291D',
    text: '#f6fff7',
    textMuted: 'rgba(255,255,255,0.7)',
    accentContrast: '#0f1f15',
    btnSecondaryText: 'rgba(255,255,255,0.92)',
    btnSecondaryBg: 'rgba(255,255,255,0.08)',
    btnSecondaryBorder: 'rgba(255,255,255,0.12)'
  },
  light: {
    accentLight: '#83be91',
    accentMidLight: '#a1e8b2',
    accentMid: '#669572',
    accentDark: '#4b6f54',
    accentDarker: '#314b37',
    gradientTop: '#f6fff8',
    gradientBottom: '#e4f3e8',
    text: '#1f2d23',
    textMuted: 'rgba(31,45,33,0.7)',
    accentContrast: '#0f1f15',
    btnSecondaryText: '#1f2d23',
    btnSecondaryBg: 'rgba(0,0,0,0.08)',
    btnSecondaryBorder: 'rgba(0,0,0,0.12)'
  }
};

/* Layout */
const AppShell = styled.div`
  --accent-1: ${({ theme }) => theme.palette.accentLight};
  --accent-2: ${({ theme }) => theme.palette.accentMidLight};
  --accent-3: ${({ theme }) => theme.palette.accentMid};
  --accent-4: ${({ theme }) => theme.palette.accentDark};
  --bg: ${({ theme }) => theme.palette.gradientBottom};
  --bg-2: ${({ theme }) => theme.palette.gradientTop};
  --card: ${({ theme }) => theme.palette.text};
  --muted: ${({ theme }) => theme.palette.accentDarker};

  min-height: 100vh;
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.palette.gradientTop} 0%, ${theme.palette.gradientBottom} 100%)`};
  display: flex;
  justify-content: center;
  padding: 48px 24px;
  font-family: Inter, system-ui, -Apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${({ theme }) => theme.palette.text};
  transition: background 0.3s ease, color 0.3s ease;
`;

const Content = styled.main`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;



const footerReveal = keyframes`
  0% { opacity: 0; transform: translateY(18px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Footer = styled.footer`
  padding: 24px 28px;
  border-radius: 16px;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
    : 'linear-gradient(160deg, rgba(0,0,0,0.05), rgba(0,0,0,0.01))'};
  color: ${({ theme }) => theme.mode === 'dark'
    ? 'rgba(255,255,255,0.86)'
    : 'rgba(31,45,33,0.86)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.mode === 'dark'
    ? '0 8px 28px rgba(9,13,9,0.45)'
    : '0 8px 28px rgba(28,48,32,0.16)'};
  animation: ${footerReveal} 0.8s ease-out;
`;

const FooterMessages = styled.div`
  position: relative;
  width: 100%;
  min-height: 32px;
`;

const FooterSentence = styled.p`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: ${({ $active }) => ($active ? 'translateY(0)' : 'translateY(12px)')};
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
`;

const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: var(--accent-2);
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  &:hover,
  &:focus-visible {
    color: var(--accent-2);
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PixelLink = styled(FooterLink)`
  font-family: 'Press Start 2P', 'Silkscreen', 'Lucida Console', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: none;
`;

const Heart = styled(FaHeart)`
  color: var(--accent-2);
  font-size: 1.05rem;
`;
const Header = styled.header`
  text-align: center;
  margin-bottom: 28px;
`;

const H1 = styled.h1`
  font-size: 2.2rem;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.palette.text};
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Sub = styled.p`
  margin: 0 auto;
  max-width: 780px;
  color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.86)' : 'rgba(31,45,33,0.8)'};
  font-size: 1rem;
  line-height: 1.45;
  opacity: 0.95;
`;

const Card = styled.section`
  background: ${({ theme }) => theme.mode === 'dark' ? 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' : 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))'};
  border-radius: 14px;
  box-shadow: ${({ theme }) => theme.mode === 'dark' ? '0 8px 30px rgba(7,10,7,0.45)' : '0 8px 30px rgba(20,35,24,0.12)'};
  padding: 20px;
  border: ${({ theme }) => theme.mode === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.08)'};
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
`;

/* Top bar inside the card */
const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
`;
const CardTopRight = styled.div`
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:12px;
  flex-wrap:wrap;
`;

const ThemeToggleButton = styled.button`
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:6px 14px;
  border-radius:999px;
  border:1px solid ${({ theme }) => theme.palette.btnSecondaryBorder};
  background: ${({ theme }) => theme.palette.btnSecondaryBg};
  color: ${({ theme }) => theme.palette.btnSecondaryText};
  font-size:0.8rem;
  font-weight:600;
  cursor:pointer;
  transition: transform 0.15s ease, border-color 0.2s ease, background 0.2s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.2)'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-2);
    outline-offset: 2px;
  }
`;


const CardTitle = styled.div`
  display:flex;
  align-items:center;
  gap:12px;
`;

const TitleBadge = styled.div`
  background: linear-gradient(135deg, var(--accent-2), var(--accent-3));
  width:44px;
  height:44px;
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  color: ${({ theme }) => theme.palette.accentContrast};
  box-shadow: 0 6px 18px rgba(46,64,43,0.18);
  font-size: 1.05rem;
`;

const TitleText = styled.div`
  display:flex;
  flex-direction:column;
`;

const TitleMain = styled.div`
  font-weight:700;
  color: var(--card);
  font-size:1.05rem;
`;

const TitleSub = styled.div`
  font-size:0.85rem;
  color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(31,45,33,0.75)'};
`;

/* Grid */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 20px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

/* Left - search */
const Section = styled.div`
  background: ${({ theme }) => theme.mode === 'dark' ? 'linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.01))' : 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))'};
  padding: 18px;
  border-radius: 12px;
  border: ${({ theme }) => theme.mode === 'dark' ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.08)'};
  transition: background 0.3s ease, border-color 0.3s ease;
`;

const SectionHeader = styled.div`
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:12px;
`;

const SectionH = styled.h3`
  margin:0;
  color: var(--card);
  font-size:1rem;
  font-weight:600;
`;

const SectionDesc = styled.p`
  margin:0 0 12px 0;
  color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(31,45,33,0.75)'};
  font-size:0.95rem;
`;

const SearchRow = styled.div`
  display:flex;
  gap:12px;
  align-items:center;
`;

// FIX: Improved search icon button placement
const InputWrap = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr auto;  /* input then button */
  align-items: center;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'};
  border-radius: 10px;
  padding: 8px 10px;
  border: ${({ theme }) => theme.mode === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.08)'};
  transition: box-shadow .16s ease, transform .06s ease, background 0.2s ease, border-color 0.2s ease;

  &:focus-within{
    box-shadow: ${({ theme }) => theme.mode === 'dark' ? '0 6px 18px rgba(99,160,112,0.12)' : '0 6px 18px rgba(15,31,21,0.1)'};
    transform: translateY(-1px);
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: var(--card);
  font-size: 0.98rem;
  padding: 6px 8px;
  ::placeholder{ color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(31,45,33,0.45)'}; font-style: italic; }
  width: 100%;
`;

const IconBtn = styled.button`
  background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
  border: none;
  color: ${({ theme }) => theme.palette.accentContrast};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:1rem;
  box-shadow: 0 6px 18px rgba(97,158,109,0.12);
  margin-left: 4px;
`;

const PopularWrap = styled.div`
  display:flex;
  gap:8px;
  margin-top:14px;
  flex-wrap:wrap;
`;

const Pill = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'};
  color: ${({ theme }) => theme.palette.text};
  padding: 8px 12px;
  border-radius: 999px;
  font-weight:600;
  font-size:0.95rem;
  cursor:pointer;
  transition: all .14s ease;

  &:hover{ background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(102,149,114,0.08)' : 'rgba(102,149,114,0.15)'}; transform: translateY(-2px); }
  &:disabled{ opacity:0.45; cursor:not-allowed; transform:none; }
`;


/* Right - selected ingredients */
const RightInner = styled.div`
  position:sticky;
  top:24px;
`;

const Chips = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
`;

const ChipRow = styled.div`
  display:flex;
  gap:8px;
  align-items:center;
`;

const ChipItem = styled.div`
  display:flex;
  align-items:center;
  gap:8px;
  padding:8px 10px;
  border-radius:10px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' : 'linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))'};
  border: ${({ theme }) => theme.mode === 'dark' ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.08)'};
  color: ${({ theme }) => theme.palette.text};
  flex:1;
`;


const Remove = styled.button`
  background: transparent;
  border: none;
  color: var(--accent-1);
  cursor: pointer;
  font-size: 1.05rem;
`;

const MustSelect = styled.select`
  width: 100%;
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.btnSecondaryBorder};
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255,255,255,0.92)'};
  color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.92)' : theme.palette.text};
  font-size: 0.9rem;
  cursor: pointer;
  appearance: none;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.18)'};
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.32)' : 'rgba(255,255,255,0.98)'};
  }

  &:focus-visible {
    outline: 2px solid var(--accent-2);
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(161,232,178,0.18);
  }

  option {
    background: ${({ theme }) => theme.mode === 'dark' ? 'var(--bg-2)' : '#ffffff'};
    color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.92)' : theme.palette.text};
  }
`;

/* Results */
const ResultsHeader = styled.div`
  margin-top:18px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
`;

const DietRow = styled.div`
  display:flex;
  gap:8px;
  flex-wrap:wrap;
`;

const DietBtn = styled.button`
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:8px 14px;
  border-radius:999px;
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'};
  background: ${({ active }) => (active ? 'linear-gradient(90deg,var(--accent-2),var(--accent-3))' : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.palette.accentContrast : theme.palette.text)};
  cursor:pointer;
  font-weight:600;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const RecipeList = styled.div`
  margin-top:16px;
  display:flex;
  flex-direction:column;
  gap:12px;
`;

const Recipe = styled.article`
  display:flex;
  gap:12px;
  align-items:flex-start;
  padding:12px;
  border-radius:10px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' : 'linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.015))'};
  border: ${({ theme }) => theme.mode === 'dark' ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.08)'};
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
`;

const Thumb = styled.img`
  width:140px;
  height:100px;
  object-fit:cover;
  border-radius:8px;
  flex-shrink:0;
`;

const RContent = styled.div`
  flex:1;
`;

const RecipeHeader = styled.div`
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:12px;
`;

const HeaderActions = styled.div`
  display:inline-flex;
  gap:6px;
`;

const HeaderIconBtn = styled.button`
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding: 4px 10px;
  min-width: 36px;
  border-radius:999px;
  border: 1px solid ${({ variant, theme }) => (variant === 'primary' ? 'transparent' : theme.palette.btnSecondaryBorder)};
  background: ${({ variant, theme }) => (variant === 'primary' ? `linear-gradient(135deg, ${theme.palette.accentMidLight}, ${theme.palette.accentMid})` : theme.palette.btnSecondaryBg)};
  color: ${({ variant, theme }) => (variant === 'primary' ? theme.palette.accentContrast : theme.palette.btnSecondaryText)};
  font-size: 0.72rem;
  font-weight: 600;
  cursor:pointer;
  transition: transform 0.15s ease, border-color 0.2s ease, background 0.2s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${({ variant, theme }) => (variant === 'primary' ? 'transparent' : theme.mode === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.2)')};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-1);
    outline-offset: 2px;
  }
`;

const FavoriteIconBtn = styled(HeaderIconBtn)`
  width: 32px;
  min-width: 32px;
  padding: 0;
`;

const RTitle = styled.h4`
  margin:0 0 6px 0;
  color: var(--card);
  font-size:1rem;
`;

const RMeta = styled.div`
  display:flex;
  gap:12px;
  align-items:center;
  color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(31,45,33,0.75)'};
  font-size:0.95rem;
`;

const IngredientSpan = styled.span`
  color: ${({ highlighted, theme }) =>
    highlighted
      ? (theme.mode === 'dark' ? 'var(--accent-2)' : theme.palette.accentDark)
      : (theme.mode === 'dark' ? 'rgba(255,255,255,0.9)' : theme.palette.text)};
  font-weight: ${({ highlighted }) => (highlighted ? 700 : 400)};
`;

const NoResults = styled.div`
  padding:22px;
  text-align:center;
  color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(31,45,33,0.75)'};
  border-radius:10px;
  border: ${({ theme }) => theme.mode === 'dark' ? '1px dashed rgba(255,255,255,0.03)' : '1px dashed rgba(0,0,0,0.12)'};
`;

const ErrorText = styled.div`
  margin-top: 8px;
  color: #ff8a80;
  font-size: 0.85rem;
  font-weight: 600;
`;

const MethodActions = styled.div`
  margin-top: 12px;
`;

const MethodButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, var(--accent-3), var(--accent-4));
  color: var(--card);
  font-weight: 600;
  font-size: 0.92rem;
  box-shadow: 0 8px 18px rgba(9, 19, 12, 0.35);
  transition: transform 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(9, 19, 12, 0.45);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 6px 16px rgba(9, 19, 12, 0.35);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-1);
    outline-offset: 2px;
  }
`;

const MethodPanel = styled.div`
  margin-top: 12px;
  padding: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,0.05)'};
  border: ${({ theme }) => theme.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0,0,0,0.1)'};
  color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.88)' : 'rgba(31,45,33,0.85)'};
  line-height: 1.55;
`;

const MethodList = styled.ol`
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 10px;
  color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.88)' : 'rgba(31,45,33,0.85)'};

  li {
    line-height: 1.5;
  }
`;

const MethodText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.88)' : 'rgba(31,45,33,0.85)'};
`;

const DietIconRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const DietIconWrap = styled.span`
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0,0,0,0.12)'};
  color: ${({ tone }) => tone || 'var(--accent-2)'};
  box-shadow: ${({ theme }) => theme.mode === 'dark' ? '0 2px 6px rgba(9, 19, 12, 0.28)' : '0 2px 6px rgba(15,31,21,0.12)'};
  border: ${({ theme }) => theme.mode === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.18)'};
  font-size: 1rem;

  /* Subtle visibility boost for icons in light mode */
  svg {
    filter: ${({ theme }) => theme.mode === 'dark' ? 'none' : 'contrast(1.15) saturate(1.1)'};
  }
`;



/* Small utilities */
const Small = styled.small`
  color: ${({ theme }) => theme.palette.textMuted};
`;

const diets = [
  { key: 'Vegetarian', label: 'Vegetarian', Icon: FaLeaf, color: 'var(--accent-2)' },
  { key: 'Vegan', label: 'Vegan', Icon: FaSeedling, color: 'var(--accent-1)' },
  { key: 'Dairy-free', label: 'Dairy-free', Icon: TbMilkOff, color: '#f4d6ff' },
  { key: 'Gluten-free', label: 'Gluten-free', Icon: TbBreadOff, color: '#f0d27a' },
];


const popularIngredients = ["Meat", "Vegetables", "Cheese"];

const dietIconMap = diets.reduce((acc, { key, label, Icon, color }) => {
  acc[key] = { Icon, color, label };
  return acc;
}, {});


// Title-case helper: capitalizes first letter of each word (handles spaces, hyphens, slashes)
const titleCase = (s) =>
  typeof s === 'string'
    ? s.toLowerCase().replace(/(^|[ \-/])([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase())
    : s;

export default function App() {
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('app-theme');
    return stored === 'light' ? 'light' : 'dark';
  });
  const activePalette = useMemo(() => palettes[themeMode], [themeMode]);
  const theme = useMemo(() => ({ palette: activePalette, mode: themeMode }), [activePalette, themeMode]);


  const footerMessages = useMemo(() => ([
    (
      <>
        Made with <Heart aria-hidden="true" /> love by{' '}
        <FooterLink
          href="https://github.com/Mansheu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mansheu
        </FooterLink>
      </>
    ),
    (
      <>
        Inspired by{' '}
        <PixelLink
          href="https://www.codedex.io/@mansheu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Codédex
        </PixelLink>{' '}
        and{' '}
        <FooterLink
          href="https://github.com/features/copilot"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Copilot
        </FooterLink>
      </>
    )
  ]), []);

  const footerMessageCount = footerMessages.length;

  const [activeFooterMessage, setActiveFooterMessage] = useState(0);

  useEffect(() => {
    if (footerMessageCount <= 1 || typeof window === 'undefined') return undefined;
    const timer = window.setTimeout(() => {
      setActiveFooterMessage(prev => (prev + 1) % footerMessageCount);
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [activeFooterMessage, footerMessageCount]);

  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [mustHave, setMustHave] = useState('');
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [ingredientError, setIngredientError] = useState('');
  const [openMethods, setOpenMethods] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    if (typeof window === 'undefined') return {};
    try {
      const stored = window.localStorage.getItem('recipe-favorites');
      return stored ? JSON.parse(stored) : {};
    } catch (err) {
      console.warn('Failed to read favorites from storage', err);
      return {};
    }
  });

  const toggleThemeMode = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Add ingredient
  const addIngredient = (rawIng) => {
    const ing = rawIng.trim();
    if (!ing) return;

    const match = allIngredients.find(item => item.toLowerCase() === ing.toLowerCase());
    if (!match) {
      setIngredientError('Ingredient not found.');
      return;
    }

    if (ingredients.some(i => i.toLowerCase() === match.toLowerCase())) {
      setIngredientError('');
      return;
    }

    setIngredients(prev => [...prev, match]);
    setIngredientInput('');
    setShowSuggestions(false);
    setIngredientError('');
  };

  const removeIngredient = (ing) => {
    setIngredients(prev => prev.filter(i => i !== ing));
    if (mustHave === ing) setMustHave('');
  };

  const toggleMethod = (id) => {
    setOpenMethods(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFavorite = (id) => {
    setFavoriteRecipes(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrintRecipe = () => {
    if (typeof window === 'undefined') return;
    window.print();
  };

  const handleEmailRecipe = (recipe) => {
    if (typeof window === 'undefined') return;
    const subject = encodeURIComponent(`Recipe: ${recipe.name}`);
    const ingredientsList = recipe.ingredients ? recipe.ingredients.join(', ') : 'Ingredients unavailable';
    const methodText = Array.isArray(recipe.method) ? recipe.method.join('\n') : (recipe.method || recipe.description || '');
    const body = encodeURIComponent(
      `Check out this recipe!\n\n${recipe.name}\n\nIngredients: ${ingredientsList}\n\nMethod:\n${methodText}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleShareRecipe = async (recipe) => {
    if (typeof window === 'undefined') return;
    const shareUrl = window.location.href;
    const shareText = recipe.description || 'Found this recipe and thought you might like it!';
    const shareData = {
      title: recipe.name,
      text: `${recipe.name} - ${shareText}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }

    const fallbackMessage = `${recipe.name}\n${shareUrl}`;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(fallbackMessage);
        alert('Recipe link copied to clipboard!');
        return;
      } catch (err) {
        console.warn('Clipboard write failed', err);
      }
    }

    alert(`Share this recipe:
${fallbackMessage}`);
  };

  // Filter recipes
  const filteredRecipes = recipes.filter(recipe => {
    if (ingredients.length < 2) return false;
    const recipeIngredientNames = recipe.ingredients.map(i => i.toLowerCase());
    if (mustHave && !recipeIngredientNames.includes(mustHave.toLowerCase())) return false;
    if (!ingredients.every(ing => recipeIngredientNames.includes(ing.toLowerCase()))) return false;
    if (selectedDiets.length && !selectedDiets.every(d => recipe.diets.includes(d))) return false;
    return true;
  });

  // suggestions
  const filteredSuggestions = ingredientInput
    ? allIngredients.filter(ing => ing.toLowerCase().includes(ingredientInput.trim().toLowerCase()) && !ingredients.some(i => i.toLowerCase() === ing.toLowerCase())).slice(0,8)
    : [];

  useEffect(() => {
    if (!showSuggestions) return;
    const onDoc = (e) => {
      if (!e.target.closest('.ingredient-area')) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [showSuggestions]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('recipe-favorites', JSON.stringify(favoriteRecipes));
    } catch (err) {
      console.warn('Failed to save favorites to storage', err);
    }
  }, [favoriteRecipes]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('app-theme', themeMode);
    } catch (err) {
      console.warn('Failed to persist theme mode', err);
    }
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <AppShell>
        <Content>
          <Header>
          <H1>Easy Recipes Finder</H1>
          <Sub>
            Enter the ingredients you have and discover recipes that help you use up leftovers, save money, and reduce food waste.
          </Sub>
        </Header>

        <Card>
          <CardTop>
            <CardTitle>
              <TitleBadge><FaShoppingCart /></TitleBadge>
              <TitleText>
                <TitleMain>Try our Recipe Finder</TitleMain>
                <TitleSub>Minimal &#8226; Fast &#8226; Practical</TitleSub>
              </TitleText>
            </CardTitle>
            <CardTopRight>
              <Small>We require at least <strong>3 ingredients</strong> for best matches.</Small>
              <ThemeToggleButton
                type="button"
                onClick={toggleThemeMode}
                aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} theme`}
              >
                {themeMode === 'dark' ? '☀️' : '🌙'}
              </ThemeToggleButton>
            </CardTopRight>
          </CardTop>

          <Grid>
            <div>
              <Section className="ingredient-area">
                <SectionHeader>
                  <SectionH><FaSearch />&nbsp; Tell us what you have</SectionH>
                </SectionHeader>
                <SectionDesc>Type an ingredient and pick the best match from the suggestions. Add at least 3 ingredients for the "must have" option.</SectionDesc>

                <SearchRow>
                  <InputWrap>
                    <Input
                      placeholder="Search ingredient"
                      value={ingredientInput}
                      onChange={e => { setIngredientInput(e.target.value); setShowSuggestions(true); if (ingredientError) setIngredientError(''); }}
                      onKeyDown={e => { if (e.key === 'Enter' && ingredientInput.trim()) addIngredient(ingredientInput.trim()); }}
                      onFocus={() => setShowSuggestions(true)}
                      aria-label="Ingredient search"
                    />
                    <IconBtn onClick={() => ingredientInput.trim() && addIngredient(ingredientInput.trim())} aria-label="Add ingredient">
                      <FaSearch />
                    </IconBtn>
                  </InputWrap>
                </SearchRow>

                {ingredientError && (
                  <ErrorText role="alert">{ingredientError}</ErrorText>
                )}

                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div style={{ marginTop: 10, borderRadius: 10, overflow: 'hidden', border: themeMode === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.12)' }}>
                    {filteredSuggestions.map(s => (
                      <div key={s} style={{ padding: 10, cursor: 'pointer' }} onClick={() => addIngredient(s)}>
                        {titleCase(s)}
                      </div>
                    ))}
                  </div>
                )}

                <PopularWrap>
                  {popularIngredients.map(p => (
                    <Pill key={p} onClick={() => addIngredient(p)} disabled={ingredients.some(i => i.toLowerCase() === p.toLowerCase())}>
                      + {titleCase(p)}
                    </Pill>
                  ))}
                </PopularWrap>

                <SectionDesc style={{ marginTop: 14 }}>
                  Enter <strong>{Math.max(0, 3 - ingredients.length)}</strong> more ingredient(s) to enable "must have" selection.
                </SectionDesc>

                <ResultsHeader>
                  <SectionH style={{ fontSize: '0.95rem' }}><FaListUl /> {filteredRecipes.length} recipes</SectionH>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Small><FaClock /> quick filters</Small>
                  </div>
                </ResultsHeader>

                {ingredients.length >= 2 && (
                  <div>
                    <DietRow style={{ marginTop: 12 }}>
                      {diets.map(d => {
                        const isActive = selectedDiets.includes(d.key);
                        const IconComp = d.Icon;
                        return (
                          <DietBtn
                            key={d.key}
                            active={isActive}
                            onClick={() =>
                              setSelectedDiets(prev =>
                                prev.includes(d.key)
                                  ? prev.filter(x => x !== d.key)
                                  : [...prev, d.key]
                              )
                            }
                          >
                            <IconComp
                              aria-hidden="true"
                              size="1rem"
                              color={isActive ? activePalette.accentContrast : d.color}
                            />
                            {d.label}
                          </DietBtn>
                        );
                      })}
                    </DietRow>

                    <RecipeList>
                      {filteredRecipes.length === 0 ? (
                        <NoResults>No recipes found for your current selection.</NoResults>
                      ) : (
                        filteredRecipes.map(r => {
                          const methodSteps = Array.isArray(r.method) && r.method.length
                            ? r.method
                            : r.method
                              ? [r.method]
                              : r.description
                                ? [r.description]
                                : ['Method coming soon.'];
                          const isMethodOpen = !!openMethods[r.id];
                          const methodId = `method-${r.id}`;

                          return (
                            <Recipe key={r.id}>
                              <Thumb src={r.image} alt={r.name} />
                              <RContent>
                                <RecipeHeader>
                                  <RTitle>{r.name}</RTitle>
                                                                                                                              <HeaderActions>
                                    <FavoriteIconBtn
                                      type="button"
                                      variant={favoriteRecipes[r.id] ? 'primary' : 'secondary'}
                                      onClick={() => toggleFavorite(r.id)}
                                      aria-pressed={!!favoriteRecipes[r.id]}
                                      aria-label={favoriteRecipes[r.id] ? `Remove ${r.name} from favorites` : `Add ${r.name} to favorites`}
                                      title={favoriteRecipes[r.id] ? 'Remove from favorites' : 'Add to favorites'}
                                    >
                                      {favoriteRecipes[r.id] ? <FaHeart /> : <FaRegHeart />}
                                    </FavoriteIconBtn>
                                    <HeaderIconBtn
                                      type="button"
                                      variant="secondary"
                                      onClick={() => handlePrintRecipe(r)}
                                      aria-label={`Print ${r.name}`}
                                      title="Print recipe"
                                    >
                                      Print
                                    </HeaderIconBtn>
                                    <HeaderIconBtn
                                      type="button"
                                      variant="secondary"
                                      onClick={() => handleEmailRecipe(r)}
                                      aria-label={`Email ${r.name}`}
                                      title="Email recipe"
                                    >
                                      Email
                                    </HeaderIconBtn>
                                    <HeaderIconBtn
                                      type="button"
                                      variant="secondary"
                                      onClick={() => handleShareRecipe(r)}
                                      aria-label={`Share ${r.name}`}
                                      title="Share recipe"
                                    >
                                      Share
                                    </HeaderIconBtn>
                                  </HeaderActions>
                                </RecipeHeader>
                                <div style={{ marginBottom: 8 }}>
                                  <strong style={{ color: themeMode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(31,45,33,0.85)' }}>Ingredients:</strong>&nbsp;
                                  {r.ingredients.map((ing, i) => (
                                    <IngredientSpan
                                      key={ing + i}
                                      highlighted={ingredients.some(x => x.toLowerCase() === ing.toLowerCase())}
                                    >
                                      {titleCase(ing)}{i < r.ingredients.length - 1 ? ', ' : ''}
                                    </IngredientSpan>
                                  ))}
                                </div>
                                <RMeta>
                                  <span style={{ display:'flex', alignItems:'center', gap:6 }}><FaClock />{r.time}</span>
                                  <span style={{ display:'flex', alignItems:'center', gap:6 }}><FaUser />{r.servings}</span>
                                  {r.diets && r.diets.length > 0 && (
                                    <DietIconRow>
                                      {r.diets.map(d => {
                                        const entry = dietIconMap[d];
                                        if (!entry) return null;
                                        const IconComp = entry.Icon;
                                        return (
                                          <DietIconWrap
                                            key={d}
                                            tone={entry.color}
                                            title={entry.label}
                                            aria-label={`${entry.label} recipe`}
                                          >
                                            <IconComp color={entry.color} size="1rem" />
                                          </DietIconWrap>
                                        );
                                      })}
                                    </DietIconRow>
                                  )}
                                </RMeta>
                                <MethodActions>
                                  <MethodButton
                                    type="button"
                                    onClick={() => toggleMethod(r.id)}
                                    aria-expanded={isMethodOpen}
                                    aria-controls={methodId}
                                  >
                                    <FaUtensils />
                                    {isMethodOpen ? 'Hide method' : 'Method'}
                                    {isMethodOpen ? <FaChevronUp /> : <FaChevronDown />}
                                  </MethodButton>
                                </MethodActions>
                                {isMethodOpen && (
                                  <MethodPanel id={methodId}>
                                    {methodSteps.length > 1 ? (
                                      <MethodList>
                                        {methodSteps.map((step, idx) => (
                                          <li key={idx}>{step}</li>
                                        ))}
                                      </MethodList>
                                    ) : (
                                      <MethodText>{methodSteps[0]}</MethodText>
                                    )}

                                  </MethodPanel>
                                )}
                              </RContent>
                            </Recipe>
                          );
                        })
                      )}
                    </RecipeList>
                  </div>
                )}

              </Section>
            </div>

            <RightInner>
              <Section>
                <SectionHeader>
                  <SectionH><FaListUl /> Your ingredients</SectionH>
                </SectionHeader>

                {ingredients.length === 0 ? (
                  <NoResults>No ingredients added.</NoResults>
                ) : (
                  <Chips>
                    {ingredients.map(ing => (
                      <ChipRow key={ing}>
                        <ChipItem>
                          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                            {mustHave === ing ? <FaStar style={{ color: 'var(--accent-2)' }} /> : <FaRegStar />}
                            <div style={{ fontWeight:600 }}>{titleCase(ing)}</div>
                          </div>
                        </ChipItem>
                        <Remove onClick={() => removeIngredient(ing)} aria-label={`Remove ${ing}`}>&times;</Remove>
                      </ChipRow>
                    ))}

                    <div style={{ display:'flex', gap:8, marginTop:8 }}>
                      <Pill onClick={() => { setIngredients([]); setMustHave(''); }}>Clear all</Pill>
                      <Pill onClick={() => alert('Copy to clipboard not implemented in demo')}>Copy</Pill>
                    </div>

                    {ingredients.length >= 3 && (
                      <div>
                        <Small style={{ display:'block', marginTop:12 }}>Select a "must have" ingredient (optional)</Small>
                        <MustSelect value={mustHave} onChange={e => setMustHave(e.target.value)}>
                          <option value="">(none)</option>
                          {ingredients.map(i => <option key={i} value={i}>{titleCase(i)}</option>)}
                        </MustSelect>
                      </div>
                    )}
                  </Chips>
                )}

              </Section>
            </RightInner>

          </Grid>
        </Card>


        <Footer>
          <FooterMessages>
            {footerMessages.map((message, index) => (
              <FooterSentence
                key={index}
                $active={index === activeFooterMessage}
                aria-hidden={index !== activeFooterMessage}
              >
                {message}
              </FooterSentence>
            ))}
          </FooterMessages>
        </Footer>
        </Content>
      </AppShell>
    </ThemeProvider>
  );
}






