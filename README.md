# MyPortfolio

> Kendi ihtiyaçlarım ve kendimi geliştirmek için hazırladığım kişisel portföy projem.  
> Bu projeyi ortaya çıkarma süreci benim için hem öğretici hem de gerçekten keyifliydi; tamamladıkça motivasyonum ve mutluluğum arttı.

---

## Projenin Amacı (Neden Var?)
MyPortfolio; **kendimi, yetkinliklerimi ve yaptığım projeleri tek bir yerde sergileyebileceğim**, aynı zamanda içeriklerini (Hakkımda, projeler, sertifikalar, sosyal medya linkleri vb.) **admin paneli üzerinden kolayca güncelleyebileceğim** bir portföy uygulamasıdır.

Bu proje ile hedeflediklerim:
- Portföyümü düzenli ve profesyonel bir formatta sunmak
- İçerikleri kodla uğraşmadan panel üzerinden yönetebilmek (CRUD)
- ASP.NET MVC + Entity Framework + SQL Server pratiği yapmak
- UI/UX tarafında daha modern ve düzenli bir arayüz oluşturmak

---

## Ekran Görüntüleri (Screenshots)

![image](MyPortfolio-Images/1.png)
![image](MyPortfolio-Images/2.png)
![image](MyPortfolio-Images/3.png)
![image](MyPortfolio-Images/4.png)
![image](MyPortfolio-Images/5.png)
![image](MyPortfolio-Images/6.png)
![image](MyPortfolio-Images/7.png)
![image](MyPortfolio-Images/8.png)
![image](MyPortfolio-Images/9.png)
![image](MyPortfolio-Images/10.png)
![image](MyPortfolio-Images/11.png)
![image](MyPortfolio-Images/12.png)
![image](MyPortfolio-Images/13.png)
![image](MyPortfolio-Images/14.png)
![image](MyPortfolio-Images/15.png)
![image](MyPortfolio-Images/16.png)
![image](MyPortfolio-Images/17.png)
![image](MyPortfolio-Images/18.png)
![image](MyPortfolio-Images/19.png)
![image](MyPortfolio-Images/20.png)
![image](MyPortfolio-Images/21.png)
![image](MyPortfolio-Images/22.png)
![image](MyPortfolio-Images/23.png)
![image](MyPortfolio-Images/24.png)


---

## Kullanılan Teknolojiler

### Backend
- **ASP.NET MVC 5** (System.Web tabanlı)
- **.NET Framework 4.7.2**
- **Entity Framework 6 (EF6)**

### Veritabanı
- **Microsoft SQL Server**
- EF yaklaşımı: **Database-First (EDMX / Entity Model)**

### Frontend
- HTML / CSS / JavaScript
- **Bootstrap 5**
- **jQuery**
- **jQuery Validation + Unobtrusive Validation**
- **Swiper.js** (slider/karusel)

---

## Mimari / Yapı
- MVC katmanları:
  - `Controllers`: istek yönetimi + iş akışı
  - `Views` (`.cshtml`): Razor ile arayüz
  - `Models/Entity`: EF entity ve DbContext
- Bazı modüllerde **Repository Pattern** kullanımı (örn. SocialMedia, Certificates, Messages, Projects)
- Bazı ekranlarda **ViewModel** ile birden fazla tabloyu tek modelde birleştirme (örn. About)

---

## Özellikler
- Ziyaretçi sayfası:
  - Ana sayfa / Hakkımda / Yetkinlikler / Sertifikalar / Projeler / İletişim
  - Bölümler Partial View olarak render edilir
- Admin panel:
  - CRUD işlemleri (Listele/Ekle/Güncelle/Sil)
  - Mesajları görüntüleme ve “okundu” işaretleme
- Form güvenliği:
  - `[ValidateAntiForgeryToken]` ile CSRF koruması
  - `ModelState` ile validasyon kontrolü

---

## Kimlik Doğrulama
- Admin girişi **Forms Authentication** ile yapılır.
- Admin ekranları `[Authorize]` ile korunur.

---

## Kurulum / Çalıştırma (Özet)
1. SQL Server’da `MyPortfolioDB` veritabanını oluşturun (veya mevcut script/backup ile kurun).
2. `Web.config` içindeki connection string’i kendi ortamınıza göre güncelleyin.
3. Visual Studio ile projeyi açın ve IIS Express ile çalıştırın.

---

## Notlar
- Bu proje tamamen **kişisel kullanımım ve gelişimim** için hazırlanmıştır.
- Üretim ortamı için şifre saklama, güvenlik ve yapılandırma ayarlarının iyileştirilmesi önerilir.
