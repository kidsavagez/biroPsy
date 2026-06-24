# Harmoni Psikologi — Project Blueprint & Workflow

> Dokumen ini mencatat proses requirement gathering, keputusan desain, dan blueprint teknis lengkap sebelum pembangunan dimulai.

---

## 1. Requirements Gathering — Pertanyaan Awal

Sebelum memulai pembangunan, berikut pertanyaan yang diajukan beserta jawaban klien:

---

### Pertanyaan 1 — Company Basics

| Pertanyaan | Jawaban Klien |
|---|---|
| Nama perusahaan, tagline, deskripsi singkat? | *Dibebaskan ke developer (untuk pitch)* |
| Kota/negara? (timezone, bahasa, format tanggal) | *Dibebaskan ke developer* |
| Sudah ada logo & brand color, atau butuh saran? | *Dibebaskan ke developer* |
| Bahasa situs? (Indonesia saja, bilingual, dll.) | *Dibebaskan ke developer* |

**Keputusan developer:**
- Nama: **Harmoni Psikologi**
- Tagline: *"Perjalanan Menuju Kesehatan Mental Anda Dimulai di Sini"*
- Lokasi: Jakarta Selatan (placeholder)
- Bahasa: Bilingual ID/EN (toggle)
- Color palette: Sage green + warm cream

---

### Pertanyaan 2 — Therapists

| Pertanyaan | Jawaban Klien |
|---|---|
| Berapa jumlah terapis? | **7 terapis** |
| Info apa yang ditampilkan per terapis? | Developer buat profil lengkap |
| Siapa yang atur ketersediaan jadwal? | Admin kelola semua |

**7 Terapis yang Dibuat:**

| # | Nama | Spesialisasi | Mode |
|---|---|---|---|
| 1 | Dr. Anisa Putri, M.Psi | Kecemasan & Depresi | Online + Offline |
| 2 | Budi Santoso, M.Psi | Trauma & PTSD | Offline only |
| 3 | Dr. Citra Dewi, Ph.D | Pasangan & Hubungan | Online + Offline |
| 4 | Dian Rahayu, M.Psi | Anak & Remaja | Offline only |
| 5 | Eko Prasetyo, M.Psi | Stres Kerja & Burnout | Online + Offline |
| 6 | Fitri Handayani, M.Psi | Gangguan Makan & Body Image | Online + Offline |
| 7 | Dr. Gunawan Saputra, Ph.D | Terapi Keluarga | Online + Offline |

---

### Pertanyaan 3 — Booking System

| Pertanyaan | Jawaban Klien |
|---|---|
| Tipe sesi: online, offline, atau keduanya? | **Keduanya** |
| Pilihan durasi sesi? | **60 menit = Rp 90.000 / 90 menit = Rp 120.000 / 120 menit = Rp 200.000** |
| Pembayaran online atau offline? | **Keduanya** — online via Midtrans (placeholder), offline bayar tunai |
| Kirim konfirmasi/reminder ke klien? | **Ya** |
| Tambah ke kalender otomatis setelah booking? | **Ya** |

---

### Pertanyaan 4 — Notifications & Data

| Pertanyaan | Jawaban Klien |
|---|---|
| Telegram: notify siapa? | **Keduanya** — admin group + terapis individual |
| Data apa yang masuk ke Google Sheets? | Developer tentukan (bisa diedit nanti) |
| Ada form intake singkat saat booking? | **Ya** |

**Data yang Dicatat ke Google Sheets:**
`ID Booking, Nama, Email, Telepon, WhatsApp, Terapis, Mode Sesi, Durasi, Harga, Tanggal, Waktu, Metode Bayar, Status, Alasan, Catatan, Waktu Booking`

---

### Pertanyaan 5 — Tech & Hosting

| Pertanyaan | Jawaban Klien |
|---|---|
| Preferensi framework? | Dibebaskan ke developer |
| Hosting? | **Vercel** untuk pitch, bisa migrasi nanti |
| Domain? | Belum ada (gunakan domain Vercel untuk pitch) |

---

### Saran Developer (Sebelum Membangun)

1. **Stack yang direkomendasikan:** Next.js + Tailwind CSS + shadcn/ui → clean, fast, Vercel-native
2. **Availability management:** Admin input slot tersedia manual di Google Sheets yang dibaca oleh sistem
3. **Double-booking prevention:** Slot yang sudah dipesan otomatis ditandai di Sheets. Race condition aman untuk skala klinik kecil
4. **Data sensitif kesehatan mental:** Tambahkan privacy notice, minimalisir data yang disimpan
5. **Mobile-first design:** Mayoritas user booking dari HP

---

## 2. Full Blueprint

### Company Identity (Developer Choice)

