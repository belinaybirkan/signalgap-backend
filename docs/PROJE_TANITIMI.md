# Proje tanıtımı

## SignalGap nedir?

SignalGap, yazılım ekiplerinin henüz cevaplanmamış teknik konuları ve operasyonel riskleri takip etmesi için geliştirilen küçük bir REST API projesidir.

Örneğin bir ekip, yedekleme işleminin çalıştığını biliyor ama yedekten geri yükleme işlemini uzun zamandır denememiş olabilir. Böyle bir durum ortaya çıktığında konu kaydedilir, bir sorumlu belirlenir, önceliği işaretlenir ve araştırma süreci takip edilir.

Normal bir yapılacaklar listesinden farklı olarak kayıtların konusu çoğu zaman “henüz netleşmemiş bir soru”dur. Bununla birlikte her kayıt bir ekip görevi olarak ele alınır.

## Neler yapılabiliyor?

Bir kayıt eklenebilir, listelenebilir, ayrıntıları görülebilir, güncellenebilir ve silinebilir. Kayıtlar bir sorumluya atanır; öncelik ve risk seviyesi tutulur. Çalışma ilerledikçe durum değiştirilebilir. Tamamlanan konu için kısa bir çözüm notu yazılabilir.

İsteğe bağlı olarak kayıtlar filtrelenebilir, aranabilir ve sayfalara ayrılabilir. Özet rapor endpointleri mevcut kayıtların sayılarını gösterir.

## Veri modeli

| Alan | Açıklama |
| --- | --- |
| `id` | Kayıt numarası |
| `title` | Konunun kısa başlığı |
| `description` | Sorunun veya riskin açıklaması |
| `assignee` | Konuyu takip eden kişi |
| `priority` | İş önceliği: low, medium, high |
| `riskLevel` | Risk seviyesi: low, medium, high |
| `status` | discovered, investigating, verified, resolved, accepted-risk |
| `category` | İlgili alan veya modül |
| `resolution` | Yapılan çalışmanın sonucu |
| `createdAt / updatedAt` | Oluşturulma ve güncellenme zamanı |

## Teknik yapı

Backend Node.js ve Express.js ile geliştirildi. API yönlendirmeleri, controller fonksiyonları, iş mantığı ve middleware işlemleri ayrı klasörlerde tutuluyor. HTTP isteklerinin yöntemi, adresi ve zamanı logger middleware üzerinden terminale yazılıyor.

Veriler JSON dosyasında saklanıyor. Böylece bu sürümde veritabanı kurulumu gerekmiyor.

Projede asıl hedef CRUD işlemlerini, Express routing yapısını, middleware kullanımını ve Postman ile test sürecini uygulamak.

Kaynak kodlar ve kurulum adımları için proje kökündeki `README.md` dosyası kullanılabilir.
