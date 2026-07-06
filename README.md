# UAV Ops Portal

Portal operasi UAV untuk pemprosesan data fotogrametri — dibina dengan Next.js 14 (App Router) dan CSS vanila.

## Ciri-ciri

- **Portal berbilang halaman** — Dashboard, Checklist, Armada, Laporan, Tetapan dengan sidebar navigasi.
- **Log masuk (mod demo)** — sesi disimpan dalam localStorage pelayar sahaja; tiada data dihantar ke server. Untuk produksi, gantikan dengan NextAuth.js / Auth.js atau SSO agensi.
- **Mod gelap & cerah** — togol pada topbar atau melalui Tetapan; pilihan kekal selepas muat semula (tanpa kelipan tema).
- **Data sebenar templat** — 36 tugasan, 8 fasa kerja daripada Template_Profesional_Pemprosesan_UAV. Tiada data olok-olok.
- **Import Excel/CSV** — muat naik fail berformat templat untuk kemas kini penuh; Export CSV disokong.
- **Kemas kini status terus** — klik pill status dalam jadual; perubahan disimpan automatik dalam pelayar.
- **Tema dron** — hero laluan penerbangan, grid GPS, stepper fasa bergaris putus, imbasan radar pada donut.

## Mula

```bash
npm install
npm run dev
```

Buka http://localhost:3000 — anda akan dibawa ke halaman log masuk. Masukkan sebarang emel sah + kata laluan (minimum 4 aksara).

## Struktur

```
app/
  layout.tsx          # Root layout + skrip init tema
  login/page.tsx      # Halaman log masuk
  (portal)/
    layout.tsx        # Shell portal: guard auth, sidebar, topbar
    page.tsx          # Dashboard
    checklist/        # Senarai semak penuh
    armada/           # Armada dron
    laporan/          # Ringkasan & cetak/PDF
    tetapan/          # Tema, profil, data
hooks/useTasks.ts     # Keadaan tugasan dikongsi (localStorage)
lib/                  # auth, theme, data, stats, insights, import/export
components/           # UI: Sidebar, ThemeToggle, HeroCard, TaskTable, dll.
```

## Imej dron

Imej lalai ialah foto dron DJI daripada Wikimedia Commons (lesen Creative Commons). Untuk guna foto sendiri: letak fail dalam `public/` dan tukar nilai `img` dalam `lib/fleet.ts`.

## Deploy

Push ke GitHub, kemudian import repo di Vercel — tiada konfigurasi tambahan diperlukan.
