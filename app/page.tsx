import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, parse, isValid } from "date-fns";

// async function sorgulamalariBaslat() {
//   const numbersArray = [
  
// '99746893892',
// '99746806076'

//   ];

//   const promises = numbersArray.map(async (number) => {
//     try {
//       const response = await fetch(
//         "http://oo.com.tr/goc-service/kisi-bilgi-statu/sorgulaV2",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//             ApiKey: "r89bgtws-t4l6-25ot-sz844-ooooo",
//           },
//           body: JSON.stringify({
//             fotografGetir: false,
//             gecmisListeGetir: true,
//             kimlikNo: number,
//           }),
//         }
//       );

//       const data = await response.json();
//       return [number, data];
//     } catch (error) {
//       return [number, { error: true, message: error.message }];
//     }
//   });

//   const results = await Promise.all(promises);
//   return results;
// }



function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sorgulamalariBaslat() {
  const numbersArray = [
  '99516209786',
  '99756358114'





  ];

  const results = [];

  for (const number of numbersArray) {
    try {
       const response = await fetch(
        "http://api-gateway-service.ybportal.csgb.gov.tr/goc-service/kisi-bilgi-statu/sorgulaV2",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            ApiKey: "r89bgtws-t4l6-25ot-sz844-9833ne684527",
          },
          body: JSON.stringify({
            fotografGetir: false,
            gecmisListeGetir: true,
            kimlikNo: number,
          }),
        }
      );

      const data = await response.json();
      results.push([number, data]);
    } catch (error) {
      results.push([number, { error: true, message: error.message }]);
    }

    // Sıradaki isteğe geçmeden önce 500ms bekle
    await delay(1000);
  }

  return results;
}

// Sözlükler

const kisaDonemNedenleri = {
  1: "Bilimsel araştırma amacıyla gelecekler",
  2: "Türkiye'de taşınmaz malı bulunanlar",
  3: "Ticari bağlantı veya iş kuracaklar",
  6: "Turizm amaçlı kalacaklar",
  15: "Kamu kurumları aracılığıyla eğitim, araştırma, staj ve kurslara katılacaklar",
  5: "Öğrenci değişim programları çerçevesinde eğitim görecekler",
  17: "Staj amaçlı değişim programları çerçevesinde eğitim görecekler",
  12: "Yükseköğrenimini tamamlayıp 6 ay içinde müracaat edenler",
  4: "Hizmet içi eğitim programlarına katılacaklar",
  9: "İdari makamların kararı",
  8: "İdari makamların talebi",
  18: "6458 sayılı Yabancılar ve Uluslararası Koruma Kanununun 31. Maddesinin j bendi kapsamında",
  19: "KKTC Vatandaşı",
  16: "Aile ikamet izninden kısa dönem ikamet iznine geçenler",
  13: "Anlaşmalar çerçevesinde eğitim",
  7: "Tedavi görecekler",
  14: "Türkçe öğrenme kurslarına katılacaklar",
};

const uzunDonemTurkSoylu = {
  1: "KKTC VATANDAŞLARI",
  2: "AHISKA TÜRKÜ",
  3: "ÇEÇEN ASILLI YABANCI",
  4: "KARADENİZ",
  5: "UYGUR TÜRKÜ",
  6: "BULGARİSTAN TÜRKÜ",
  7: "BATI TRAKYA TÜRKÜ",
  8: "IRAK TÜRKMENİ",
  9: "AFGANİSTAN TÜRKÜ",
  10: "KIRIM TATARI",
  11: "ESKİ YUGOSLAVYA UYRUKLU",
  12: "YUNANİSTAN ISKATI",
};

const insaniIkametNedenleri = {
  5: "53. maddeye göre sınır dışı etme kararına karşı yargı yoluna başvurulduğunda",
  4: "55. madde uyarınca yabancı hakkında sınır dışı etme kararı alınmadığında",
  6: "72. maddeye göre kabul edilemez başvuru kararına karşı yargı yoluna başvurulduğunda",
  7: "77. maddeye göre başvurunun geri çekilmesi veya geri çekilmiş sayılmasına karşı yargı yoluna başvuru",
  9: "Acil nedenlerden dolayı Türkiye’de kalmasına izin verilmesi gereken",
  20: "Başvuru sahibinin ilk iltica ülkesi veya güvenli üçüncü ülkeye geri gönderilmesi işlemlerinin devamı süresince",
  8: "Başvuru sahibinin geri gönderilmesi işlemlerinin devamı süresince",
  14: "Ciddi sağlık sorunları nedeniyle seyahat etmesi riskli görülenler",
  1: "Çocuğun yüksek yararı",
  16: "Hamilelik durumu nedeniyle seyahat etmesi riskli görülenler",
  17: "Hayati tehlike arz eden hastalıkları için tedavisi devam etmekteyken sınır dışı edileceği ülkede tedavi imkanı bulunmayanlar",
  10: "Kamu düzeni ve kamu güvenliği açısından Türkiye’de kalmasına izin verilmesi gereken",
  18: "Mağdur destek sürecinden yararlanmakta olan insan ticareti mağdurları",
  11: "Olağanüstü durumlarda",
  13: "Sınır dışı edileceği ülkede ölüm cezasına, işkenceye, insanlık dışı veya onur kırıcı ceza veya muameleye maruz kalacağı konusunda ciddi emare bulunanlar",
  2: "Sınır dışı/giriş yasağı kararına rağmen çıkışları yaptırılamayan",
  12: "Sınır dışı/giriş yasağı kararına rağmen Türkiye’den ayrılmaları makul veya mümkün görülmeyen",
  19: "Tedavileri tamamlanıncaya kadar psikolojik, fiziksel veya cinsel şiddet mağdurları",
  3: "Türkiye’den ayrılmaları makul veya mümkün görülmeyen",
  21: "Ülke menfaatlerinin korunması ile Kamu düzeni ve kamu güvenliği açısından Türkiye’de kalmasına izin verilmesi gereken",
  15: "Yaş durumu nedeniyle seyahat etmesi riskli görülenler",
};

