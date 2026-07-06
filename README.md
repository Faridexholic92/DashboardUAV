# UAV Ops Console — Dashboard Kemajuan UAV

Dashboard analitik (Next.js 14 App Router + TypeScript) untuk memantau
checklist pemprosesan data UAV berdasarkan
`Template_Profesional_Pemprosesan_UAV.xlsx`.

## Ciri-ciri

- **Bento analytics UI** — tema dark navy, aurora mesh gradient + kad kaca (glassmorphism)
- **Hero card** — peratus kemajuan keseluruhan, fasa aktif, tugasan tertangguh
- **KPI tiles** — jumlah tugasan, selesai, dalam tindakan, tertangguh
- **Donut status** + **carta bar mengikut fasa** (SVG/CSS tulen, tiada lib carta)
- **Feed aktiviti** — tugasan aktif / baru selesai
- **Jadual senarai semak** — tapis fasa (chips), status, dan carian teks
- **Import Excel/CSV client-side** — klik atau drag & drop; data diproses
  sepenuhnya dalam browser (tiada upload ke server)

## Mula

```bash
npm install
npm run dev
# buka http://localhost:3000
```

## Format import

Gunakan templat asal (sheet `Checklist UAV`) atau mana-mana fail `.xlsx` /
`.csv` dengan lajur berikut (header dikesan secara automatik):

| Lajur | Nota |
| --- | --- |
| Bil | Kosong = sub-item aktiviti di atasnya |
| Fasa | Diwarisi dari baris sebelumnya jika kosong |
| Aktiviti | Wajib — baris tanpa aktiviti diabaikan |
| Status | `Selesai`, `Dalam Tindakan`, `Belum Mula`, `Tertangguh` (sinonim biasa dikesan; kosong = Belum Mula) |
| Tarikh Mula / Tarikh Siap / Tempoh Masa / Pegawai / Catatan | Pilihan |

## Nota

- Data lalai dalam `lib/data.ts` ialah **data demo** (status/tarikh contoh)
  supaya carta kelihatan hidup. Import fail sebenar untuk menggantikannya.
- Styling guna vanilla CSS (`app/globals.css`) dengan design tokens — tiada
  Tailwind diperlukan, mudah untuk ubah tema.
- `xlsx` (SheetJS) dimuat secara dynamic import hanya bila import Excel dibuat.
