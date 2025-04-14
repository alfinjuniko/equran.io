import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TafsirSurat = () => {
     const { id } = useParams(); // Ambil parameter dari URL
     const [tafsir, setTafsir] = useState(null);
     const [loading, setLoading] = useState(true);

     const getTafsirSurat = (idSurat) => {
          fetch(`https://equran.id/api/v2/tafsir/${idSurat}`)
               .then((res) => res.json())
               .then((data) => {
                    setTafsir(data.data);
                    setLoading(false);
               })
               .catch((error) => {
                    console.error("Error fetching tafsir:", error);
                    setLoading(false);
               });
     };

     useEffect(() => {
          getTafsirSurat(id);
     }, [id]);

     if (loading) return <p>Loading...</p>;
     if (!tafsir) return <p>Tafsir tidak ditemukan.</p>;

     return (
          <div className="vh-100 overflow-auto">
               <h2>
                    Tafsir {tafsir.namaLatin} ({tafsir.nama})
               </h2>
               <p>Jumlah Ayat: {tafsir.jumlahAyat}</p>
               <div>
                    <ul className="list-group">
                         {tafsir.tafsir.map((ayat) => (
                              <li key={ayat.ayat} className="list-group-item">
                                   <h5>Ayat {ayat.ayat}</h5>
                                   <p>{ayat.teks}</p>
                                   <p className="text-muted">{ayat.tafsir}</p>
                              </li>
                         ))}
                    </ul>
               </div>
          </div>
     );
};

export default TafsirSurat;