const aileDestekleyiciTur = {
  1: "Destekleyicinin Eşi",
  2: "Destekleyicinin Ergin Olmayan Çocuğu",
  3: "Destekleyicinin Bakmakla Yükümlü Olduğu Çocuğu",
  4: "Destekleyicinin Eşinin Ergin Olmayan Çocuğu",
  5: "Destekleyicinin Eşinin Bakmakla Yükümlü Olduğu Çocuğu",
};

const ogrenciKalisNeden = {
  6: "Açıköğretim – Uzaktan Eğitim Programları",
  9: "Askeri Liseler",
  8: "Askeri Okullarda Öğrenim Görenler",
  20: "Diğer Uluslararası Değişim Programları Kapsamında Öğrenci Olarak Gelenler",
  4: "Diş Hekimliğinde Uzmanlık Eğitimi Alanlar / DUS",
  19: "Doktora",
  2: "Erasmus Programı Kapsamında Öğrenci Olarak Gelenler",
  17: "Harp Okulları",
  10: "İlkokul",
  21: "İlkokul",
  15: "Lisans - Diş Hekimliği / Eczacılık / Veterinerlik Fakülteleri",
  16: "Lisans - Tıp Fakültesi",
  14: "Lisans",
  12: "Lise",
  23: "Lise",
  7: "MEB’e Bağlı Olmayan Okullarda Öğrenim Görenler",
  11: "Ortaokul",
  22: "Ortaokul",
  13: "Ön Lisans",
  1: "Temel Eğitim- Ortaöğretim- Yükseköğretim",
  3: "Tıpta Uzmanlık Eğitimi Alanlar / TUS",
  5: "Üniversitesi Tarafından Türkçe Kursuna Yönlendirilenler",
  18: "Yüksek Lisans",
};

// En yakın bitiş tarihli kaydı döner
function parseTarih(tarih) {
  if (!tarih) return null;

  // Eğer tarih zaten Date nesnesiyse
  if (tarih instanceof Date && isValid(tarih)) return tarih;

  // Eğer tarih string ise
  const parsed = parse(tarih, "dd/MM/yyyy", new Date());
  if (isValid(parsed)) return parsed;

  const fallback = new Date(tarih); // ISO ya da başka formatsa
  if (isValid(fallback)) return fallback;

  return null;
}

async function getEnYakinKayit(list, tarihAlan = "bitisTarihi") {
  if (!Array.isArray(list) || list.length === 0) return null;

  return list.reduce((closest, current) => {
    const currentDate = parseTarih(current[tarihAlan]);
    const closestDate = parseTarih(closest[tarihAlan]);

    if (!currentDate) return closest;
    if (!closestDate) return current;

    return currentDate < closestDate ? current : closest;
  });
}


