function sesiCal(){
    var ses = document.getElementById("Senmalsin");
    ses.currentTime = 0;
    ses.play();
}
function sesiCal1(){
    var ses = document.getElementById("mj");
    ses.currentTime = 0;
    ses.play();
}
function sesiCal2(){
    var ses = document.getElementById("yetersiz");
    ses.currentTime = 0;
    ses.play();
}
function sesiCal3(){
    var ses = document.getElementById("dbgg");
    ses.currentTime = 0;
    ses.play();
}
function sesiCal4(){
    var ses = document.getElementById("iki");
    ses.currentTime = 0;
    ses.play();
}
function sesiCal5(){
    var ses = document.getElementById("degirmen");
    ses.currentTime = 0;
    ses.play();
}
function sesiCal6(){
    var ses = document.getElementById("mj2");
    ses.currentTime = 0;
    ses.play();
}

// Sayfa açıldığında Firebase'den kayıtlı butonları çek
window.onload = function() {
    kayitliButonlariYukle();
};

async function yeniButonEkle() {
    let ad = document.getElementById('butonAdi').value;
    // Şimdilik ses dosyası yerine direkt ses linki (URL) alalım ki herkes dinleyebilsin
    let sesUrl = prompt("Lütfen sesin internet linkini (URL) yapıştır (örn: .mp3 biten bir link):");

    if (!ad || !sesUrl) {
        alert("Lütfen buton adı ve ses linki gir!");
        return;
    }

    try {
        // Firebase Firestore'a kaydet
        const docRef = await window.addDoc(window.collection(window.db, "sesler"), {
            isim: ad,
            url: sesUrl
        });
        
        console.log("Veri Firebase'e yazıldı!");
        
        // Ekrana butonu ekle
        butonOlusturDOM(ad, sesUrl);

        // Formu temizle
        document.getElementById('butonAdi').value = '';
        alert("Buton başarıyla eklendi ve Firebase'e kaydedildi!");
    } catch (e) {
        console.error("Hata oluştu: ", e);
        alert("Kaydedilirken bir hata oldu.");
    }
}

function butonOlusturDOM(ad, sesUrl) {
    let tutucu = document.querySelector('.tutucu');
    
    let btn = document.createElement('button');
    btn.className = 'btn1';
    btn.innerText = ad;
    
    // Tıklandığında sesi çalsın
    btn.onclick = function() {
        let audio = new Audio(sesUrl);
        audio.currentTime = 0;
        audio.play();
    };

    tutucu.appendChild(btn);
}

async function kayitliButonlariYukle() {
    try {
        const querySnapshot = await window.getDocs(window.collection(window.db, "sesler"));
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            butonOlusturDOM(data.isim, data.url);
        });
    } catch (e) {
        console.error("Veriler yüklenirken hata:", e);
    }
}
