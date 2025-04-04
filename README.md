# 🐎 Horse Race Simulator

Bu proje, Vue 3 + Vuex + TypeScript kullanılarak geliştirilmiş dinamik bir **at yarışı simülasyonu**dur. 20 farklı at rastgele olarak oluşturulur, yarış programı planlanır ve her yarışta 10 at koşarak kazananlar belirlenir. Yarışlar animasyonlu olarak pistte gösterilir.

## 🚀 Özellikler

- 20 farklı at rastgele isim, kondisyon ve renklerle oluşturulur.
- Her yarışta rastgele 10 at seçilir.
- Farklı mesafelerde yarışlar planlanır (1200m, 1400m, 1600m...).
- Gerçek zamanlı yarış animasyonu.
- Her turun sonunda sonuç tablosu.
- Yarış programı ve geçmiş yarışların kazananları gösterilir.
- Tamamen **Vuex** tabanlı state yönetimi.
- **TypeScript** ile tip güvenliği.

## 🖼️ Ekran Görüntüleri

### 🎯 Yarış Pisti
![Track](./assets/screenshots/track.png)

### 🐎 At Listesi
![Horse List](./assets/screenshots/horses.png)

### 📋 Yarış Programı
![Schedule](./assets/screenshots/schedule.png)

### 🏆 Sonuçlar
![Results](./assets/screenshots/results.png)

## 🧪 Testler

Proje, `Vitest` ile test edilmektedir.

### Test Çalıştırmak için:

```bash
npm install
npm run dev
npm test
