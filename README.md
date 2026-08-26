# WhatsApp Downloader Bot — Termux + GitHub

Panduan menjalankan project WhatsApp Downloader Bot menggunakan GitHub dan Termux.

> **Catatan:** downloader pada project ini adalah adapter kosong. Hubungkan hanya ke sumber/API yang kontennya kamu miliki atau kamu punya izin untuk mengunduh dan mendistribusikannya.

---

## 1. Persyaratan

Siapkan:

- Android
- Termux
- Akun GitHub
- Node.js
- Git
- Nomor WhatsApp untuk bot

Disarankan menggunakan Node.js 24+.

---

## 2. Install paket di Termux

Buka Termux lalu jalankan:

```bash
pkg update && pkg upgrade -y
pkg install git nodejs-lts unzip -y
```

Cek instalasi:

```bash
node -v
npm -v
git --version
```

Jika ketiganya menampilkan versi, berarti sudah siap.

---

## 3. Upload project ke GitHub

Buat repository baru di GitHub, misalnya:

```text
whatsapp-downloader-bot
```

Upload seluruh isi project.

Struktur repository:

```text
whatsapp-downloader-bot/
├── src/
│   ├── index.js
│   ├── config.js
│   ├── bot/
│   ├── commands/
│   ├── services/
│   └── utils/
├── downloads/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### Jangan upload:

```text
.env
auth/
node_modules/
```

Folder `auth/` berisi session WhatsApp dan jangan dibagikan ke GitHub.

---

## 4. Clone repository ke Termux

Ganti `USERNAME` dengan username GitHub kamu:

```bash
git clone https://github.com/USERNAME/whatsapp-downloader-bot.git
```

Masuk ke folder:

```bash
cd whatsapp-downloader-bot
```

Contoh:

```bash
cd whatsapp-downloader-bot
```

---

## 5. Install dependency

Jalankan:

```bash
npm install
```

Tunggu sampai selesai.

---

## 6. Membuat file .env

Salin template:

```bash
cp .env.example .env
```

Edit:

```bash
nano .env
```

Isi contoh:

```env
BOT_NAME=DownloaderBot
PREFIX=!
OWNER_NUMBER=628xxxxxxxxxx
MAX_FILE_MB=50
DOWNLOAD_DIR=downloads
AUTO_DELETE_MINUTES=10
```

Ganti:

```text
628xxxxxxxxxx
```

dengan nomor WhatsApp kamu.

Simpan nano:

```text
CTRL + O
Enter
CTRL + X
```

---

## 7. Menjalankan bot

Jalankan:

```bash
npm start
```

Jika berhasil, terminal akan menjalankan bot dan menampilkan QR WhatsApp.

Contoh:

```text
🚀 Starting WhatsApp Downloader Bot...
```

Scan QR menggunakan:

```text
WhatsApp
→ Perangkat tertaut
→ Tautkan perangkat
→ Scan QR
```

Jika berhasil:

```text
✅ WhatsApp bot tersambung.
```

---

## 8. Menguji bot

Kirim pesan ke WhatsApp bot:

```text
!ping
```

Bot akan membalas:

```text
🏓 Pong!
```

Untuk melihat menu:

```text
!menu
```

Menu:

```text
╭───「 DOWNLOAD BOT 」───
│
│ 🔎 !search <judul>
│ 📖 !detail <id>
│ 📥 !download <url>
│ ℹ️ !ping
│
╰──────────────────────
```

---

## 9. Menjalankan bot menggunakan PM2

Agar bot lebih mudah dikelola, install PM2:

```bash
npm install -g pm2
```

Jalankan:

```bash
pm2 start src/index.js --name wa-bot
```

Cek status:

```bash
pm2 status
```

Melihat log:

```bash
pm2 logs wa-bot
```

Restart:

```bash
pm2 restart wa-bot
```

Stop:

```bash
pm2 stop wa-bot
```

Hapus dari PM2:

```bash
pm2 delete wa-bot
```

---

## 10. Jika bot tidak tersambung

Hentikan bot:

```bash
pm2 stop wa-bot
```

atau jika menjalankan langsung:

```text
CTRL + C
```

Hapus session:

```bash
rm -rf auth
```

Jalankan kembali:

```bash
npm start
```

Scan QR baru.

---

## 11. Update project dari GitHub

Jika kamu mengubah kode di GitHub:

```bash
cd whatsapp-downloader-bot
git pull
```

Kemudian install dependency jika ada perubahan:

```bash
npm install
```

Restart bot:

```bash
pm2 restart wa-bot
```

---

## 12. Troubleshooting npm

Jika dependency bermasalah:

```bash
rm -rf node_modules package-lock.json
npm install
```

Kemudian:

```bash
npm start
```

---

## 13. Troubleshooting permission Termux

Jika diperlukan:

```bash
termux-setup-storage
```

Berikan izin storage ketika diminta.

---

## 14. Struktur kerja bot

```text
WhatsApp
    │
    ▼
