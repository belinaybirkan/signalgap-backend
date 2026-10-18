# Test ve teslim notları

## Postman

1. Proje klasöründe `npm install` ardından `npm start` çalıştır.
2. `http://localhost:3000/health` adresinden sunucuyu kontrol et.
3. Postman'de `postman/SignalGap.postman_collection.json` koleksiyonunu içe aktar.
4. `01 – Zorunlu CRUD Testleri` klasöründeki istekleri sırayla gönder. POST isteği yeni kaydın ID'sini `gapId` değişkenine kaydeder.
5. Sonuçları şu sırada kontrol et: POST **201**, GET liste **200**, GET detay **200**, PUT **200**, DELETE **204**.
6. Her isteğin ekran görüntüsünü `screenshots/README.md` dosyasındaki adlarla kaydet.

## GitHub'a ekleme

Test görsellerini GitHub'da `screenshots/` klasörüne, proje tasarım ve kurulum PDF'lerini de `docs/` klasörüne yükle. GitHub sayfasındaki **Add file → Upload files** seçeneğini kullanıp **Commit changes** ile kaydet.

## Ders formuna yükleme

| Alan | Dosya |
| --- | --- |
| Proje tasarım çıktısı | `SignalGap_Proje_Tasarim.pdf` |
| Kurulum notu | `SignalGap_Kurulum_Notu.pdf` |
| Test ekran görüntüleri | Beş ayrı PNG dosyası |
| GitHub bağlantısı | https://github.com/belinaybirkan/signalgap-backend |

API hata verirse önce `npm start` çalıştırdığın terminali ve Postman'deki `baseUrl` değerini kontrol et. `baseUrl` = `http://localhost:3000` olmalı.
