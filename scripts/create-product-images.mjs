import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const images = [
  {
    filename: 'prod-0-1791487429247-7d7abddb3e541f76.webp',
    width: 600,
    height: 600,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFF8E7"/>
      <stop offset="100%" stop-color="#FFE082"/>
    </radialGradient>
    <linearGradient id="jarGlass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.7)"/>
      <stop offset="15%" stop-color="rgba(255,255,255,0.2)"/>
      <stop offset="50%" stop-color="transparent"/>
      <stop offset="85%" stop-color="rgba(255,255,255,0.2)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.6)"/>
    </linearGradient>
    <linearGradient id="caramel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C67D32"/>
      <stop offset="50%" stop-color="#A25718"/>
      <stop offset="100%" stop-color="#7B3C08"/>
    </linearGradient>
    <linearGradient id="lidGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E5C158"/>
      <stop offset="50%" stop-color="#FFF2A8"/>
      <stop offset="100%" stop-color="#C49B31"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="18" stdDeviation="15" flood-color="#4A2505" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="600" height="600" fill="url(#bg)"/>

  <!-- Pedestal shadow -->
  <ellipse cx="300" cy="505" rx="170" ry="24" fill="#6B3E0A" opacity="0.22" filter="blur(6px)"/>
  <ellipse cx="300" cy="495" rx="130" ry="14" fill="#3D1F02" opacity="0.3" filter="blur(3px)"/>

  <!-- Jar Group -->
  <g filter="url(#shadow)">
    <!-- Jar Body Back Fill Caramel -->
    <rect x="180" y="210" width="240" height="260" rx="42" fill="url(#caramel)"/>

    <!-- Lid -->
    <rect x="195" y="150" width="210" height="42" rx="10" fill="url(#lidGold)"/>
    <rect x="190" y="185" width="220" height="18" rx="6" fill="#A87F1E"/>
    <!-- Lid Ribs -->
    <line x1="220" y1="152" x2="220" y2="190" stroke="#FFF5B8" stroke-width="2" opacity="0.5"/>
    <line x1="260" y1="152" x2="260" y2="190" stroke="#FFF5B8" stroke-width="2" opacity="0.5"/>
    <line x1="300" y1="152" x2="300" y2="190" stroke="#FFF5B8" stroke-width="2" opacity="0.5"/>
    <line x1="340" y1="152" x2="340" y2="190" stroke="#FFF5B8" stroke-width="2" opacity="0.5"/>
    <line x1="380" y1="152" x2="380" y2="190" stroke="#FFF5B8" stroke-width="2" opacity="0.5"/>

    <!-- Jar Glass Shine overlay -->
    <rect x="180" y="210" width="240" height="260" rx="42" fill="url(#jarGlass)"/>

    <!-- Label -->
    <rect x="200" y="250" width="200" height="175" rx="14" fill="#FFFDF8" stroke="#E2C98B" stroke-width="2"/>
    <rect x="208" y="258" width="184" height="159" rx="10" fill="none" stroke="#EAD49E" stroke-width="1" stroke-dasharray="4 2"/>

    <!-- Label Content -->
    <circle cx="300" cy="285" r="14" fill="#FFC107"/>
    <text x="300" y="289" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="900" fill="#4B2A08" text-anchor="middle">★</text>
    <text x="300" y="322" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="#241405" text-anchor="middle" letter-spacing="-0.5">Hey! Mu</text>
    <text x="300" y="342" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#B36214" text-anchor="middle" letter-spacing="1">DOCE DE LEITE</text>
    <rect x="235" y="356" width="130" height="24" rx="12" fill="#E85D04"/>
    <text x="300" y="372" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF" text-anchor="middle">ZERO AÇÚCAR</text>
    <text x="300" y="396" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#665342" text-anchor="middle">Feito com Leite Fresco • 220g</text>

    <!-- Glass reflections left / right -->
    <path d="M 195 240 Q 195 380 205 440" stroke="rgba(255,255,255,0.7)" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M 210 250 Q 210 320 215 380" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-linecap="round" fill="none"/>
  </g>

  <!-- Tag badge -->
  <g transform="translate(420, 150) rotate(10)">
    <circle cx="28" cy="28" r="32" fill="#2E7D32" stroke="#FFFFFF" stroke-width="3" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"/>
    <text x="28" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">100%</text>
    <text x="28" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="800" fill="#A5D6A7" text-anchor="middle">NATURAL</text>
  </g>
</svg>`
  },
  {
    filename: 'prod-1-1791487449958-5a425616d53b9020.webp',
    width: 600,
    height: 600,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <radialGradient id="bg1" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#E8F5E9"/>
      <stop offset="100%" stop-color="#A5D6A7"/>
    </radialGradient>
    <linearGradient id="cartonFront" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FAF8F2"/>
      <stop offset="100%" stop-color="#EDE7DA"/>
    </linearGradient>
    <linearGradient id="cartonSide" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D7CEBF"/>
      <stop offset="100%" stop-color="#B8AB96"/>
    </linearGradient>
    <filter id="shadow1" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#14301C" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="600" height="600" fill="url(#bg1)"/>
  <ellipse cx="300" cy="510" rx="150" ry="22" fill="#1B4323" opacity="0.2" filter="blur(5px)"/>

  <g filter="url(#shadow1)">
    <!-- Gable Top -->
    <polygon points="210,180 300,120 390,180 300,195" fill="#E6DFCE"/>
    <polygon points="300,120 390,180 430,155 350,105" fill="#C5BCA8"/>
    <!-- Gable Cap ridge -->
    <polygon points="280,125 320,100 370,110 330,135" fill="#2E7D32"/>
    <circle cx="300" cy="165" r="15" fill="#43A047" stroke="#FFFFFF" stroke-width="3"/>

    <!-- Carton Body Front -->
    <polygon points="210,180 390,195 390,470 210,455" fill="url(#cartonFront)"/>
    <!-- Carton Body Side -->
    <polygon points="390,195 440,165 440,430 390,470" fill="url(#cartonSide)"/>

    <!-- Front Green Block -->
    <polygon points="220,230 380,242 380,390 220,380" fill="#1B5E20"/>

    <!-- Leaf icon -->
    <g transform="translate(300, 260) scale(0.9)">
      <circle cx="0" cy="0" r="18" fill="#81C784"/>
      <path d="M-8,8 C-8,-10 10,-10 10,-10 C10,8 -8,8 -8,8 Z" fill="#1B5E20"/>
    </g>

    <!-- Typography -->
    <text x="300" y="305" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">NAVEIA</text>
    <text x="300" y="325" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#C8E6C9" text-anchor="middle" letter-spacing="2">BEBIDA DE AVEIA</text>
    <text x="300" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">ORIGINAL 1L</text>
    <rect x="250" y="360" width="100" height="16" rx="8" fill="#FFEB3B"/>
    <text x="300" y="372" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="900" fill="#1B5E20" text-anchor="middle">SEM LACTOSE</text>

    <!-- Lower text -->
    <text x="300" y="425" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#3E4A3D" text-anchor="middle">100% Vegetal • Sem Glúten</text>
  </g>

  <!-- Organic Stamp -->
  <g transform="translate(420, 160) rotate(-8)">
    <circle cx="28" cy="28" r="32" fill="#1B5E20" stroke="#A5D6A7" stroke-width="3" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"/>
    <text x="28" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="900" fill="#FFEB3B" text-anchor="middle">PLANT</text>
    <text x="28" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle">BASED</text>
  </g>
</svg>`
  },
  {
    filename: 'prod-2-1791489729222-e1e477df9b7369a1.webp',
    width: 600,
    height: 600,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <radialGradient id="bg2" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFF3E0"/>
      <stop offset="100%" stop-color="#FFCC80"/>
    </radialGradient>
    <linearGradient id="pbColor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D7863A"/>
      <stop offset="40%" stop-color="#B86620"/>
      <stop offset="100%" stop-color="#8C460F"/>
    </linearGradient>
    <linearGradient id="jarGlass2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.7)"/>
      <stop offset="15%" stop-color="rgba(255,255,255,0.2)"/>
      <stop offset="50%" stop-color="transparent"/>
      <stop offset="85%" stop-color="rgba(255,255,255,0.2)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.6)"/>
    </linearGradient>
    <filter id="shadow2" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#4A2505" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="600" height="600" fill="url(#bg2)"/>
  <ellipse cx="300" cy="505" rx="160" ry="22" fill="#5D2E0B" opacity="0.22" filter="blur(5px)"/>

  <g filter="url(#shadow2)">
    <!-- Jar Fill -->
    <rect x="185" y="215" width="230" height="255" rx="36" fill="url(#pbColor)"/>

    <!-- Black Lid -->
    <rect x="200" y="155" width="200" height="42" rx="10" fill="#212121"/>
    <rect x="195" y="190" width="210" height="18" rx="6" fill="#141414"/>
    <line x1="225" y1="158" x2="225" y2="195" stroke="#424242" stroke-width="2"/>
    <line x1="265" y1="158" x2="265" y2="195" stroke="#424242" stroke-width="2"/>
    <line x1="300" y1="158" x2="300" y2="195" stroke="#424242" stroke-width="2"/>
    <line x1="335" y1="158" x2="335" y2="195" stroke="#424242" stroke-width="2"/>
    <line x1="375" y1="158" x2="375" y2="195" stroke="#424242" stroke-width="2"/>

    <!-- Glass gloss -->
    <rect x="185" y="215" width="230" height="255" rx="36" fill="url(#jarGlass2)"/>

    <!-- Label Craft -->
    <rect x="205" y="255" width="190" height="170" rx="12" fill="#FAF5E8" stroke="#D1B78B" stroke-width="2"/>

    <!-- Label Details -->
    <circle cx="300" cy="285" r="12" fill="#E65100"/>
    <text x="300" y="289" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">🥜</text>
    <text x="300" y="322" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="#3E2723" text-anchor="middle">TOCCA</text>
    <text x="300" y="342" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#C75B12" text-anchor="middle" letter-spacing="1">PASTA DE AMENDOIM</text>
    <rect x="235" y="354" width="130" height="22" rx="11" fill="#4E342E"/>
    <text x="300" y="369" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="800" fill="#FFE082" text-anchor="middle">INTEGRAL PURA</text>
    <text x="300" y="395" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#5D4037" text-anchor="middle">Zero Açúcar • 450g</text>

    <!-- Reflections -->
    <path d="M 200 245 Q 200 370 208 430" stroke="rgba(255,255,255,0.7)" stroke-width="5" stroke-linecap="round" fill="none"/>
  </g>

  <!-- Protein Badge -->
  <g transform="translate(420, 155) rotate(12)">
    <circle cx="28" cy="28" r="32" fill="#D84315" stroke="#FFFFFF" stroke-width="3" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"/>
    <text x="28" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle">+PROT</text>
    <text x="28" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="800" fill="#FFCCBC" text-anchor="middle">ENERGIA</text>
  </g>
</svg>`
  },
  {
    filename: 'prod-3-1791487489811-86dc0248b2ad0237.webp',
    width: 600,
    height: 600,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <radialGradient id="bg3" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFEBEE"/>
      <stop offset="100%" stop-color="#FFCDD2"/>
    </radialGradient>
    <filter id="shadow3" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#8A1C14" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="600" height="600" fill="url(#bg3)"/>
  <ellipse cx="300" cy="510" rx="160" ry="22" fill="#5C1008" opacity="0.2" filter="blur(5px)"/>

  <g filter="url(#shadow3)">
    <!-- Box Body -->
    <rect x="180" y="160" width="240" height="310" rx="20" fill="#D32F2F"/>
    <!-- Top flap crease -->
    <rect x="180" y="160" width="240" height="30" rx="10" fill="#B71C1C"/>

    <!-- Window peek of pasta -->
    <ellipse cx="300" cy="380" rx="75" ry="50" fill="#FFF9C4" stroke="#FFFFFF" stroke-width="4"/>
    <!-- Pasta illustrations inside window -->
    <g fill="#FBC02D" stroke="#F57F17" stroke-width="1.5">
      <path d="M 260 365 Q 285 360 300 375 Q 315 390 340 375" fill="none" stroke-width="4" stroke-linecap="round"/>
      <path d="M 255 385 Q 280 375 305 390 Q 325 405 345 385" fill="none" stroke-width="4" stroke-linecap="round"/>
      <path d="M 270 350 Q 295 345 315 360 Q 330 370 335 365" fill="none" stroke-width="4" stroke-linecap="round"/>
    </g>

    <!-- Italian ribbon -->
    <rect x="220" y="210" width="160" height="8" rx="2" fill="#FFFFFF"/>
    <rect x="220" y="210" width="53" height="8" fill="#388E3C"/>
    <rect x="327" y="210" width="53" height="8" fill="#D32F2F"/>

    <!-- Brand Header -->
    <text x="300" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="-1">Yok-k!</text>
    <text x="300" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#FFEBEE" text-anchor="middle" letter-spacing="2">MACARRÃO PREMIUM</text>

    <rect x="225" y="295" width="150" height="24" rx="12" fill="#FFFFFF"/>
    <text x="300" y="311" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="900" fill="#C62828" text-anchor="middle">SEM GLÚTEN</text>

    <text x="300" y="455" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#FFCDD2" text-anchor="middle">Farinha de Grão-de-Bico • 400g</text>
  </g>

  <!-- Gluten Free Seal -->
  <g transform="translate(420, 160) rotate(8)">
    <circle cx="28" cy="28" r="32" fill="#FFFFFF" stroke="#D32F2F" stroke-width="3" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"/>
    <text x="28" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="900" fill="#D32F2F" text-anchor="middle">ZERO</text>
    <text x="28" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="900" fill="#B71C1C" text-anchor="middle">GLÚTEN</text>
  </g>
</svg>`
  },
  {
    filename: 'prod-4-1791487499648-99ee1a843e164e7d.webp',
    width: 600,
    height: 600,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <radialGradient id="bg4" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#EFEBE9"/>
      <stop offset="100%" stop-color="#D7CCC8"/>
    </radialGradient>
    <linearGradient id="pouch" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3E2723"/>
      <stop offset="100%" stop-color="#1B0000"/>
    </linearGradient>
    <filter id="shadow4" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#2D150B" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="600" height="600" fill="url(#bg4)"/>
  <ellipse cx="300" cy="510" rx="160" ry="22" fill="#2C1205" opacity="0.25" filter="blur(5px)"/>

  <g filter="url(#shadow4)">
    <!-- Stand up Pouch contour -->
    <path d="M 210 170 Q 300 160 390 170 L 415 450 Q 300 480 185 450 Z" fill="url(#pouch)"/>
    <!-- Zip lock seal indentation -->
    <line x1="215" y1="200" x2="385" y2="200" stroke="#5D4037" stroke-width="3" stroke-dasharray="6 3"/>

    <!-- Matte Pouch Highlight -->
    <path d="M 225 210 Q 240 330 250 440" stroke="rgba(255,255,255,0.15)" stroke-width="12" stroke-linecap="round" fill="none"/>

    <!-- Fruit Illustration -->
    <g transform="translate(300, 375)">
      <!-- Strawberry with chocolate drip -->
      <path d="M -25,-10 C -40,-35 0,-45 0,-45 C 0,-45 40,-35 25,-10 C 15,15 0,35 0,35 C 0,35 -15,15 -25,-10 Z" fill="#E53935"/>
      <!-- Seeds -->
      <circle cx="-10" cy="-15" r="2" fill="#FFEB3B"/>
      <circle cx="10" cy="-15" r="2" fill="#FFEB3B"/>
      <circle cx="0" cy="5" r="2" fill="#FFEB3B"/>
      <!-- Chocolate Coating Bottom -->
      <path d="M -20,0 Q -10,-10 0,-2 Q 10,-10 20,0 C 15,20 0,35 0,35 C 0,35 -15,20 -20,0 Z" fill="#2E1508"/>
      <!-- Leaves -->
      <path d="M -15,-40 Q 0,-30 15,-40 Q 5,-48 0,-42 Q -5,-48 -15,-40 Z" fill="#43A047"/>
    </g>

    <!-- Typography -->
    <text x="300" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="#FFE0B2" text-anchor="middle">Fruit-Titus</text>
    <text x="300" y="278" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#FFAB91" text-anchor="middle" letter-spacing="1">FRUTAS COM CHOCOLATE</text>

    <rect x="230" y="290" width="140" height="24" rx="12" fill="#E65100"/>
    <text x="300" y="306" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">70% CACAU</text>

    <text x="300" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#D7CCC8" text-anchor="middle">Snack Saudável • 120g</text>
  </g>

  <!-- Vegan Seal -->
  <g transform="translate(420, 165) rotate(10)">
    <circle cx="28" cy="28" r="32" fill="#E65100" stroke="#FFE0B2" stroke-width="3" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"/>
    <text x="28" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle">VEGAN</text>
    <text x="28" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="900" fill="#FFE0B2" text-anchor="middle">70%</text>
  </g>
</svg>`
  },
  {
    filename: 'prod-5-1791490811727-a8f97bba15148e5b.webp',
    width: 1200,
    height: 675,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E2319"/>
      <stop offset="50%" stop-color="#143627"/>
      <stop offset="100%" stop-color="#091811"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFB300" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0E2319" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow5" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#bg5)"/>
  <rect width="1200" height="675" fill="url(#glow)"/>

  <!-- Geometric Decorative Lines -->
  <g stroke="#2E7D32" stroke-width="1.5" opacity="0.3">
    <circle cx="950" cy="340" r="260" fill="none"/>
    <circle cx="950" cy="340" r="180" fill="none" stroke-dasharray="6 4"/>
    <circle cx="950" cy="340" r="110" fill="none"/>
  </g>

  <!-- Left Content Box (Dark Frosted Glass with Tomati Orange Accent) -->
  <g transform="translate(80, 100)">
    <!-- Badge -->
    <rect x="0" y="0" width="220" height="34" rx="17" fill="#E65100"/>
    <text x="110" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">CURADORIA ESPECIAL</text>

    <!-- Main Title -->
    <text x="0" y="95" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" fill="#FFC93C">
      Momentos inesquecíveis!
    </text>

    <!-- Subtitle -->
    <text x="0" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" fill="#E8F5E9">
      Combine marcas saudáveis e snacks num só pedido em Curitiba.
    </text>

    <!-- Features -->
    <g transform="translate(0, 190)">
      <g transform="translate(0, 0)">
        <circle cx="16" cy="16" r="16" fill="#1B5E20"/>
        <text x="16" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#81C784" text-anchor="middle">✓</text>
        <text x="45" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">Marcas artesanais selecionadas</text>
      </g>
      <g transform="translate(0, 48)">
        <circle cx="16" cy="16" r="16" fill="#1B5E20"/>
        <text x="16" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#81C784" text-anchor="middle">✓</text>
        <text x="45" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">Entrega rápida na sua porta</text>
      </g>
      <g transform="translate(0, 96)">
        <circle cx="16" cy="16" r="16" fill="#1B5E20"/>
        <text x="16" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#81C784" text-anchor="middle">✓</text>
        <text x="45" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">Tudo no mesmo frete pelo Portal ou iFood</text>
      </g>
    </g>

    <!-- CTA Button Preview -->
    <g transform="translate(0, 360)">
      <rect x="0" y="0" width="220" height="54" rx="27" fill="#FFC93C" filter="drop-shadow(0 6px 16px rgba(255,201,60,0.3))"/>
      <text x="110" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="900" fill="#14201A" text-anchor="middle">Pedir na Tomati →</text>
    </g>
  </g>

  <!-- Right Visual Assortment (Food & Jars Mockup Group) -->
  <g transform="translate(860, 220)" filter="url(#shadow5)">
    <!-- Plate / Board -->
    <ellipse cx="90" cy="240" rx="210" ry="40" fill="#07130E" opacity="0.6"/>

    <!-- Jar 1 (Sweet) -->
    <g transform="translate(0, 60)">
      <rect x="0" y="30" width="90" height="110" rx="16" fill="#B36214"/>
      <rect x="10" y="10" width="70" height="25" rx="5" fill="#FFC107"/>
      <rect x="10" y="55" width="70" height="60" rx="6" fill="#FFFDF8"/>
      <text x="45" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="900" fill="#14201A" text-anchor="middle">Hey! Mu</text>
    </g>

    <!-- Carton (Milk) -->
    <g transform="translate(95, 0)">
      <rect x="0" y="20" width="75" height="150" rx="10" fill="#F5F0E6"/>
      <rect x="5" y="45" width="65" height="75" rx="5" fill="#1B5E20"/>
      <text x="37" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle">NAVEIA</text>
    </g>

    <!-- Jar 2 (Peanut Butter) -->
    <g transform="translate(165, 80)">
      <rect x="0" y="25" width="85" height="95" rx="14" fill="#8C460F"/>
      <rect x="8" y="10" width="70" height="20" rx="4" fill="#212121"/>
      <rect x="8" y="50" width="70" height="50" rx="5" fill="#FAF5E8"/>
      <text x="42" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="900" fill="#3E2723" text-anchor="middle">TOCCA</text>
    </g>
  </g>
</svg>`
  }
];

for (const img of images) {
  const tmpSvg = path.join('/tmp', `${path.basename(img.filename, '.webp')}.svg`);
  const outWebp = path.join(uploadsDir, img.filename);

  fs.writeFileSync(tmpSvg, img.svg, 'utf-8');
  console.log(`Generating ${img.filename}...`);
  try {
    execSync(`ffmpeg -y -i "${tmpSvg}" -vframes 1 "${outWebp}"`, { stdio: 'pipe' });
    console.log(`✅ Success: ${img.filename}`);
  } catch (err) {
    console.error(`❌ Error rendering ${img.filename}:`, err);
  }
}

console.log('Finished generating all 6 product & banner images.');