Baileys
    │
    ▼
Message Handler
    │
    ├── !menu
    ├── !ping
    ├── !search
    ├── !detail
    └── !download
             │
             ▼
      Downloader Adapter
             │
             ▼
      File hasil download
             │
             ▼
          WhatsApp
```

---

## 15. Mengatur downloader

File utama:

```text
src/services/downloader.js
```

File tersebut merupakan adapter.

Saat ini adapter tidak melakukan scraping atau download dari Doujindesu.

Untuk mengaktifkan downloader, gunakan API/sumber yang:

- kamu miliki,
- kamu kelola,
- atau memberikan izin untuk download dan redistribusi konten.

---

## 16. File penting

### `src/index.js`

Entry point bot.

### `src/bot/connection.js`

Mengatur koneksi WhatsApp dan session.

### `src/bot/messageHandler.js`

Mengatur pesan dan command.

### `src/commands/menu.js`

Menu bot.

### `src/commands/search.js`

Command pencarian.

### `src/commands/detail.js`

Command detail.

### `src/commands/download.js`

Command download.

### `src/services/downloader.js`

Tempat adapter downloader.

### `.env`

Konfigurasi bot.

### `auth/`

Session WhatsApp. Jangan upload ke GitHub.

### `downloads/`

Tempat file sementara hasil download.

---

## 17. Command lengkap

```text
!menu
```

Menampilkan menu.

```text
!ping
```

Tes koneksi bot.

```text
!search <judul>
```

Mencari konten melalui adapter.

```text
!detail <id>
```

Menampilkan detail.

```text
!download <url>
```

Memulai download melalui adapter yang dikonfigurasi.

---

## 18. Menjalankan kembali setelah HP restart

Masuk ke project:

```bash
cd whatsapp-downloader-bot
```

Kemudian:

```bash
pm2 start src/index.js --name wa-bot
```

Cek:

```bash
pm2 status
```

Jika session `auth/` masih ada, biasanya bot dapat menggunakan session tersebut tanpa QR baru.

---

## 19. Perintah cepat

Install:

```bash
pkg update && pkg upgrade -y
pkg install git nodejs-lts unzip -y
```

Clone:

```bash
git clone https://github.com/USERNAME/whatsapp-downloader-bot.git
cd whatsapp-downloader-bot
```

Install:

```bash
npm install
```

Konfigurasi:

```bash
cp .env.example .env
nano .env
```

Jalankan:

```bash
npm start
```

Atau PM2:

```bash
npm install -g pm2
pm2 start src/index.js --name wa-bot
pm2 logs wa-bot
```

---

## 20. Keamanan

Jangan pernah meng-upload:

```text
.env
auth/
node_modules/
```

Pastikan `.gitignore` berisi:

```gitignore
node_modules/
.env
auth/
downloads/*
!downloads/.gitkeep
*.log
```

Jika session WhatsApp sampai tersebar, hapus session tersebut dan tautkan perangkat kembali.

---

## Lisensi & penggunaan

Project ini adalah template bot WhatsApp. Pastikan penggunaan downloader mematuhi hak cipta, ketentuan layanan sumber, dan hukum yang berlaku.

