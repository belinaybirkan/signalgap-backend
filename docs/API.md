# API Kısa Dokümantasyonu

Temel URL: `http://localhost:3000`

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/health` | Sağlık kontrolü |
| GET | `/gaps` | Listele (durum, öncelik, risk, kategori, sorumlu filtreleri) |
| GET | `/gaps/:id` | Detay |
| POST | `/gaps` | Oluştur |
| PUT | `/gaps/:id` | Güncelle |
| DELETE | `/gaps/:id` | Sil (204) |
| GET | `/gaps/search?keyword=yedek` | Ara |
| GET | `/gaps/assignee/Deniz` | Sorumluya göre listele |
| GET | `/reports/summary` | Özet |
| GET | `/reports/completed` | Tamamlanan |
| GET | `/reports/pending` | Bekleyen |

POST için zorunlu alanlar: `title`, `description`, `priority`, `assignee`.

Geçerli priority ve riskLevel değerleri: `low`, `medium`, `high`. Geçerli status değerleri: `discovered`, `investigating`, `verified`, `resolved`, `accepted-risk`.

Listeleme için `page`, `limit`, `sort`, `order` query parametreleri desteklenir. Hatalı isteklerde açıklamalı HTTP 400, bulunamayan ID için HTTP 404 yanıtı döner.