```
Nama         : Harmoni Psikologi
Tagline      : Perjalanan Menuju Kesehatan Mental Anda Dimulai di Sini
Lokasi       : Jl. Sudirman No. 88, Karet Tengsin, Jakarta Selatan
Warna Utama  : Sage Green (#52796F) + Warm Cream (#FAFAF5)
Font         : Geist Sans (modern, clean, professional)
Bahasa       : Bahasa Indonesia (utama) + English (toggle)
```

---

### Tech Stack

| Layer | Tool | Alasan |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript | SEO-friendly, fast, Vercel-native |
| Styling | Tailwind CSS v4 + shadcn/ui (base-ui) | Clean UI, maintainable |
| Animasi | Framer Motion | Smooth micro-animations |
| Database | Google Sheets API | Client-requested, mudah dikelola |
| Notifikasi | Telegram Bot API | Instan, gratis |
| Email | Resend | Transactional email terpercaya |
| Reminder | Vercel Cron Jobs | 24 jam sebelum sesi |
| Pembayaran | Midtrans (placeholder) | Siap aktifkan dengan real keys |
| Kalender | Google Calendar link + .ics file | Tanpa OAuth, works for everyone |
| Hosting | Vercel | Zero-config, free untuk pitch |

---

### Page Architecture

```
/  (Landing Page)
├── Navbar              — Logo, nav links, "Buat Janji" CTA, language toggle
├── Hero                — Headline, subtext, 2 CTA, floating cards, trust badges
├── Stats Bar           — 500+ Klien | 7 Spesialis | 3 Tahun | 98% Kepuasan
├── About               — Cerita perusahaan, misi, nilai-nilai (4 cards)
├── How It Works        — 3 langkah visual dengan ikon
├── Services            — 7 kartu spesialisasi + 1 CTA card
├── Therapists          — Filter by spec → Grid kartu terapis → "Buat Janji"
├── Pricing             — 3 durasi + tabel fitur + metode pembayaran
├── Testimonials        — Carousel 6 ulasan klien (anonim)
├── FAQ                 — Accordion 7 pertanyaan umum
├── Contact             — Info kontak, peta, WhatsApp CTA
└── Footer              — Links, sosial media, hotline darurat jiwa

/booking               (Booking Page — full page wizard)
└── 5-step wizard

/booking/confirmation  (Post-booking summary page)
```

---

### Booking Flow — 5-Step Wizard

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   STEP 1    │   │   STEP 2    │   │   STEP 3    │   │   STEP 4    │   │   STEP 5    │
│             │   │             │   │             │   │             │   │             │
│  Pilih      │──▶│  Mode &     │──▶│  Pilih      │──▶│  Data       │──▶│  Pembayaran │
│  Terapis    │   │  Durasi     │   │  Jadwal     │   │  Pribadi    │   │  & Konfirm  │
│             │   │             │   │             │   │             │   │             │
│ • Filter by │   │ • Online /  │   │ • Kalender  │   │ • Nama      │   │ • Ringkasan │
│   spesialis │   │   Offline   │   │   picker    │   │ • Email     │   │   booking   │
│ • Grid      │   │ • 60 menit  │   │ • Slot yang │   │ • Telepon   │   │ • Online    │
│   kartu     │   │   Rp 90K    │   │   tersedia  │   │ • WhatsApp  │   │   (Midtrans)│
│   terapis   │   │ • 90 menit  │   │ • Slot sudah│   │ • Alasan    │   │ • Offline   │
│ • Pilih 1   │   │   Rp 120K   │   │   dipesan   │   │   kunjungan │   │   (tunai)   │
│   terapis   │   │ • 120 menit │   │   dicoret   │   │ • Catatan   │   │ • Persetuj- │
│             │   │   Rp 200K   │   │             │   │   tambahan  │   │   uan ToS   │
└─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘
```

---

### Data Flow — Setelah Booking Dikirim

```
User Submit Form
        │
        ▼
API Route: /api/booking (POST)
        │
        ▼
Validasi Data (therapistId, mode, durasi, tanggal, waktu, info klien)
        │
        ▼
Cek Ketersediaan Slot di Google Sheets (BlockedSlots tab)
        │
    ┌───┴──────────────────┐
  DIAMBIL                TERSEDIA
    │                      │
    ▼                      ▼
Return 409              Generate Booking ID (HP-YYYYMMDD-XXXX)
    │                      │
    ▼                      ▼
Tampilkan pesan        Tulis ke Google Sheets (Bookings tab)
error di frontend:           │
"Slot ini baru saja          ├──▶ Telegram: Admin Group
 dipesan. Silakan            │    "🔔 BOOKING BARU MASUK!"
 pilih waktu lain."          │
    │                        ├──▶ Telegram: Terapis Individual
    ▼                        │    "📅 Jadwal Baru untuk [nama]"
