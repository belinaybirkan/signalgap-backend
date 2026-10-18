# Postman ile test ve ders teslimi

## A. API'yi çalıştır

Node.js 18+ kurulu bilgisayarda:

```bash
git clone https://github.com/belinaybirkan/signalgap-backend.git
cd signalgap-backend
npm install
npm start
```

Tarayıcıda `http://localhost:3000/health` açılmalı ve `{"status":"ok","service":"SignalGap"}` dönmeli. Terminal açık kalmalıdır.

## B. Postman testleri

1. Postman'de **Import → File** yoluyla `postman/SignalGap.postman_collection.json` dosyasını içe aktar.
2. Koleksiyon değişkeni `baseUrl` için `http://localhost:3000` kullan.
3. `01 – Zorunlu CRUD Testleri` klasörünü aç.
4. **01 Oluştur**: POST `/gaps`, durum kodu **201**. Dönen `id`, `gapId` değişkenine otomatik kaydolur.
5. **02 Listele**: GET `/gaps`, durum kodu **200**. `data` dizisinde oluşturduğun kaydı gör.
6. **03 Detay**: GET `/gaps/{{gapId}}`, durum kodu **200**. Tek kayıt detayını gör.
7. **04 Güncelle**: PUT `/gaps/{{gapId}}`, durum kodu **200**. Kaydın `status` değeri değişmeli.
8. **05 Sil**: DELETE `/gaps/{{gapId}}`, durum kodu **204**; yanıtın boş olması normaldir.
9. Her isteğin Postman ekran görüntüsünü ayrı PNG dosyası olarak kaydet. Yol ve dosya isimleri için [screenshots/README.md](../screenshots/README.md) belgesine bak.

Testlerin sırası önemlidir: POST önce gelmeli, DELETE son işlem olmalıdır. Ayrıca koleksiyonda filtreleme, arama, rapor ve doğrulama örnekleri de vardır.

## C. GitHub'a görselleri ekle

1. [screenshots klasörünü](https://github.com/belinaybirkan/signalgap-backend/tree/main/screenshots) aç.
2. **Add file → Upload files** üzerinden gerçek beş PNG'yi seç.
3. **Commit changes** ile kaydet.
4. Klasörde dosyaların görüldüğünü doğrula.

## D. Teslim formu kontrolü

| Form alanı | Yüklenecek içerik |
|---|---|
| Yalnızca PDF / Tasarım çıktısı | SignalGap Proje Tasarım PDF'i |
| Kurulum Notu (readme) | SignalGap Kurulum Notu PDF'i |
| Test ekran görüntüleri | Gerçek Postman ekran görüntüleri (5 ayrı PNG) |
| GitHub bağlantısı | https://github.com/belinaybirkan/signalgap-backend |

PDF'ler sohbetten indirilebilir. **Şu anda GitHub reposunda iki PDF yoktur**; istersen GitHub `docs/` klasörüne de **Add file → Upload files** ile ekle. Teslim formuna PDF'leri ayrıca yüklemek gerekir.

## E. Sık karşılaşılan hatalar

- Postman'de `ECONNREFUSED`: `npm start` açık değil veya `baseUrl` yanlış.
- `404`: URL veya kayıt ID'si yanlış; POST isteğini tekrar gönderip değişkeni güncelle.
- `400`: POST gövdesinde `title`, `description`, `priority`, `assignee` alanlarının dolu olduğuna bak.
- `204` ve boş yanıt: DELETE için doğru davranış.
- `Cannot find module 'express'`: `npm install` tamamlanmamış.
