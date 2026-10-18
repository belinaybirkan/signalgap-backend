# Postman CRUD test ekran görüntüleri

Bu klasör, SignalGap için **gerçek Postman çalıştırma kanıtlarını** saklar. README bir ekran görüntüsü değildir; dosyalar bilgisayardaki Postman üzerinden çekilip buraya ayrıca eklenmelidir.

## Eklenecek dosyalar

| Sıra | Dosya adı | Postman isteği | Beklenen durum |
|---|---|---|---|
| 1 | `01-post-create.png` | POST `/gaps` | 201 Created |
| 2 | `02-get-list.png` | GET `/gaps` | 200 OK |
| 3 | `03-get-detail.png` | GET `/gaps/{{gapId}}` | 200 OK |
| 4 | `04-put-update.png` | PUT `/gaps/{{gapId}}` | 200 OK |
| 5 | `05-delete.png` | DELETE `/gaps/{{gapId}}` | 204 No Content |

## Nasıl hazırlanır?

1. `npm start` ile API'yi çalıştır.
2. `postman/SignalGap.postman_collection.json` dosyasını Postman'de **Import** et.
3. `01 – Zorunlu CRUD Testleri` klasöründe sırayla 5 isteği gönder.
4. Her istekte **HTTP yöntemi, URL, Response bölümündeki durum kodu ve varsa JSON yanıtı** görünürken ekran görüntüsü al.
5. Windows'ta `Win + Shift + S`, macOS'ta `Cmd + Shift + 4` ile görüntü alınabilir. Görüntüleri yukarıdaki dosya adlarıyla PNG olarak kaydet.
6. GitHub'da `screenshots/` klasörünü aç; **Add file → Upload files → Commit changes** ile beş PNG'yi ekle.
7. Aynı PNG'leri ders teslim formunun **Test ekran görüntüleri** alanına ayrı ayrı yükle.

**Önemli:** DELETE yanıtının boş görünmesi normaldir; `204 No Content` durum kodu başarıyı kanıtlar. Aynı `gapId` ile DELETE isteğini tekrar gönderirsen kayıt silindiği için 404 dönebilir.

Gerçek görseller yüklenene kadar bu klasörde yalnızca bu açıklama bulunacaktır. Yapay veya oluşturulmuş ekran görüntüleri test kanıtı sayılmaz.
