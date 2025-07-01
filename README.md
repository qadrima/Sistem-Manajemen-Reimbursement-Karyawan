# Reimbursement Management API – Laravel

Sistem backend untuk pengajuan dan pengelolaan reimbursement karyawan menggunakan Laravel. Mendukung manajemen role-permission, approval workflow, dan notifikasi email menggunakan queue.

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

## 📦 Instalasi

1. Clone repository
```bash
git clone https://github.com/yourusername/reimbursement-api.git

cd reimbursement-api

Install dependencies

bash
Salin
Edit
composer install
Salin file environment dan sesuaikan

bash
Salin
Edit
cp .env.example .env
Generate key dan JWT secret

bash
Salin
Edit
php artisan key:generate
php artisan jwt:secret
Buat database dan sesuaikan .env:

env
Salin
Edit
DB_DATABASE=reimbursement
DB_USERNAME=root
DB_PASSWORD=
Jalankan migrasi dan seeder:

bash
Salin
Edit
php artisan migrate --seed
Jalankan queue:

bash
Salin
Edit
php artisan queue:work
✉️ Konfigurasi Email (Mailtrap)
Set di .env:

env
Salin
Edit
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=null