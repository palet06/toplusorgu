"use server"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, parse } from "date-fns";

async function sorgulamalariBaslat() {
  const results = [];
  const numbersArray = [
    98839027770,
  ];

  for (const number of numbersArray) {
    try {
      const response = await fetch(
        `https://eizin.csgb.gov.tr/api/async/kisiBilgiStatuSorgula?tckNo=${number}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtdXJhdC5oYXlhbG9nbHUiLCJleHAiOjE3NTcwNzYwNDgsInVzZXIiOnsiaWQiOjU3MTQwMSwidXNlcm5hbWUiOiJtdXJhdC5oYXlhbG9nbHUiLCJwYXNzd29yZCI6bnVsbCwic2VsZWN0ZWRTa3kiOm51bGwsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1BUVF9TRVJWSUNFIn0seyJhdXRob3JpdHkiOiJST0xFX1RFS05JS19ERVNURUsifSx7ImF1dGhvcml0eSI6IlJPTEVfVEFLSVBfTElTVF9ZT05FVElNIn0seyJhdXRob3JpdHkiOiJST0xFX01FVlpVQVQifSx7ImF1dGhvcml0eSI6IlJPTEVfVFVSS1VBWl9VWk1BTiJ9XSwidGNrTm8iOm51bGwsImZpcnN0TmFtZSI6bnVsbCwibGFzdE5hbWUiOm51bGwsImVtYWlsIjpudWxsLCJlbWFpbFZlcmlmaWVkIjpmYWxzZSwicGhvbmVOdW1iZXIiOm51bGwsInBob25lTnVtYmVyVmVyaWZpZWQiOmZhbHNlLCJlbmFibGVkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiYWNjb3VudE5vbkxvY2tlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJsZGFwTG9naW5FbmFibGVkIjpmYWxzZSwicGFzc3dvcmRMb2dpbkVuYWJsZWQiOmZhbHNlLCJlZGV2bGV0TG9naW5FbmFibGVkIjpmYWxzZSwiY3JlYXRpb25EYXRlIjpudWxsLCJsYXN0TG9naW5EYXRlIjpudWxsLCJ1c2VyUm9sZXMiOm51bGwsInVzZXJQcml2aWxlZ2VzIjpudWxsLCJhdHRyaWJ1dGVzIjpudWxsfSwiaXNzIjoiZWl6aW4uaWMtc2VydmljZSJ9.0rst_9BvpKq-8hNhlz1TAlwrnlQfdHWIYGHTDpaempA",
          },
          
        }
      );

      const data = await response.json();
      results.push([number, data]);
    } catch (error) {
      results.push([number, { error: true, message: error.message }]);
    }
  }

  return results;
}

const Home2 = async () => {
  const sonuclar = await sorgulamalariBaslat();

  // En yakın bitiş tarihli ikamet özetini döner
  const getEnYakinIkamet = (ikametOzetList) => {
    if (!Array.isArray(ikametOzetList) || ikametOzetList.length === 0) return null;

    return ikametOzetList.reduce((closest, current) => {
      // Tarih formatın dd/MM/yyyy olduğu için parse edelim
      const currentDate = parse(current.bitisTarihi, "dd/MM/yyyy", new Date());
      const closestDate = parse(closest.bitisTarihi, "dd/MM/yyyy", new Date());

      // Daha uzak tarih değil en yakın yani en küçük tarih olmalı diye düşünüyorsan '<' olabilir
      // Ama orijinalinde '>' var, ona göre bırakıyorum
      return currentDate > closestDate ? current : closest;
    });
  };

  return (
    <div className="flex flex-col">
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {sonuclar.map(([numara, data], index) => {
            if (data.error) {
              return (
                <TableRow key={index}>
                  <TableCell>{numara}</TableCell>
                  <TableCell colSpan={6}>Hata: {data.message}</TableCell>
                </TableRow>
              );
            }

            const kisi = data.kisi || {};
            const ikametIzniList = data.ikametIzniBilgileriList || [];
            const enYakinIkamet = getEnYakinIkamet(ikametIzniList);

            // aktifIzinTur bazen string bazen obje olabilir, ona göre gösterelim
            let aktifIzinAciklama = "Veri Yok";
            if (kisi.aktifIzinTur) {
              if (typeof kisi.aktifIzinTur === "string") {
                aktifIzinAciklama = kisi.aktifIzinTur;
              } else if (kisi.aktifIzinTur.aciklama) {
                aktifIzinAciklama = kisi.aktifIzinTur.aciklama;
              }
            } else if (enYakinIkamet) {
              aktifIzinAciklama = enYakinIkamet.ikametTur || "Veri Yok";
            }

            return (
              <TableRow key={index}>
                <TableCell>{kisi.yabanciKimlikNo || "Veri Yok"}</TableCell>
                <TableCell>{kisi.ad || "Veri Yok"}</TableCell>
                <TableCell>{kisi.soyad || "Veri Yok"}</TableCell>
                <TableCell>{kisi.dogumTarih || "Veri Yok"}</TableCell>
                <TableCell>{kisi.iletisimAdres?.ikametAcikAdres || "Veri Yok"}</TableCell>
                <TableCell>{aktifIzinAciklama}</TableCell>
                <TableCell>
                  {enYakinIkamet
                    ? format(parse(enYakinIkamet.bitisTarihi, "dd/MM/yyyy", new Date()), "dd MM yyyy")
                    : "Veri Yok"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home2;
