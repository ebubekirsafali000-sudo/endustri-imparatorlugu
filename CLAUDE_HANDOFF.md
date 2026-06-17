# 🤖 Claude / Başka Yapay Zeka için Geçiş Rehberi

Merhaba! Bu oyun şimdi sana geliştirmesi için hazır. Bu rehber, oyunu nasıl geliştireceğini gösterir.

## 🎯 Hızlı Başlangıç

### 1. Proje Yapısını Anla
```
endustri_imparatorlugu_v6/
├── client/src/
│   ├── data/gameData.ts         ← Oyun verileri (binalar, araştırmalar, etkinlikler)
│   ├── utils/
│   │   ├── gameState.ts         ← Oyun durumu ve kaydetme
│   │   ├── gameLogic.ts         ← Oyun mekanikler
│   │   └── formatters.ts        ← Sayı formatlama
│   ├── pages/Game.tsx           ← UI bileşeni
│   └── styles/game.css          ← Stiller
├── DEVELOPMENT_GUIDE.md         ← Detaylı rehber
└── AI_QUICK_START.md            ← Hızlı referans
```

### 2. Değişiklik Yap
Örnek: Yeni bina ekle
```typescript
// Dosya: client/src/data/gameData.ts
// ZONE_6_BUILDINGS dizisine ekle:
{
  id: 'yeni_bina',
  zone: 6,
  icon: '🎯',
  name: 'Yeni Bina',
  cost: 1000000,
  workers: 100,
  energyUse: 1000,
  energyProd: 0,
  inputs: [],
  output: 'TL',
  rate: 50000,
  desc: 'Yeni bina açıklaması',
  workerWage: 10000,
}
```

### 3. Test Et
```bash
cd endustri_imparatorlugu_v6
pnpm build
# Tarayıcıda aç ve test et
```

## 📋 Yapılacaklar (TODO)

### ✅ Tamamlanan
- [x] Temel oyun mekanikler
- [x] 5 bölge + binalar
- [x] Araştırma sistemi
- [x] Prestige sistemi
- [x] Sözleşmeler ve keşifler
- [x] Başarılar sistemi
- [x] Tema ve ses ayarları
- [x] Mobil optimizasyon
- [x] Leaderboard sistemi
- [x] Özel etkinlikler (random bonuslar)

### 🔄 Yapılabilecekler
- [ ] **Zone 6+ Binaları Ekle** - Dyson Küre, Madde Dönüştürücü vb.
- [ ] **Pazar Mekanikler** - Kaynakları satıp fiyat dalgalanması
- [ ] **Ticaret Sistemi** - Oyuncular arası ticaret
- [ ] **Turnuvalar** - Haftasal/aylık yarışmalar
- [ ] **Sosyal Özellikler** - Gildeler, işbirliği
- [ ] **Mobil Uygulama** - React Native ile
- [ ] **Çok Oyunculu** - Sunucu entegrasyonu
- [ ] **Ses Efektleri** - Web Audio API
- [ ] **Animasyonlar** - Framer Motion
- [ ] **Özel Etkinlikler** - Sınırlı süreli görevler

## 🎮 Mevcut Mekanikler

### Binalar
- **Zone 1-5:** 14 bina (demir ocağı, enerji, finans vb.)
- **Zone 6-8:** 4 bina (Dyson Küre, Madde Dönüştürücü vb.)
- **Özellikler:** Üretim, tüketim, enerji, işçi ücreti

### Araştırmalar
- **Temel:** Üretim, enerji, otomasyon
- **Efekt:** Çarpan bonusları

### Prestige
- **Koşul:** Zone 2+ ve seviye 8+
- **Ödül:** Para çarpanı (zone - 1) * 10%

### Sözleşmeler
- **Sayı:** 4 sözleşme (Zone 1-2)
- **Ödül:** Para bonusu

### Keşifler
- **Sayı:** 4 keşif (Zone 1-2)
- **Ödül:** Şansa bağlı para

### Başarılar
- **Sayı:** 7 başarı
- **Ödül:** Para bonusu

### Özel Etkinlikler
- **2x Para:** %0.1 şans, 5 dakika
- **3x XP:** %0.1 şans, 5 dakika
- **2x Üretim:** %0.15 şans, 3 dakika

