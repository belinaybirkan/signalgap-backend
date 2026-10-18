# SignalGap Backend

SignalGap, yazılım ekiplerinin henüz cevabı bulunmayan teknik sorularını ve operasyonel risklerini takip etmek için hazırlanmış bir Node.js / Express REST API projesidir. Her kaydın başlığı, açıklaması, sorumlusu, önceliği, risk seviyesi ve durumu vardır.

Bu bir **backend projesi**. Web arayüzü yok; API'yi Postman üzerinden kullanıyoruz.

## Kurulum ve çalıştırma

Bilgisayarda Node.js 18 veya üzeri, Git ve Postman kurulu olmalı. Terminalde:

```bash
git clone https://github.com/belinaybirkan/signalgap-backend.git
cd signalgap-backend
npm install
npm start
```

Terminalde `SignalGap çalışıyor: http://localhost:3000` mesajını görmelisin. Tarayıcıdan `http://localhost:3000/health` aç; beklenen yanıt:

```json
{"status":"ok","service":"SignalGap"}
```

Postman testleri bitene kadar bu terminali **kapatma**. Başka bir terminalde otomatik testleri çalıştırabilirsin:

```bash
npm test
npm run test:http
```

`npm run test:http` komutunu kullanırken API'nin açık olması gerekir. İlk komut iş mantığı testlerini, ikincisi çalışan sunucunun HTTP endpointlerini test eder.

## Beş temel CRUD endpointi

| İşlem | Yöntem | Adres | Başarılı durum kodu |
|---|---|---|---|
| Kayıt oluştur | POST | `/gaps` | 201 |
| Kayıtları listele | GET | `/gaps` | 200 |
| Kayıt detayı | GET | `/gaps/:id` | 200 |
| Kayıt güncelle | PUT | `/gaps/:id` | 200 |
| Kayıt sil | DELETE | `/gaps/:id` | 204 |

Örnek POST gövdesi:

```json
{
  "title": "Yedekler geri yüklenebiliyor mu?",
  "description": "Son test kaydı bulunamadı.",
  "priority": "high",
  "assignee": "Deniz",
  "riskLevel": "high",
  "category": "infrastructure"
}
```

Zorunlu alanlar: `title`, `description`, `priority`, `assignee`. Seviye değerleri `low`, `medium`, `high`; durum değerleri `discovered`, `investigating`, `verified`, `resolved`, `accepted-risk`.

## Postman'de test etme

1. Postman uygulamasını aç.
2. **Import → File** ile [Postman koleksiyonunu](postman/SignalGap.postman_collection.json) içe aktar. Dosyayı repodan indirmen veya klonlanmış klasörden seçmen yeterli.
3. Koleksiyon değişkenlerinde `baseUrl = http://localhost:3000` olmalı.
4. **01 – Zorunlu CRUD Testleri** klasöründe `POST → GET liste → GET detay → PUT → DELETE` sırasını izle.
5. POST isteğinin yanıtından gelen `id`, başarılı isteğin ardından otomatik olarak `gapId` koleksiyon değişkenine kaydedilir. Böylece `/gaps/{{gapId}}` çalışan kaydın ID'sini kullanır.
6. Her isteği **Send** ile gönder ve HTTP durum kodu, URL ve yanıt alanı görünürken ekran görüntüsünü al.
7. Beş PNG dosyasını [screenshots klasörüne](screenshots/README.md) ekle. Gerçek Postman ekran görüntüleri henüz repoda yoktur ve ayrıca çekilmelidir.

Ayrıntılı yönerge: [Postman ve teslim adımları](docs/TEST_VE_TESLIM_REHBERI.md).

## Ek özellikler

- `GET /gaps?status=investigating`: duruma göre filtreleme
- `GET /gaps?priority=high`: önceliğe göre filtreleme
- `GET /gaps/search?keyword=yedek`: arama
- `GET /gaps/assignee/Deniz`: sorumluya göre listeleme
- `GET /gaps?page=1&limit=5`: sayfalama
- `GET /reports/summary`, `/reports/completed`, `/reports/pending`: raporlar

Logger middleware gelen isteklerin zamanını, HTTP yöntemini ve URL'sini terminale yazar. Uygun olmayan kayıt verilerinde 400, olmayan kayıt ID'sinde 404 döner.

## Klasör yapısı

- `src/routes`: API yolları
- `src/controllers`: istek-yanıt işlemleri
- `src/services`: iş kuralları
- `src/middleware`: logger, validation, hata yönetimi
- `src/utils`: JSON dosyasını okuma/yazma
- `src/data/gaps.json`: örnek kayıtlar (API bu dosyayı değiştirir)
- `postman`: API test koleksiyonu
- `tests`: otomatik testler
- `docs`: proje ve teslim dokümanları
- `screenshots`: Postman test ekran görüntülerinin ekleneceği klasör

## Teslim kontrolü

- [x] Public GitHub repository ve kaynak kodları
- [x] README, Postman koleksiyonu ve otomatik testler
- [ ] Proje tasarım PDF'i ve kurulum notu PDF'i GitHub'daki `docs/` klasörüne eklenmeli (PDF'ler ders formuna ayrıca yüklenebilir)
- [ ] Gerçek beş Postman ekran görüntüsü alınıp `screenshots/` klasörüne eklenmeli
- [ ] İki PDF, ekran görüntüleri ve GitHub bağlantısı ders formuna gönderilmeli

**GitHub bağlantısı:** https://github.com/belinaybirkan/signalgap-backend

### Sorun yaşarsan

- `npm is not recognized` → Node.js LTS kur, terminali yeniden aç.
- PowerShell `npm.ps1 cannot be loaded` → `npm.cmd install` ve `npm.cmd start` komutlarını kullan veya VS Code'da Command Prompt aç.
- `Cannot find module 'express'` → proje klasöründe `npm install` çalıştır.
- Postman `ECONNREFUSED 127.0.0.1:3000` → sunucu kapalıdır; `npm start` terminalini kontrol et.
- `EADDRINUSE: 3000` → başka bir uygulama portu kullanıyor; o uygulamayı kapat veya PORT'u değiştir.
- `404` → URL'yi veya kayıt ID'sini kontrol et. `GET /gaps/9999` ile var olmayan kayıt sorgulanabilir.
