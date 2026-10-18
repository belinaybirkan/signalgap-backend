# SignalGap

**Node.js / Express ile hazırlanmış bir görev ve risk takip API'si.**

Yazılım projelerinde bazı konular doğrudan hata olarak görünmez. Örneğin, bir servisin kim tarafından kullanıldığı bilinmiyor olabilir veya yedekleme sistemi uzun zamandır denenmemiş olabilir. SignalGap'te bu konuları kayıt altına alıp sorumlu kişiye atayabiliyor, öncelik ve durumlarını takip edebiliyoruz.

Bu proje backend geliştirme eğitimi kapsamında hazırlandı. Arayüzü bulunmuyor; işlemler REST API üzerinden yapılıyor.

## Kurulum

Node.js 18 veya üzeri gerekiyor.

```bash
git clone https://github.com/belinaybirkan/signalgap-backend.git
cd signalgap-backend
npm install
npm start
```

Sunucu `http://localhost:3000` adresinde açılır. `http://localhost:3000/health` adresi çalışıyorsa API hazırdır.

## API

| İşlem | Yöntem | Endpoint |
| --- | --- | --- |
| Kayıtları listele | GET | `/gaps` |
| Tek kayıt getir | GET | `/gaps/:id` |
| Kayıt oluştur | POST | `/gaps` |
| Kayıt güncelle | PUT | `/gaps/:id` |
| Kayıt sil | DELETE | `/gaps/:id` |

Örnek kayıt oluşturma isteği: `POST /gaps`

```json
{
  "title": "Yedekler geri yüklenebiliyor mu?",
  "description": "Son geri yükleme testinin kaydı bulunamadı.",
  "priority": "high",
  "assignee": "Deniz",
  "riskLevel": "high",
  "category": "infrastructure"
}
```

`title`, `description`, `priority` ve `assignee` zorunlu alanlar. Durum alanı sırasıyla `discovered`, `investigating`, `verified`, `resolved` veya `accepted-risk` olabilir.

Temel işlemlerin yanında duruma ve önceliğe göre filtreleme, arama, sayfalama ve özet raporlar da bulunuyor. Endpointlerin tamamı [API notlarında](docs/API.md) yer alıyor.

## Projenin yapısı

```text
src/
  controllers/   İstek ve yanıt işlemleri
  data/          JSON veri dosyası
  middleware/    Logger, doğrulama ve hata yönetimi
  routes/        API adresleri
  services/      Kayıt işlemlerinin iş mantığı
  utils/         Dosya okuma/yazma
tests/           Otomatik testler
postman/         Postman koleksiyonu
docs/            Proje ve kurulum notları
screenshots/     Postman test ekran görüntüleri
```

Veriler şimdilik `src/data/gaps.json` dosyasında tutuluyor. Veritabanı veya kullanıcı giriş sistemi kullanılmadı; proje temel REST API ve CRUD mantığına odaklanıyor.

## Test

```bash
npm test
```

Bu komut birim testlerini çalıştırır. Sunucu `npm start` ile açıkken farklı bir terminalde `npm run test:http` komutuyla HTTP isteklerini de deneyebilirsin.

Postman için [koleksiyon dosyasını](postman/SignalGap.postman_collection.json) içe aktar. `01 – Zorunlu CRUD Testleri` klasörünü POST, GET, GET detay, PUT ve DELETE sırasıyla çalıştır. Ekran görüntülerinin adları ve teslim işlemleri için [test notuna](docs/TEST_VE_TESLIM_REHBERI.md) bakabilirsin.

## Belgeler

- [Proje tanıtımı](docs/PROJE_TANITIMI.md)
- [API notları](docs/API.md)
- [Kurulum ve Postman testleri](docs/TEST_VE_TESLIM_REHBERI.md)

