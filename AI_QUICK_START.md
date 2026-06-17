# 🤖 Yapay Zeka Hızlı Başlangıç Rehberi

Bu rehber, başka yapay zeka modellerinin oyunu hızlıca geliştirmesine yardımcı olur.

## ⚡ 30 Saniyede Başla

1. **Proje yapısını anla:**
   - `gameData.ts` = Oyun verileri (binalar, araştırmalar)
   - `gameLogic.ts` = Oyun mekanikler
   - `gameState.ts` = Oyun durumu ve kaydetme
   - `Game.tsx` = UI bileşeni

2. **Değişiklik yap:**
   - Hangi dosyayı değiştireceğini söyle
   - Değişikliği açıkla
   - Kod yapısını koru

3. **Test et:**
   - `pnpm build` ile derle
   - Tarayıcıda aç ve test et

## 📋 Sık Yapılan Görevler

### Yeni Bina Ekle
```
Dosya: client/src/data/gameData.ts
Yer: ALL_BUILDINGS dizisine ekle
Örnek:
{
  id: 'bina_adi',
  name: 'Bina Adı',
  icon: '🏢',
  desc: 'Açıklama',
  zone: 1,
  cost: 1000,
  costInc: 1.15,
  production: { 'demir': 10 },
  consumption: {},
  energyProd: 0,
  energyCons: 0,
  xpReward: 50,
}
```

### Yeni Araştırma Ekle
```
Dosya: client/src/data/gameData.ts
Yer: RESEARCH_TREE dizisine ekle
Örnek:
{
  id: 'arastirma_adi',
  name: 'Araştırma Adı',
  desc: 'Açıklama',
  cost: 500,
  zone: 1,
  prereqs: [],
  effect: (state) => {
    // Araştırma tamamlandığında çalışacak kod
  },
}
```

### Yeni Mekanik Ekle
```
Dosya: client/src/utils/gameLogic.ts
Adım:
1. Yeni fonksiyon ekle
2. Game.tsx'te import et
3. useEffect içinde çağır
```

### Stil Değiştir
```
Dosya: client/src/styles/game.css
Not: Responsive tasarımı koru (@media queries)
```

## 🎯 Önemli Kurallar

1. **GameState'i doğrudan değiştir, sonra `doSave()` çağır**
   ```typescript
   state.money += 100;
   doSave(state);
   ```

2. **Yeni özellik eklemeden önce interface'e ekle**
   ```typescript
   export interface GameState {
     // ... var olan özellikler
     yeniOzellik?: number;
   }
   ```

3. **Var olan fonksiyon adlarını değiştirme**
   - `calculateGameTick` - Oyun döngüsü
   - `buyBuilding` - Bina satın al
   - `unlockResearch` - Araştırma yap
   - `doPrestige` - Prestige yap

4. **CSS'de responsive tasarımı koru**
   ```css
   /* Mobil */
   .element {
     font-size: 12px;
   }
   
   /* Masaüstü */
   @media (min-width: 768px) {
     .element {
       font-size: 14px;
     }
   }
   ```

## 🚀 Dağıtım

Proje otomatik olarak dağıtılır. Değişiklik yaptıktan sonra:
1. `pnpm build` ile derle
2. Checkpoint oluştur
3. Publish butonuna tıkla

## 📞 Sorular?

- **Oyun verileri:** `gameData.ts` dosyasına bak
- **Oyun mantığı:** `gameLogic.ts` dosyasına bak
- **Detaylı rehber:** `DEVELOPMENT_GUIDE.md` dosyasına bak

---

**Mutlu geliştirmeler!** 🎮
