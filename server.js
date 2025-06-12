const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Impor Mongoose

const app = express();
const PORT = process.env.PORT || 3005; // Port untuk backend

// Koneksi ke MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding_invitation'; // Ganti dengan URI MongoDB Anda

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Terhubung ke MongoDB'))
    .catch(err => console.error('Gagal terhubung ke MongoDB', err));

// Definisikan Skema Mongoose
const guestEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    attendance: {
        type: String,
        enum: ['hadir', 'tidak_hadir'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    invitationId: {
        type: String,
        required: true,
        index: true // Tambahkan indeks untuk performa kueri yang lebih baik
    }
});

// Buat Model dari Skema
const GuestEntry = mongoose.model('GuestEntry', guestEntrySchema);

// Middleware
app.use(cors()); // Mengizinkan CORS untuk pengembangan frontend
app.use(bodyParser.json()); // Untuk mengurai JSON dari body request

// Data sementara (gunakan database di produksi) - Dihapus
// let guestEntries = [];

// Endpoint untuk mendapatkan semua entri buku tamu
app.get('/api/invitations/:invitationId/guestbook', async (req, res) => {
    try {
        const { invitationId } = req.params; // Ambil invitationId dari parameter URL
        const entries = await GuestEntry.find({ invitationId }).sort({ timestamp: -1 }); // Filter berdasarkan invitationId
        res.status(200).json(entries);
    } catch (error) {
        console.error('Gagal mengambil entri buku tamu:', error);
        res.status(500).json({ error: 'Gagal mengambil entri buku tamu.' });
    }
});

// Endpoint untuk menambahkan entri buku tamu baru
app.post('/api/invitations/:invitationId/guestbook', async (req, res) => {
    const { invitationId } = req.params; // Ambil invitationId dari parameter URL
    const { name, message, attendance } = req.body;

    if (!name || !message || !attendance) {
        return res.status(400).json({ error: 'Nama, pesan, dan kehadiran diperlukan.' });
    }

    try {
        const newEntry = new GuestEntry({
            name,
            message,
            attendance,
            invitationId, // Tambahkan invitationId
        });

        const savedEntry = await newEntry.save(); // Simpan ke MongoDB
        res.status(201).json(savedEntry);
    } catch (error) {
        console.error('Gagal menyimpan entri buku tamu:', error);
        res.status(500).json({ error: 'Gagal menyimpan entri buku tamu.' });
    }
});

// Mulai server
app.listen(PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${PORT}`);
    console.log(`Endpoint GET: http://localhost:${PORT}/api/guestbook`);
    console.log(`Endpoint POST: http://localhost:${PORT}/api/guestbook`);
}); 