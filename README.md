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

## 📦 Setup

```bash
git clone https://github.com/qadrima/Sistem-Manajemen-Reimbursement-Karyawan.git
```

### 📦 Backend

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

# Default users (pass: 123456) & roles seeder:
# superadmin@example.com (role: superadmin)
# admin@example.com (role: admin)
# manager@example.com (role: manager)
# employee@example.com (role: employee)

# Default categories:
# Transportasi, Kesehatan, Makan
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

Run:
```bash
php artisan serve
# default: http://localhost:8000
```

Mail queue:
```bash
php artisan queue:work
```

### 📦 Frontend

```bash
cd Sistem-Manajemen-Reimbursement-Karyawan/frontend
```

Install dependencies
```bash
npm install
```

Run the development server
```bash
npm run dev
# or yarn dev
```

Salin file environment dan sesuaikan
```bash
cp .env.example .env
```