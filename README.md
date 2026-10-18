# SignalGap Backend

**SignalGap**, bir yazılım ekibinde henüz net cevaplanmamış teknik soruları, operasyonel riskleri ve gözden kaçabilecek konuları takip etmek için hazırladığım REST API projesidir.

Bir işin henüz hata olarak ortaya çıkmamış olması, takip edilmesine gerek olmadığı anlamına gelmez. Örneğin yedeklerin geri yüklenip yüklenemediğinin bilinmemesi veya eski bir servisin hangi modüller tarafından kullanıldığının net olmaması bu sisteme kayıt edilebilir.

## Kullanılan teknolojiler

- Node.js (18 veya üzeri)
- Express.js
- JavaScript (CommonJS)
- JSON dosyasıyla kalıcı veri saklama
- Postman ile API testi

## Kurulum

```bash
git clone https://github.com/belinaybirkan/signalgap-backend.git
cd signalgap-backend
npm install
npm start
```

Sunucu varsayılan olarak **http://localhost:3000** üzerinde çalışır. Tarayıcıdan `http://localhost:3000/health` adresini açarak deneyebilirsin.

## Temel endpointler

| Method | Adres | Açıklama |
|---|---|---|
| GET | /gaps | Tüm kayıtları listele |
| GET | /gaps/:id | Tek bir kaydı getir |
| POST | /gaps | Yeni kayıt oluştur |
| PUT | /gaps/:id | Kaydı güncelle |
| DELETE | /gaps/:id | Kaydı sil |

İsteğe bağlı ek endpointler: `GET /gaps?status=investigating`, `GET /gaps?priority=high`, `GET /gaps/search?keyword=yedek`, `GET /reports/summary`, `GET /reports/completed`, `GET /reports/pending`.

## Örnek kayıt oluşturma

`POST http://localhost:3000/gaps`

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

Zorunlu alanlar `title`, `description`, `priority`, `assignee`. `priority` ve `riskLevel`: `low`, `medium`, `high`. Durum değerleri: `discovered`, `investigating`, `verified`, `resolved`, `accepted-risk`.

## Testler

```bash
npm test
```

Sunucu çalışırken, başka terminalden:

```bash
npm run test:http
```

Postman koleksiyonunu `postman/SignalGap.postman_collection.json` yolundan içe aktarabilirsin. Test ekran görüntülerini `screenshots/` içine kaydet. Gerçek ekran görüntüleri ayrıca oluşturulmalıdır.

## Proje dosyaları

- `src/routes`: API yolları
- `src/controllers`: İstek ve yanıt işlemleri
- `src/services`: Görev yönetiminin iş mantığı
- `src/middleware`: Logger, doğrulama ve hata yönetimi
- `src/data/gaps.json`: Örnek kayıtlar
- `tests`: Otomatik testler
- `docs`: Proje tasarımı ve teslim belgeleri

Proje tanıtımı, kurulum notu ve API kullanım bilgileri `docs/` altındadır. Belgelerin Word/PDF kopyaları sohbetin teslim ZIP paketinde de bulunur.

## Teslim notu

Ders formuna proje tasarım PDF'i, kurulum notu PDF'i, Postman'dan alınan gerçek CRUD ekran görüntüleri ve bu repoya ait bağlantı eklenmelidir.
