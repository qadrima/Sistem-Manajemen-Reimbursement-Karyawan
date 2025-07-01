# Reimbursement Management

---

## 🚀 Fitur Utama

- Autentikasi menggunakan JWT
- Manajemen user dan role (Spatie)
- CRUD kategori reimbursement dengan batas limit per bulan
- Pengajuan reimbursement dengan upload file (PDF/JPG)
- Persetujuan / penolakan reimbursement oleh manajer
- Soft delete dan restore
- Pencatatan aktivitas (activity log)
- Pengiriman email otomatis (Mailtrap) via queue saat pengajuan

---

## 🛠️ Teknologi

- Laravel 10+
- JWT (tymon/jwt-auth)
- Spatie Permission
- Laravel Queue (database driver)
- Mailtrap SMTP (email testing)
- MySQL / MariaDB

---

## 📦 Instalasi Backend

Clone repository
```bash
git clone https://github.com/qadrima/Sistem-Manajemen-Reimbursement-Karyawan.git
```

```bash
cd Sistem-Manajemen-Reimbursement-Karyawan/backend
```

Install dependencies
```bash
composer install
```

Salin file environment dan sesuaikan
```bash
cp .env.example .env
```

Generate key dan JWT secret
```bash
php artisan key:generate
php artisan jwt:secret
```

Buat database dan sesuaikan .env:
```bash
DB_DATABASE=reimbursement
DB_USERNAME=root
DB_PASSWORD=
```

Jalankan migrasi dan seeder:
```bash
php artisan migrate --seed
```

✉️ Konfigurasi Email (Mailtrap) Set di .env:
```bash
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=null
```

Jalankan queue:
```bash
php artisan queue:work
```

## 📦 Instalasi Frontend

Clone repository
```bash
git clone 
```