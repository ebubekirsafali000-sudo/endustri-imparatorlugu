# Endüstri İmparatorluğu v5 - Entegrasyon Rehberi

Bu rehber, v5 HTML oyununu modüler React/TypeScript yapısına nasıl entegre edeceğinizi açıklar.

## 📦 Eklenen Dosyalar

### 1. **CSS Stilleri** (`client/src/styles/game_v5.css`)
- 211 satır
- 8 bölge teması (Zone 1-8)
- Neon/glassmorphism tasarım
- Responsive layout
- Animasyonlar ve efektler

**Kullanım:**
```tsx
import '../styles/game_v5.css';
```

### 2. **Oyun Verileri** (`client/src/data/gameData_v5.ts`)
- 742 satır
- Zorluk seviyeleri (Kolay, Normal, Zor, Çılgın)
- 8 bölge bilgisi
- Bina verileri (Zone 1 örneği)
- Araştırma ağacı
- Başarılar
- Sözleşmeler ve keşifler

**Kullanım:**
```tsx
import { DIFFICULTIES, ZONE_INFO, ALL_BUILDINGS, RESEARCH_TREE } from '../data/gameData_v5';
```

### 3. **Ses Yönetimi** (`client/src/utils/audioManager_v5.ts`)
- 305 satır
- Bölgeye özel BGM (arka plan müziği)
- 10+ SFX efekti
- Ses seviyesi kontrolü
- AudioContext API

**Kullanım:**
```tsx
import { audioManager } from '../utils/audioManager_v5';

// Başlat
audioManager.init(gameState);
audioManager.startBGM(zone);

// SFX çal
audioManager.sfx.buy();
audioManager.sfx.levelUp();
```

### 4. **Parçacık Efektleri** (`client/src/utils/particleEngine_v5.ts`)
- 287 satır
- Canvas tabanlı neon efektler
- 8+ preset efekt
- Özelleştirilebilir burst sistemi

**Kullanım:**
```tsx
import { particleEngine } from '../utils/particleEngine_v5';

// Efektler
particleEngine.onBuy(x, y, color);
particleEngine.onAchievement(x, y);
particleEngine.onZoneUp(x, y);
```

### 5. **Oyun Mantığı** (`client/src/utils/gameLogic_v5.ts`)
- 288 satır
- Bina satın alma/satma
- Kaynak üretimi
- Araştırma sistemi
- Bölge ilerlemesi
- Prestige mekanizması
- Başarı sistemi

**Kullanım:**
```tsx
import {
  GameState,
  makeDefault,
  buyBuilding,
  calculateGameTick,
  unlockAchievements,
} from '../utils/gameLogic_v5';

// Oyun durumu oluştur
const gameState = makeDefault('normal');

// Bina satın al
buyBuilding(gameState, 'demir_ocagi');

// Oyun tick'i hesapla
calculateGameTick(gameState, 1);
```

## 🎮 React Bileşenine Entegrasyon

### Temel Yapı

```tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/game_v5.css';
import { GameState, makeDefault, calculateGameTick } from '../utils/gameLogic_v5';
import { audioManager } from '../utils/audioManager_v5';
import { particleEngine } from '../utils/particleEngine_v5';

export default function Game() {
  const sr = useRef<GameState>(makeDefault());
  const [tick, setTick] = useState(0);

  // Oyun döngüsü
  useEffect(() => {
    const interval = setInterval(() => {
      calculateGameTick(sr.current, 1);
      setTick(t => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Ses sistemi
  useEffect(() => {
    audioManager.init(sr.current);
    audioManager.startBGM(sr.current.zone);
  }, []);

  return (
    <div className={`game-container zone-${sr.current.zone}-theme`}>
      {/* UI */}
    </div>
  );
}
```

## 📊 Veri Yapısı

### GameState
```typescript
interface GameState {
  money: number;                    // Para
  level: number;                    // Seviye
  xp: number;                       // Deneyim
  zone: number;                     // Bölge (1-8)
  energy: number;                   // Enerji
  maxEnergy: number;                // Max enerji
  researchPoints: number;           // Araştırma puanları
  buildings: Record<string, number>;// Bina sayıları
  resources: Record<string, number>;// Kaynaklar
  researched: string[];             // Açılan araştırmalar
  achievements: string[];           // Açılan başarılar
  difficulty: string;               // Zorluk seviyesi
  // ... diğer ayarlar
}
```

