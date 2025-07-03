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
- React (tailadmin template)
- TypeScript
- Vite
- Tailwind CSS
- Axios

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
```

```bash
# Default users (pass: 123456) & roles seeder:
# superadmin@example.com (role: superadmin)
# admin@example.com (role: admin)
# manager@example.com (role: manager)
# employee@example.com (role: employee)

# Default categories:
# Transportasi, Kesehatan, Makan
```

✉️ Konfigurasi Email ([Mailtrap](https://mailtrap.io/)) Set di .env:
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

Salin file environment dan sesuaikan
```bash
cp .env.example .env
```

Run the development server
```bash
npm run dev
# default: http://localhost:5173
```

---

### Postman 
[sistem_manajemen_reimbursement.postman_collection.json](https://github.com/qadrima/Sistem-Manajemen-Reimbursement-Karyawan/blob/main/sistem_manajemen_reimbursement.postman_collection.json)

Berikut adalah daftar request yang tersedia dalam koleksi Postman:

*   **Category**
    *   Get Categories (`GET {{baseUrl}}/api/categories`)
    *   Create Category (`POST {{baseUrl}}/api/categories`)
    *   Update Category (`PUT {{baseUrl}}/api/categories/:id`)
    *   Delete Category (`DELETE {{baseUrl}}/api/categories/:id`)
*   **Reimbursement**
    *   Create Reimbursement (`POST {{baseUrl}}/api/reimbursements`)
    *   Get Reimbursements (`GET {{baseUrl}}/api/reimbursements`)
    *   Delete Reimbursement (`DELETE {{baseUrl}}/api/reimbursements/:id`)
    *   Reject Reimbursement (`POST {{baseUrl}}/api/reimbursements/:id/reject`)
    *   Approve Reimbursement (`POST {{baseUrl}}/api/reimbursements/:id/approve`)
*   Login (`POST {{baseUrl}}/api/login`)
*   Create User (`POST {{baseUrl}}/api/user`)
*   Get All Users (`GET {{baseUrl}}/api/users`)
*   Get Roles Permissions (`GET {{baseUrl}}/api/roles`)
*   Assign Role (`POST {{baseUrl}}/api/user/:id/assign-role`)
*   Activity Logs (`GET {{baseUrl}}/api/activity-logs`)

Note: Replace `:id` with the actual ID of the category or reimbursement.

---

### Arsitektur Solusi
Aplikasi ini menggunakan arsitektur client-server. Frontend (React + Vite) berkomunikasi dengan backend (Laravel REST API) menggunakan HTTP (Axios). 

Alur data:
User melakukan request dari frontend (misal: login, pengajuan reimbursement).
Frontend mengirim data ke endpoint backend (API Laravel).
Backend memproses, melakukan validasi, menyimpan/mengambil data dari database, lalu mengembalikan response (JSON).
Frontend menampilkan hasil ke user.

[User] ⇄ [Frontend (React)] ⇄ [Backend (Laravel API)] ⇄ [Database]

### Penjelasan Desain
Pemilihan stack: Laravel dipilih untuk backend karena ekosistemnya lengkap (auth, queue, mail, permission, dsb). React dipilih untuk frontend agar UI interaktif dan mudah dikembangkan.

Perhitungan reimbursement: Limit per kategori/bulan diatur di backend. Saat user mengajukan reimbursement, backend akan memvalidasi apakah total pengajuan bulan berjalan melebihi limit kategori. Jika melebihi, pengajuan ditolak.

Integrasi: Semua logika bisnis, validasi, dan perhitungan dilakukan di backend untuk keamanan dan konsistensi data.

### Tantangan & Solusi
Tantangan: Pengiriman email asinkron, perlunya configurasi akun jika menggunakan real email (Gmail).

Solusi: Menggunakan Laravel Queue (driver database) agar email dikirim di background dan menggunakan mailtrap untuk development.

Tantangan: Manajemen role & permission yang fleksibel.

Solusi: Menggunakan package Spatie Laravel Permission untuk pengelolaan role dan hak akses.

Tantangan (Frontend):
- Integrasi autentikasi JWT di React, memastikan token tersimpan aman dan request API selalu menyertakan token.
- Menangani error response dari backend secara user-friendly (misal: validasi gagal, token expired, dsb).
- Menyusun struktur komponen agar mudah dikembangkan dan dipelihara.
- Penggunaan menu & actions (CRUD/approval/reject) yang masih harus disesuaikan dari sisi permissions secara view.

Solusi (Frontend):
- Menggunakan context/provider React untuk manajemen autentikasi dan token.
- Membuat handler global untuk error API dan menampilkan notifikasi ke user.
- Mengorganisasi komponen dan hooks custom agar kode lebih modular dan reusable.
- Perlunya waktu untuk merapihkan struktur penerapan OOP yang baik dari sisi backend maupun frontend