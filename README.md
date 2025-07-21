![App Icon](https://raw.githubusercontent.com/anjarmath/riset-unik/refs/heads/master/web/public/icon.svg)

# 🔍 RisetUnik — Biar ide penelitianmu nggak pasaran.

**RisetUnik** adalah aplikasi web yang membantu mahasiswa dan peneliti untuk menilai seberapa _unik_ topik penelitian mereka berdasarkan kemiripan terhadap judul-judul jurnal dari berbagai sumber bereputasi seperti DOAJ dan Semantic Scholar.

> 💡 Cocok untuk kamu yang ingin tahu apakah ide skripsimu sudah terlalu pasaran atau justru terlalu langka!

---

## ✨ Fitur Utama

- 🎯 **Analisis Keunikan Topik** dengan Sentence Transformers
- 🔎 **Pencarian Judul Paper** otomatis dari DOAJ & Semantic Scholar (max 20 hasil per sumber)
- 📊 **Skor Similarity** dengan visualisasi menarik
- 🟢 **Evaluasi Level Keunikan** (dari terlalu unik hingga terlalu mirip)
- 🚀 **Cepat dan ringan**, cocok untuk digunakan sebagai tools pendamping proposal

---

## 🖼️ Screenshot

> ![Screenshot](https://raw.githubusercontent.com/anjarmath/riset-unik/refs/heads/master/ss.png)

---

## 🛠️ Teknologi yang Digunakan

| Komponen    | Teknologi                                                         |
| ----------- | ----------------------------------------------------------------- |
| Frontend    | [Next.js](https://nextjs.org/) + [ShadCN](https://ui.shadcn.com/) |
| Backend     | [FastAPI](https://fastapi.tiangolo.com/)                          |
| ML Model    | [sentence-transformers](https://www.sbert.net/)                   |
| API Sources | DOAJ, Semantic Scholar                                            |

---

## 🚀 Instruction (Dev Mode)

### 🔧 Backend

- For Linux:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
.venv/bin/python -m uvicorn main:app --reload
```

- For Windows:

```bash
python -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
.venv/bin/python -m uvicorn main:app --reload
```

### 🔧 Frontend

```bash
cd web
npm install
npm run dev
```