## 🔧 Özelleştirme

### Yeni Bina Ekleme

```typescript
// gameData_v5.ts
export const ALL_BUILDINGS = [
  {
    id: 'yeni_bina',
    zone: 1,
    icon: '🏢',
    name: 'Yeni Bina',
    cost: 500,
    workers: 2,
    energyUse: 2,
    energyProd: 0,
    inputs: ['demir', 1],
    output: 'celik',
    rate: 0.5,
    desc: 'Açıklama',
    workerWage: 10,
  },
  // ... diğer binalar
];
```

### Yeni Araştırma Ekleme

```typescript
// gameData_v5.ts
export const RESEARCH_TREE = [
  {
    id: 'r_yeni',
    tier: 1,
    icon: '🔬',
    name: 'Yeni Araştırma',
    desc: 'Açıklama',
    cost: 1000,
    effect: 'prodMulti',
    value: 0.2,
    zone: 2,
  },
  // ... diğer araştırmalar
];
```

## 📈 Bölgeler

| Bölge | Ad | Çarpan | Tema |
|-------|-----|--------|------|
| 1 | Sanayi Çağı | 1x | Turkuaz |
| 2 | Ticaret Çağı | 2x | Yeşil |
| 3 | Uzay Çağı | 5x | Mor |
| 4 | Ay Kolonisi | 10x | Turuncu |
| 5 | Mars İmparatorluğu | 25x | Kırmızı |
| 6 | Yıldız Çağı | 100x | Altın |
| 7 | Tanrılık Çağı | 500x | Pembe |
| 8 | Paralel Evren | 2000x | Turkuaz |

## 🎵 Ses Sistemi

### BGM (Arka Plan Müziği)
- Her bölge için özel melodi
- Pentatonik/modal diziler
- Otomatik döngü

### SFX Efektleri
- `click` - Tıklama
- `buy` - Satın alma
- `buyMax` - Toplu satın alma
- `sell` - Satış
- `error` - Hata
- `levelUp` - Seviye atlaması
- `achievement` - Başarı
- `milestone` - Dönüm noktası
- `save` - Kayıt
- `zoneUp` - Bölge ilerlemesi
- `event` - Etkinlik

## 💾 Kayıt/Yükleme

```typescript
// localStorage'a kaydet
function doSave(state: GameState) {
  localStorage.setItem('gameState', JSON.stringify(state));
}

// localStorage'dan yükle
function doLoad(): GameState | null {
  const saved = localStorage.getItem('gameState');
  return saved ? JSON.parse(saved) : null;
}
```

## 🚀 Sonraki Adımlar

1. **Tüm Binalar:** Zone 2-8 binalarını gameData_v5.ts'ye ekle
2. **Araştırma Ağacı:** Tüm araştırmaları ekle
3. **Pazar Sistemi:** Dinamik fiyatlandırma ekle
4. **Sözleşmeler:** Sözleşme mekanizmasini geliştir
5. **Keşifler:** Keşif sistemi geliştir
6. **Prestige:** Prestige bonusları ekle
7. **Etkinlikler:** Rastgele etkinlikler ekle

## 📝 Notlar

- Tüm dosyalar TypeScript ile yazılmıştır
- CSS, 8 bölge teması destekler
- Ses sistemi browser autoplay policy'ye uyumludur
- Parçacık efektleri requestAnimationFrame kullanır
- Oyun durumu localStorage'a otomatik kaydedilir

## 🔗 Kaynaklar

- **HTML Backup:** `client/src/pages/Game_v5_backup.html`
- **Mevcut Oyun:** `client/src/pages/Game.tsx`
- **Tema Renkler:** `client/src/styles/game_v5.css` (CSS variables)

---

**Oluşturma Tarihi:** 19 Haziran 2026  
**Versiyon:** 5.0 (Modular)  
**Durum:** Entegrasyon Hazır ✅
