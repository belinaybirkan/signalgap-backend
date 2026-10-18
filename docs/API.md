# API notları

Temel adres: `http://localhost:3000`

| Method | Endpoint | Açıklama | Başarılı kod |
| --- | --- | --- | --- |
| GET | `/health` | Sunucu kontrolü | 200 |
| POST | `/gaps` | Kayıt ekleme | 201 |
| GET | `/gaps` | Kayıtları listeleme | 200 |
| GET | `/gaps/:id` | Kayıt detayı | 200 |
| PUT | `/gaps/:id` | Kayıt güncelleme | 200 |
| DELETE | `/gaps/:id` | Kayıt silme | 204 |
| GET | `/gaps/search?keyword=yedek` | Başlık/açıklama araması | 200 |
| GET | `/gaps/assignee/Deniz` | Sorumluya göre listeleme | 200 |
| GET | `/reports/summary` | Genel rapor | 200 |
| GET | `/reports/completed` | Kapanan kayıt sayısı | 200 |
| GET | `/reports/pending` | Açık kayıt sayısı | 200 |

Listeleme için ayrıca `status`, `priority`, `riskLevel`, `assignee`, `category`, `page`, `limit`, `sort` ve `order` sorgu parametreleri kullanılabilir.

**POST /gaps** için zorunlu alanlar: `title`, `description`, `priority`, `assignee`.

```json
{
  "title": "Eski servis hâlâ kullanılıyor mu?",
  "description": "Bağımlılıkları kontrol etmek gerekiyor.",
  "priority": "medium",
  "assignee": "Ece",
  "category": "architecture",
  "riskLevel": "medium"
}
```

**PUT /gaps/:id** için yalnızca değiştirilecek alanları göndermek yeterlidir:

```json
{
  "status": "resolved",
  "resolution": "Bağımlılıklar incelendi."
}
```

Hatalı veya eksik veride `400 Bad Request`, bulunamayan kayıt için `404 Not Found` döner. Silme işleminde `204 No Content` yanıtının gövdesi boştur.
