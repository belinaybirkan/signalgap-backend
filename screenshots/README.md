
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

<img width="957" height="565" alt="01-post-create" src="https://github.com/user-attachments/assets/bdcb3942-b85c-41d4-a3d6-878e578111e8" />
<img width="959" height="564" alt="05-delete" src="https://github.com/user-attachments/assets/089eb471-a8be-4d4a-825e-71e65bc21cca" />
<img width="959" height="564" alt="04-put-update" src="https://github.com/user-attachments/assets/4061f660-6229-4aa7-9bf6-99e7268f9c92" />
<img width="959" height="565" alt="03-get-detail" src="https://github.com/user-attachments/assets/f12cbd98-de01-4512-96e8-f6151af8e382" />
<img width="958" height="565" alt="02-get-list" src="https://github.com/user-attachments/assets/c6bc41df-222e-432c-b2e5-c3a9cda37940" />

