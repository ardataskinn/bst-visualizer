# BST Görselleştirici

Binary Search Tree (BST) görselleştirme web uygulaması. Sonsuz derinlikte ağaçlar oluşturabilir, zoom ve pan yapabilirsiniz.

## Özellikler

- ✅ **Sonsuz Derinlik**: BST'ler sınırsız seviyeye kadar büyüyebilir
- ✅ **Zoom & Pan**: Mouse wheel ile zoom, drag ile pan yapabilirsiniz
- ✅ **Siyah Kareli Arkaplan**: Grid pattern arkaplan
- ✅ **Beyaz Işıklı Nodelar**: Nodelar beyaz glow efekti ile gösterilir
- ✅ **Çok Fazla Node**: Yüzlerce node'u sorunsuz görselleştirebilir
- ✅ **Rastgele Node Ekleme**: Tek tıkla 20, 50 veya 100 node ekleyebilirsiniz
- ✅ **Touch Desteği**: Mobil cihazlarda da çalışır

## Kullanım

1. `index.html` dosyasını bir web tarayıcısında açın
2. Değer girin ve "Ekle" butonuna tıklayın
3. Mouse wheel ile zoom yapın
4. Mouse ile sürükleyerek ağacı hareket ettirin
5. "Rastgele Node" butonları ile hızlıca büyük ağaçlar oluşturun

## Kontroller

- **Ekle**: Değer giriş alanına sayı yazıp "Ekle" butonuna tıklayın
- **Sil**: Değer giriş alanına silmek istediğiniz sayıyı yazıp "Sil" butonuna tıklayın
- **Temizle**: Tüm ağacı siler
- **Zoom**: Mouse wheel veya +/- butonları
- **Pan**: Mouse ile sürükleme
- **Sıfırla**: Görünümü varsayılan pozisyona getirir

## Teknik Detaylar

- **Canvas API**: Yüksek performanslı çizim için HTML5 Canvas kullanıldı
- **BST Algoritması**: Standart Binary Search Tree insert/remove işlemleri
- **Transform Matrix**: Zoom ve pan için canvas transform kullanıldı
- **Responsive**: Farklı ekran boyutlarına uyumlu

## Dosya Yapısı

```
bst_visualizer/
├── index.html      # Ana HTML dosyası
├── style.css       # Stil dosyası
├── bst.js          # BST algoritması ve görselleştirme kodu
└── README.md       # Bu dosya
```


