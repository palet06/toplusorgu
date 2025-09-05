import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

async function sorgulamalariBaslat() {
  const results = [];
  const numbersArray = [
    99600479026,
98785246256,
99547326612,
98227208682,
98770166644,
98719242170,
98488247246,
98962170114,
98731224758,
99245451470,
98152267594,
98287185930,


  ];

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
      console.log(data);

      // [numara, sorgu_sonucu] formatında ekle
      results.push([number, data]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`Hata oluştu: ${number}`, error);
      results.push([number, { error: true, message: error.message }]);
    }
  }

  return results;
}

const Home = async () => {
  const sonuclar = await sorgulamalariBaslat();
  console.log("sorgu bitti");
  console.log(sonuclar);

  // En yakın bitiş tarihli ikamet özetini döner
  const getEnYakinIkamet = (ikametOzetList) => {
    if (!Array.isArray(ikametOzetList) || ikametOzetList.length === 0) return null;

    return ikametOzetList.reduce((closest, current) => {
      const currentDate = new Date(current.bitisTarihi);
      const closestDate = new Date(closest.bitisTarihi);

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
          {sonuclar.map((sonuc, index) => {
            const veri = sonuc[1];
            const kisi = veri?.data?.kisi;
            const aktifIzinTur = kisi?.aktifIzinTur;
            const enYakinIkamet = getEnYakinIkamet(kisi?.ikametOzetList);

         

            return (
              <TableRow key={index}>
                <TableCell>{sonuc[0]}</TableCell>
                <TableCell>{veri.success ? kisi?.ad : "Veri Yok"}</TableCell>
                <TableCell>{veri.success ? kisi?.soyad : "Veri Yok"}</TableCell>
                <TableCell>{veri.success ? kisi?.dogumTarih : "Veri Yok"}</TableCell>
                <TableCell>
                  {veri.success
                    ? kisi?.iletisimAdres?.ikametAcikAdres || "Veri Yok"
                    : "Veri Yok"}
                </TableCell>
                <TableCell>
                  {veri.success && aktifIzinTur
                    ? aktifIzinTur.aciklama + " " + enYakinIkamet.verilisNedeni || JSON.stringify(aktifIzinTur)
                    : "Veri Yok"}
                </TableCell>
                <TableCell>
                  {veri.success && enYakinIkamet
                    ? format(enYakinIkamet.bitisTarihi,"dd MM yyy")
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

export default Home;
