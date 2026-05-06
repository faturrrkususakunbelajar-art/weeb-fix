// Data Menu Kedai Paturr
const daftarMenu = [
    { id: 1, nama: "Kopi Susu Paturr", harga: 15000, foto: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400" },
    { id: 2, nama: "Burger Digital XL", harga: 35000, foto: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
    { id: 3, nama: "Dimsum Cloud (5pcs)", harga: 20000, foto: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400" },
    { id: 4, nama: "Kentang Goreng WiFi", harga: 12000, foto: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
    { id: 5, nama: "Jasa Pembuatan Web", harga: 500000, foto: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" }
];

let keranjang = [];

// Fungsi Menampilkan Semua Menu
function tampilkanMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = daftarMenu.map(menu => `
        <div class="card">
            <img src="${menu.foto}" alt="${menu.nama}">
            <div class="card-info">
                <h3>${menu.nama}</h3>
                <p class="price">Rp ${menu.harga.toLocaleString('id-ID')}</p>
                <button class="btn-add" onclick="tambahKeKeranjang(${menu.id})">Tambah ke Keranjang</button>
            </div>
        </div>
    `).join('');
}

// Tambah Produk
function tambahKeKeranjang(id) {
    const item = daftarMenu.find(m => m.id === id);
    keranjang.push(item);
    updateKeranjangUI();
}

// Update Tampilan Keranjang
function updateKeranjangUI() {
    document.getElementById('cart-count').innerText = keranjang.length;
    const itemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    
    itemsContainer.innerHTML = keranjang.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
            <span>${item.nama}</span>
            <span>Rp ${item.harga.toLocaleString('id-ID')}</span>
        </div>
    `).join('');

    const total = keranjang.reduce((sum, item) => sum + item.harga, 0);
    totalPriceEl.innerText = total.toLocaleString('id-ID');
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// Fungsi Kirim WhatsApp
function kirimWA() {
    if (keranjang.length === 0) return alert("Keranjang masih kosong!");

    const nomorWA = "6285743473837"; // Nomor tujuan
    let pesan = "Halo Kedai Paturr, saya ingin pesan:%0A%0A";
    
    keranjang.forEach((item, index) => {
        pesan += `${index + 1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}%0A`;
    });

    const total = keranjang.reduce((sum, item) => sum + item.harga, 0);
    pesan += `%0A*Total: Rp ${total.toLocaleString('id-ID')}*`;
    
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
}

// Jalankan fungsi saat web dimuat
tampilkanMenu();
