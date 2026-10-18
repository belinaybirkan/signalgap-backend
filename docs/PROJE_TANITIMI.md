# SignalGap – Proje Tanıtımı

SignalGap, yazılım ekiplerinde fark edilen fakat henüz sonuca bağlanmamış teknik belirsizlikleri ve riskleri takip eden bir REST API'dir. Her kayıt bir başlık, açıklama, öncelik, risk seviyesi, sorumlu kişi ve durum bilgisi taşır.

Örneğin bir yedekleme sisteminin geri yükleme testinin bulunamaması kayıt oluşturmayı gerektirir. Sorumlu kişi bu konuyu araştırır ve sonucu kayda geçirir.

Durumlar: discovered, investigating, verified, resolved, accepted-risk.

Projede Node.js ve Express.js kullanılır; veriler JSON dosyasında saklanır. Routes, controllers, services ve middleware ayrı klasörlerdedir. Beş temel CRUD işlemi ve HTTP isteklerini tarih, method ve URL ile kaydeden logger zorunlu işlevleri oluşturur.

Ek olarak validation, filtreleme, arama, sayfalama ve raporlama endpointleri geliştirilmiştir.