## 🔧 Sık Yapılan Görevler

### Yeni Bina Ekle
```typescript
// gameData.ts → ALL_BUILDINGS veya ZONE_6_BUILDINGS
{
  id: 'bina_id',
  zone: 1,
  icon: '🏢',
  name: 'Bina Adı',
  cost: 1000,
  workers: 5,
  energyUse: 10,
  energyProd: 0,
  inputs: [],
  output: 'TL',
  rate: 100,
  desc: 'Açıklama',
  workerWage: 50,
}
```

### Yeni Araştırma Ekle
```typescript
// gameData.ts → RESEARCH_TREE
{
  id: 'r_new',
  tier: 1,
  icon: '🔬',
  name: 'Araştırma Adı',
  desc: 'Açıklama',
  cost: 500,
  effect: 'prodMulti',  // Efekt tipi
  value: 0.2,           // Efekt değeri
  zone: 1,
  req: 'r_root',        // Ön koşul
}
```

### Yeni Başarı Ekle
```typescript
// gameData.ts → ACHIEVEMENTS
{
  id: 'a_new',
  name: 'Başarı Adı',
  desc: 'Açıklama',
  icon: '🏆',
  reward: 5000,
  condition: 'condition_name',
}
```

### Yeni Etkinlik Ekle
```typescript
// gameData.ts → SPECIAL_EVENTS
{
  id: 'event_new',
  name: '✨ Etkinlik Adı',
  bonus: { money: 2 },  // Çarpan
  duration: 300,        // Saniye
  chance: 0.01,         // Olasılık
}
```

### Tema Değiştir
```typescript
// Game.tsx → settings sekmesinde
// Tema butonuna tıkla, otomatik kaydedilir
```

### Ses Aç/Kapat
```typescript
// Game.tsx → settings sekmesinde
// Ses butonuna tıkla, otomatik kaydedilir
```

## 🐛 Önemli Kurallar

1. **GameState'i Doğrudan Değiştir**
   ```typescript
   state.money += 1000;
   doSave(state);  // ← Unutma!
   ```

2. **Yeni Özellik Eklemeden Önce Interface'e Ekle**
   ```typescript
   export interface GameState {
     // ... var olan
     yeniOzellik?: number;
   }
   ```

3. **Var Olan Fonksiyon Adlarını Değiştirme**
   - `calculateGameTick` - Oyun döngüsü
   - `buyBuilding` - Bina satın al
   - `unlockResearch` - Araştırma yap
   - `doPrestige` - Prestige yap

4. **CSS'de Responsive Tasarımı Koru**
   ```css
   @media (min-width: 768px) {
     .element {
       /* Masaüstü stilleri */
     }
   }
   ```

5. **Oyun Verilerini Kontrol Et**
   - Maliyet çok yüksek/düşük mü?
   - Ödüller dengeli mi?
   - Zorluk ayarları doğru mu?

## 📊 Oyun Dengesi

### Maliyet Artışı
- Bina maliyeti her satın almada %15 artar
- Zorluk: Easy ×0.5, Hard ×1.8, Insane ×3

### Üretim
- Zone 1: 1-2 birim/saniye
- Zone 2: 0.2-1 birim/saniye
- Zone 3+: 0.02-0.1 birim/saniye

### XP
- Bina satın alma: 50-150 XP
- Level başına: 100 XP
- Zorluk: Easy ×1.5, Hard ×0.8, Insane ×0.5

### Para
- Başlangıç: Easy 15000, Normal 3000, Hard 800, Insane 200
- Prestige: (Zone - 1) × 10% çarpan

## 🚀 Dağıtım

1. Değişiklik yap
2. `pnpm build` ile derle
3. Checkpoint oluştur
4. Publish butonuna tıkla

## 📞 Sorular?

- **Oyun verileri:** `gameData.ts` dosyasına bak
- **Oyun mantığı:** `gameLogic.ts` dosyasına bak
- **Detaylı rehber:** `DEVELOPMENT_GUIDE.md` dosyasına bak
- **Hızlı referans:** `AI_QUICK_START.md` dosyasına bak

---

**Mutlu geliştirmeler!** 🎮✨
