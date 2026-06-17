# Endüstri İmparatorluğu v6 - Geliştirme Rehberi

Bu rehber, başka yapay zeka modellerinin oyunu geliştirmesine yardımcı olmak için hazırlanmıştır.

## 📁 Proje Yapısı

```
endustri_imparatorlugu_v6/
├── client/
│   ├── src/
│   │   ├── data/
│   │   │   └── gameData.ts          # Oyun verileri (binalar, araştırmalar, sözleşmeler)
│   │   ├── utils/
│   │   │   ├── gameState.ts         # Oyun durumu yönetimi ve kaydetme
│   │   │   ├── gameLogic.ts         # Oyun mekanikler ve hesaplamalar
│   │   │   └── formatters.ts        # Sayı ve oran formatlama
│   │   ├── pages/
│   │   │   └── Game.tsx             # Ana oyun bileşeni (React)
│   │   ├── styles/
│   │   │   └── game.css             # Oyun stilleri (CSS)
│   │   ├── App.tsx                  # Ana uygulama bileşeni
│   │   ├── main.tsx                 # React giriş noktası
│   │   └── index.css                # Global stiller
│   ├── index.html                   # HTML şablonu
│   └── public/                      # Statik dosyalar
├── package.json                     # Bağımlılıklar
└── vite.config.ts                   # Vite yapılandırması
```

## 🎮 Oyun Mekanikler

### 1. **Binalar (Buildings)**
- **Dosya:** `client/src/data/gameData.ts` → `ALL_BUILDINGS`
- **Yapı:** Her bina şu özelliklere sahiptir:
  ```typescript
  {
    id: string;              // Benzersiz kimlik
    name: string;            // Bina adı
    icon: string;            // Emoji ikonu
    desc: string;            // Açıklama
    zone: number;            // Hangi bölgede açılır (1-5)
    cost: number;            // Başlangıç maliyeti
    costInc: number;         // Her satın almada maliyet artışı (%)
    production: Record<string, number>; // Üretim oranları
    consumption: Record<string, number>; // Tüketim oranları
    energyProd: number;      // Enerji üretimi
    energyCons: number;      // Enerji tüketimi
    xpReward: number;        // Satın alındığında kazanılan XP
  }
  ```

### 2. **Araştırmalar (Research)**
- **Dosya:** `client/src/data/gameData.ts` → `RESEARCH_TREE`
- **Yapı:** Her araştırma şu özelliklere sahiptir:
  ```typescript
  {
    id: string;              // Benzersiz kimlik
    name: string;            // Araştırma adı
    desc: string;            // Açıklama
    cost: number;            // RP maliyeti
    zone: number;            // Hangi bölgede açılır
    prereqs: string[];       // Ön koşullar (diğer araştırmaların ID'leri)
    effect: (state) => void; // Araştırma tamamlandığında çalışan fonksiyon
  }
  ```

### 3. **Sözleşmeler (Contracts)**
- **Dosya:** `client/src/data/gameData.ts` → `CONTRACTS`
- **Yapı:** Her sözleşme şu özelliklere sahiptir:
  ```typescript
  {
    id: string;              // Benzersiz kimlik
    name: string;            // Sözleşme adı
    desc: string;            // Açıklama
    reward: number;          // Para ödülü
    zone: number;            // Hangi bölgede açılır
    requirement: (state) => boolean; // Tamamlanma koşulu
  }
  ```

### 4. **Keşifler (Expeditions)**
- **Dosya:** `client/src/data/gameData.ts` → `EXPEDITIONS`
- **Yapı:** Her keşif şu özelliklere sahiptir:
  ```typescript
  {
    id: string;              // Benzersiz kimlik
    name: string;            // Keşif adı
    desc: string;            // Açıklama
    zone: number;            // Hangi bölgede açılır
    rewards: Array<{
      probability: number;   // Olasılık (0-1)
      resources: Record<string, number>; // Kazanılan kaynaklar
      money: number;         // Kazanılan para
    }>;
  }
  ```

## 🔧 Oyun Durumu (GameState)

**Dosya:** `client/src/utils/gameState.ts`

### Temel Özellikler:
- `money` - Oyuncunun parası
- `resources` - Kaynaklar (demir, bakır, çimento vb.)
- `resRates` - Kaynak üretim oranları
- `energyProd` / `energyCons` - Enerji üretimi/tüketimi
- `xp` / `level` - Deneyim ve seviye
- `zone` - Mevcut bölge (1-5)
- `bldCounts` - Her bina kaç adet var
- `bldUnlocked` - Hangi binalar açılmış
- `bldUpgrades` - Bina yükseltme seviyeleri
- `theme` - Tema ('dark' veya 'light')
- `soundEnabled` - Ses açık mı

### Önemli Fonksiyonlar:
- `makeDefault(difficulty)` - Yeni oyun başlat
- `doSave(state)` - Oyunu kaydet (localStorage)
- `doLoad()` - Oyunu yükle
- `toggleTheme(state)` - Tema değiştir

## ⚙️ Oyun Mantığı (GameLogic)