Kembali ke Step 3            │
(time picker)                ├──▶ Email Konfirmasi ke Klien
slot tersebut                │    (detail sesi + .ics attachment
grayed out                   │     + Google Calendar link)
                             │
                             └──▶ Jika Pembayaran Online:
                                  Redirect ke Midtrans
                                        │
                                  Payment Success
                                        │
                                  Update Sheets status → "PAID"
                                  Kirim receipt email

─────────────────────────────────────────────────
Vercel Cron (jalan setiap hari pukul 08:00 WIB):
  → Ambil booking yang 24 jam lagi dari Sheets
  → Kirim reminder email ke klien
  → Kirim reminder Telegram ke terapis
```

---

### Google Sheets Structure

**Tab 1 — Bookings**

| Kolom | Deskripsi |
|---|---|
| A — ID | Booking ID unik (HP-YYYYMMDD-XXXX) |
| B — Nama | Nama lengkap klien |
| C — Email | Email klien |
| D — Telepon | Nomor telepon |
| E — WhatsApp | Nomor WhatsApp |
| F — Terapis | Therapist ID |
| G — Mode | online / offline |
| H — Durasi | 60 / 90 / 120 |
| I — Harga | Nominal (Rp) |
| J — Tanggal | YYYY-MM-DD |
| K — Waktu | HH:MM |
| L — Pembayaran | online / offline |
| M — Status | pending / confirmed / paid / cancelled |
| N — Alasan | Alasan kunjungan |
| O — Catatan | Catatan tambahan |
| P — Dibuat | ISO timestamp |

**Tab 2 — BlockedSlots** *(auto-filled saat booking berhasil)*

| Kolom | Deskripsi |
|---|---|
| A — Therapist ID | ID terapis |
| B — Tanggal | YYYY-MM-DD |
| C — Waktu | HH:MM |
| D — Booking ID | Referensi ke Tab 1 |

**Tab 3 — TherapistSchedule** *(admin isi manual untuk atur ketersediaan)*

| Kolom | Deskripsi |
|---|---|
| A — Therapist ID | ID terapis |
| B — Hari | Senin / Selasa / ... |
| C — Jam Mulai | HH:MM |
| D — Jam Selesai | HH:MM |
| E — Aktif | TRUE / FALSE |

---

### Folder Structure

```
biro-psy/
├── app/
│   ├── globals.css                     ← Custom color palette (sage green theme)
│   ├── layout.tsx                      ← Root layout + Toaster
│   ├── page.tsx                        ← Landing page (semua section)
│   ├── booking/
│   │   ├── page.tsx                    ← Booking wizard page
│   │   └── confirmation/
│   │       └── page.tsx                ← Post-booking confirmation
│   └── api/
│       ├── availability/route.ts       ← GET: cek slot tersedia
│       ├── booking/route.ts            ← POST: buat booking
│       ├── reminder/route.ts           ← GET: cron reminder (secured)
│       └── payment/
│           └── midtrans/route.ts       ← POST: webhook Midtrans
│
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx                  ← Fixed navbar + mobile menu
│   │   ├── Hero.tsx                    ← Full-screen hero + floating cards
│   │   ├── Stats.tsx                   ← Animated counter bar
│   │   ├── About.tsx                   ← Company story + values grid
│   │   ├── HowItWorks.tsx              ← 3-step visual
│   │   ├── Services.tsx                ← 7 service cards + CTA card
│   │   ├── Therapists.tsx              ← Filtered therapist grid
│   │   ├── Pricing.tsx                 ← 3 duration tiers + payment info
│   │   ├── Testimonials.tsx            ← Embla carousel testimonials
│   │   ├── FAQ.tsx                     ← Accordion FAQ
│   │   ├── Contact.tsx                 ← Info + Google Maps + WhatsApp
│   │   └── Footer.tsx                  ← Dark footer + emergency hotline
│   ├── booking/
│   │   ├── BookingWizard.tsx           ← Main wizard controller + progress bar
│   │   └── steps/
│   │       ├── Step1Therapist.tsx      ← Filter + therapist grid selection
│   │       ├── Step2Session.tsx        ← Mode toggle + duration cards
│   │       ├── Step3DateTime.tsx       ← Calendar + time slot grid
│   │       ├── Step4Info.tsx           ← Form with zod validation
│   │       └── Step5Payment.tsx        ← Summary + payment choice + confirm
│   └── ui/                             ← shadcn/ui components (base-ui)
│
├── lib/
│   ├── google-sheets.ts                ← Sheets API: buat, cek, update booking
│   ├── telegram.ts                     ← Bot: notif admin, terapis, reminder
│   ├── resend.ts                       ← Email: konfirmasi + reminder (HTML)
│   ├── calendar.ts                     ← Generate .ics + Google Calendar URL
│   ├── midtrans.ts                     ← Buat transaksi + verifikasi signature
│   └── utils.ts                        ← cn() helper
│
├── data/
│   └── therapists.ts                   ← 7 profil terapis + getTherapistById()
│
├── types/
│   └── index.ts                        ← Semua TypeScript types + konstanta harga
│
├── vercel.json                         ← Cron job: /api/reminder setiap 08:00
└── .env.example                        ← Template semua environment variables
```

---

### Confirmation Email Content

Email yang dikirim ke klien setelah booking berhasil berisi:

- ✅ Booking ID
- 👤 Nama + kredensial terapis
- 📅 Tanggal, waktu, durasi, mode sesi
- 💰 Harga + status pembayaran
- 📍 Lokasi (jika offline) / info link meeting (jika online)
- 📆 Tombol "Tambah ke Google Calendar"
- 📎 File .ics sebagai attachment (auto-add ke semua kalender apps)
- ℹ️ Instruksi pembatalan/reschedule

---

### Notification Telegram — Format Pesan

**Booking Baru (ke Admin & Terapis):**
```
🔔 BOOKING BARU MASUK!

