# WhatsApp Downloader Bot

Bot WhatsApp Node.js dengan:
- QR login / Multi-device session
- !menu
- !ping
- !search
- !detail
- !download
- struktur adapter downloader yang dapat dihubungkan ke sumber legal/berizin

## 1. Install

Pastikan Node.js 24+ terpasang.

```bash
npm install
```

## 2. Konfigurasi

Salin `.env.example` menjadi `.env`, lalu isi:

```env
BOT_NAME=DownloaderBot
PREFIX=!
OWNER_NUMBER=628xxxxxxxxxx
MAX_FILE_MB=50
DOWNLOAD_DIR=downloads
AUTO_DELETE_MINUTES=10
```

## 3. Jalankan

```bash
npm start
```

Scan QR WhatsApp pada terminal.

Session akan tersimpan di folder `auth/`, sehingga setelah login pertama biasanya tidak perlu scan ulang.

## 4. Command

```text
!menu
!ping
!search judul
!detail id
!download https://contoh-url
```

## 5. Downloader adapter

File:

```text
src/services/downloader.js
```

adalah tempat menghubungkan API/sumber downloader yang kamu miliki atau berizin.

Jangan gunakan adapter untuk mengambil atau mendistribusikan materi berhak cipta tanpa izin.

## Troubleshooting

Jika session bermasalah:

1. Matikan bot.
2. Hapus folder `auth/`.
3. Jalankan `npm start`.
4. Scan QR lagi.