//Gerekçeyi döner
async function getGerekce(ikametOzetList, ikametIzniBilgileriList) {

  // if (!Array.isArray(ikametOzetList) || ikametOzetList.length === 0) return "Veri Yok";
  // if (!Array.isArray(ikametIzniBilgileriList) || ikametIzniBilgileriList.length === 0) return "Veri Yok";

  const enYakinIkamet = await getEnYakinKayit(ikametOzetList, "bitisTarihi");
  if (!enYakinIkamet || !enYakinIkamet.verilisNedeni) return "Veri Yok";

  const tip = enYakinIkamet.verilisNedeni;
  console.log("tip",tip)

                                          

  // En yakın bitiş tarihli izin bilgisini bul
  let enYakinIzin = await getEnYakinKayit(ikametIzniBilgileriList, "bitisTarihi");
 
  
                                    
  if (
    !enYakinIzin &&
    Array.isArray(ikametOzetList) &&
    ikametOzetList.length > 0
  ) {
    enYakinIzin = await getEnYakinKayit(ikametIzniBilgileriList, "bitisTarihi");
  }
  
  if (!enYakinIzin) return "Veri Yok";

  if (tip.toLowerCase().includes("kısa")) {
    console.log("kısa dönem ifine girildi")
   
   
   return (
      kisaDonemNedenleri[
        enYakinIzin.kisaDonemKalisNeden as keyof typeof kisaDonemNedenleri
      ] || "Bilinmeyen Gerekçe"
    );

    // kısa dönem işlemleri
  } else if (tip.toLowerCase().includes("uzun")) {
    if (!enYakinIzin.turkSoylu) return "Veri Yok";
  } else if (tip.toLowerCase().includes("insani")) {
    if (!enYakinIzin.insaniIkametIzniKalisNeden) return "Veri Yok";
    return (
      insaniIkametNedenleri[
        enYakinIzin.insaniIkametIzniKalisNeden as keyof typeof insaniIkametNedenleri
      ] || "Bilinmeyen Gerekçe"
    );
    // insani ikamet işlemleri
  } else if (tip.toLowerCase().includes("aile")) {
    console.log("aile ifine girildi")
    if (!enYakinIzin.aileDestekleyiciTur) return "Veri Yok";
    console.log("return edilecek", aileDestekleyiciTur[
        enYakinIzin.aileDestekleyiciTur as keyof typeof aileDestekleyiciTur
      ])
    return (
      aileDestekleyiciTur[
        enYakinIzin.aileDestekleyiciTur as keyof typeof aileDestekleyiciTur
      ] || "Bilinmeyen Gerekçe"
    );
    // aile ikamet işlemleri
  } else if (tip.toLowerCase().includes("öğrenci")) {
    if (!enYakinIzin.ogrenciKalisNeden) return "Veri Yok";
    return (
      ogrenciKalisNeden[
        enYakinIzin.ogrenciKalisNeden as keyof typeof ogrenciKalisNeden
      ] || "Bilinmeyen Gerekçe"
    );
    // öğrenci işlemleri
  } 

  // diğer işlemler
}

const Home = async () => {
  const baslangicZamani = new Date();

  const sonuclar = await sorgulamalariBaslat();

  const bitisZamani = new Date();

  // En yakın bitiş tarihli ikamet özetini döner
  const getEnYakinIkamet = (ikametOzetList) => {
    if (!Array.isArray(ikametOzetList) || ikametOzetList.length === 0)
      return null;

    return ikametOzetList.reduce((closest, current) => {
      const currentDate = current?.bitisTarihi
        ? new Date(current.bitisTarihi)
        : null;
      const closestDate = closest?.bitisTarihi
        ? new Date(closest.bitisTarihi)
        : null;

      if (!currentDate) return closest;
      if (!closestDate) return current;

      return currentDate > closestDate ? current : closest;
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <strong>Sorgu Başlangıç Zamanı:</strong>{" "}
        {format(baslangicZamani, "dd/MM/yyyy HH:mm:ss")}
      </div>
      <div>
        <strong>Sorgu Bitiş Zamanı:</strong>{" "}
        {format(bitisZamani, "dd/MM/yyyy HH:mm:ss")}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>YKN</TableHead>
            <TableHead>YABANCI ADI</TableHead>
            <TableHead>YABANCI SOYADI</TableHead>
            <TableHead>DOĞUM TARİHİ</TableHead>
            <TableHead>ADRES</TableHead>
            <TableHead>AKTİF İZİN TÜRÜ</TableHead>
            <TableHead>İKAMET BİTİŞ TARİHİ (EN YAKIN)</TableHead>
            <TableHead>GEREKÇESİ</TableHead> {/* Yeni sütun */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sonuclar.map(async ([numara, veri], index) => {
            const kisi = veri?.data?.kisi || {};
            const aktifIzinTur = kisi?.aktifIzinTur;
            const ikametOzetList = kisi?.ikametOzetList || [];
            const ikametIzniBilgileriList = veri?.data?.ikametIzniBilgileriList || [];
           

            const enYakinIkamet = getEnYakinIkamet(ikametOzetList);
            const gerekce = await getGerekce(ikametOzetList, ikametIzniBilgileriList);

            return (
              <TableRow key={index}>
                <TableCell>{numara ?? "Veri Yok"}</TableCell>
                <TableCell>
                  {veri?.success ? kisi.ad ?? "Veri Yok" : "Veri Yok"}
                </TableCell>
                <TableCell>
                  {veri?.success ? kisi.soyad ?? "Veri Yok" : "Veri Yok"}
                </TableCell>
                <TableCell>
                  {veri?.success ? kisi.dogumTarih ?? "Veri Yok" : "Veri Yok"}
                </TableCell>
                <TableCell>
                  {veri?.success
                    ? kisi.iletisimAdres?.ikametAcikAdres ?? "Veri Yok"
                    : "Veri Yok"}
                </TableCell>
                <TableCell>
                  {veri?.success && aktifIzinTur
                    ? 
                      " " +
                      (enYakinIkamet?.verilisNedeni ?? "")
                    : "Veri Yok"}
                </TableCell>
                <TableCell>
                  {veri?.success && enYakinIkamet && enYakinIkamet.bitisTarihi
                    ? format(new Date(enYakinIkamet.bitisTarihi), "dd MM yyyy")
                    : "Veri Yok"}
                </TableCell>
                <TableCell>{veri?.success ? gerekce : "Veri Yok"}</TableCell>{" "}
                {/* Yeni sütun */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