📋 ID Booking: HP-20250815-A3B2
👤 Klien: Nama Klien
📧 Email: klien@email.com
📱 Telepon: 081234567890
💬 WhatsApp: 081234567890

🧠 Terapis: Dr. Anisa Putri, M.Psi
📌 Mode: 🖥 Online
⏱ Durasi: 90 menit
💰 Harga: Rp 120.000

📅 Tanggal: 2025-08-15
🕐 Waktu: 10:00 WIB
💳 Pembayaran: 💳 Online (Midtrans)

📝 Alasan: [alasan klien]
📒 Catatan: -
```

**Reminder 24 Jam (ke Admin & Terapis):**
```
⏰ PENGINGAT SESI — 24 JAM LAGI

📋 ID: HP-20250815-A3B2
👤 Klien: Nama Klien
📱 WA: 081234567890
🧠 Terapis: Dr. Anisa Putri, M.Psi
📅 Tanggal: 2025-08-15 pukul 10:00 WIB
⏱ Durasi: 90 menit
```

---

### Environment Variables

```bash
# Google Sheets
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SPREADSHEET_ID=

# Telegram
TELEGRAM_BOT_TOKEN=
TELEGRAM_ADMIN_CHAT_ID=
TELEGRAM_THERAPIST_1_CHAT_ID=   # Dr. Anisa Putri
TELEGRAM_THERAPIST_2_CHAT_ID=   # Budi Santoso
TELEGRAM_THERAPIST_3_CHAT_ID=   # Dr. Citra Dewi
TELEGRAM_THERAPIST_4_CHAT_ID=   # Dian Rahayu
TELEGRAM_THERAPIST_5_CHAT_ID=   # Eko Prasetyo
TELEGRAM_THERAPIST_6_CHAT_ID=   # Fitri Handayani
TELEGRAM_THERAPIST_7_CHAT_ID=   # Dr. Gunawan Saputra

# Email
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_FROM_NAME=

# Payment
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=

# App
NEXT_PUBLIC_APP_URL=
CRON_SECRET=
```

---

### Pricing & Session Info

| Durasi | Harga | Cocok untuk |
|---|---|---|
| 60 menit | Rp 90.000 | Isu spesifik, sesi terfokus |
| 90 menit | Rp 120.000 ⭐ *Paling Populer* | Eksplorasi mendalam (standar) |
| 120 menit | Rp 200.000 | Sesi intensif komprehensif |

**Metode Pembayaran:**
- 💳 Online via Midtrans (transfer bank, kartu kredit, GoPay, OVO, DANA, dll.)
- 💵 Bayar tunai saat/setelah sesi (untuk online & offline)

---

### Integration Activation Checklist

Setelah pitch disetujui klien, aktifkan integrasi dengan langkah berikut:

- [ ] Buat Google Cloud Project → aktifkan Sheets API → buat Service Account → copy credentials ke `.env`
- [ ] Buat Google Spreadsheet dengan 3 tab (Bookings, BlockedSlots, TherapistSchedule) → copy Spreadsheet ID
- [ ] Buat Telegram Bot via @BotFather → copy token → tambahkan bot ke grup admin → dapatkan chat IDs semua terapis
- [ ] Daftar Resend.com → verify domain email → copy API key
- [ ] Daftar Midtrans → aktifkan sandbox → copy server key + client key → setelah live, ganti ke production keys
- [ ] Deploy ke Vercel → tambahkan semua env vars di dashboard Vercel → Vercel Cron otomatis aktif via `vercel.json`
- [ ] Test end-to-end: booking → cek Sheets → cek Telegram → cek email

---

*Dokumen ini dibuat sebagai bagian dari proses pitch kepada klien. Semua data terapis, nama, dan detail lokasi bersifat placeholder dan dapat disesuaikan.*