**Dosya:** `client/src/utils/gameLogic.ts`

### Temel Fonksiyonlar:

#### `calculateGameTick(state, speed)`
Her 100ms'de çalışır. Oyun döngüsünün ana fonksiyonu.
- Üretim hesaplamaları
- Enerji kontrolü
- XP ve level hesaplamaları
- Bölge geçişi kontrolü

#### `buyBuilding(state, buildingId)`
Bina satın al. Maliyeti kontrol et ve sayısını artır.

#### `sellBuilding(state, buildingId)`
Bina sat. Paranın %50'sini geri ver.

#### `unlockResearch(state, researchId)`
Araştırma yap. RP maliyetini kontrol et ve efekt uygula.

#### `checkZoneAdvance(state)`
Seviye 8'e ulaşınca bölge geç. Yeni binalar ve araştırmalar açılır.

#### `doPrestige(state, makeDefault)`
Oyunu sıfırla ve bonus kazanç çarpanı al.

#### `completeContract(state, contractId)`
Sözleşmeyi tamamla ve ödülü al.

#### `completeExpedition(state, expeditionId)`
Keşif yap ve rastgele ödül kazanma.

#### `unlockAchievements(state)`
Başarıları kontrol et ve kilidi aç.

## 🎨 Kullanıcı Arayüzü (UI)

**Dosya:** `client/src/pages/Game.tsx`

### Sekmeler:
1. **Binalar** - Bina satın al, sat, yükselt
2. **Araştırma** - Araştırma ağacı
3. **Kaynaklar** - Kaynak üretim oranları
4. **Sözleşmeler** - Tamamlanabilir görevler
5. **Başarılar** - Kilit açılan başarılar
6. **Ayarlar** - Tema, ses, prestige, sıfırla

### Stil Sistemi:
**Dosya:** `client/src/styles/game.css`

Tüm stiller CSS'de tanımlanmıştır. Responsive tasarım mobil ve masaüstü için optimize edilmiştir.

## 🚀 Yeni Özellik Ekleme Rehberi

### Örnek 1: Yeni Bina Ekle

1. **Dosya aç:** `client/src/data/gameData.ts`
2. **ALL_BUILDINGS dizisine ekle:**
```typescript
{
  id: 'yeni_bina',
  name: 'Yeni Bina',
  icon: '🏢',
  desc: 'Yeni bina açıklaması',
  zone: 1,
  cost: 1000,
  costInc: 1.15,
  production: { 'demir': 10 },
  consumption: { 'enerji': 5 },
  energyProd: 0,
  energyCons: 0,
  xpReward: 50,
}
```
3. **Oyun otomatik olarak bina gösterecektir!**

### Örnek 2: Yeni Araştırma Ekle

1. **Dosya aç:** `client/src/data/gameData.ts`
2. **RESEARCH_TREE dizisine ekle:**
```typescript
{
  id: 'yeni_arastirma',
  name: 'Yeni Araştırma',
  desc: 'Araştırma açıklaması',
  cost: 500,
  zone: 2,
  prereqs: ['eski_arastirma'],
  effect: (state) => {
    // Araştırma tamamlandığında çalışacak kod
    state.money += 1000;
  },
}
```

### Örnek 3: Yeni Mekanik Ekle

1. **Dosya aç:** `client/src/utils/gameLogic.ts`
2. **Yeni fonksiyon ekle:**
```typescript
export function yeniMekanik(state: GameState): void {
  // Mekanik kodunuz burada
}
```
3. **Game.tsx'te çağır:**
```typescript
useEffect(() => {
  yeniMekanik(sr.current);
}, []);
```

## 📝 Kaydetme Sistemi

Oyun otomatik olarak her 30 saniyede kaydedilir. `localStorage` kullanılır.

- **Kaydetme:** `doSave(state)` fonksiyonu
- **Yükleme:** `doLoad()` fonksiyonu
- **Anahtar:** `'endInc_v6'`

## 🎯 Başka Yapay Zekalara Geçiş

Oyunu başka yapay zekalara geliştirtirken:

1. **Dosyayı belirt:** Hangi dosyayı değiştirmek istediğini söyle
2. **Değişikliği açıkla:** Ne yapmak istediğini açıkla
3. **Kod yapısını koru:** Var olan fonksiyon yapısını değiştirme
4. **Test et:** Değişiklikten sonra oyunu test et

## 🐛 Sık Yapılan Hatalar

1. **GameState'i doğrudan değiştir:** Değişiklikten sonra `doSave()` çağır
2. **Yeni özellik ekle:** Önce `GameState` arayüzüne ekle
3. **Stil değiştir:** CSS dosyasında responsive tasarımı koru
4. **Fonksiyon adı:** Var olan fonksiyon adlarını değiştirme

## 📞 Yardım

- **Oyun verileri:** `gameData.ts` dosyasına bak
- **Oyun mantığı:** `gameLogic.ts` dosyasına bak
- **UI:** `Game.tsx` dosyasına bak
- **Stiller:** `game.css` dosyasına bak

---

**Başarılar! Oyunu geliştirmeye devam et!** 🚀
