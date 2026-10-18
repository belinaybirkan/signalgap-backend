
# Postman ekran görüntüleri

CRUD testlerinin ekran görüntüleri burada tutuluyor. Her görselde istek adresi, yöntem ve yanıtın durum kodu görünmeli.

| Dosya | Test | Beklenen yanıt |
| --- | --- | --- |
| `01-post-create.png` | POST /gaps | 201 Created |
| `02-get-list.png` | GET /gaps | 200 OK |
| `03-get-detail.png` | GET /gaps/:id | 200 OK |
| `04-put-update.png` | PUT /gaps/:id | 200 OK |
| `05-delete.png` | DELETE /gaps/:id | 204 No Content |

DELETE yanıtında gövdenin boş olması normaldir. Testleri yaparken oluşturulan kaydın ID'si ile devam edilmeli, silme isteği en son gönderilmelidir.


