import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import AudioPlayer from "../components/AudioPlayer";
{
     /* menambahkan import link */
}
import { Link } from "react-router-dom";

const DetailSurat = () => {
     const { id } = useParams(); // Ambil parameter dari URL
     const [surat, setSurat] = useState([]);
     const [loading, setLoading] = useState(true);
     const [currentAudio, setCurrentAudio] = useState(null);

     const getDetailSurat = (idSurat) => {
          fetch(`https://equran.id/api/v2/surat/${idSurat}`)
               .then((res) => res.json())
               .then((data) => {
                    setSurat(data.data);
                    setLoading(false);
               })
               .catch((error) => {
                    console.error("Error fetching data:", error);
                    setLoading(false);
               });
     };

     useEffect(() => {
          getDetailSurat(id);
     }, [id]); // Jalankan useEffect setiap `id` berubah

     if (loading) return <p>Loading...</p>;
     if (!surat) return <p>Surat tidak ditemukan.</p>;

     return (
          <>
               <div className="vh-100 overflow-auto">
                    <h2>
                         {surat.namaLatin} ({surat.nama})
                    </h2>
                    <p>Jumlah Ayat: {surat.jumlahAyat}</p>
                    <p>Arti: {surat.arti}</p>
                    <p>Deskripsi: {parse(surat.deskripsi)}</p>
                    <div>
                         <ul className="list-group">
                              {surat.ayat.map((ayat) => (
                                   <li key={ayat.nomorAyat}>
                                        <div className="list-group-item d-flex justify-content-between">
                                             <span className=" align-items-center arabic-text">{ayat.teksArab}</span>
                                             <div className=" d-flex align-items-center">
                                                  <span className="badge text-bg-primary rounded-sm d-flex align-items-center p-2 me-1">{ayat.nomorAyat}</span>
                                                  <span>
                                                       <AudioPlayer key={ayat.nomorAyat} url={ayat.audio["05"]} currentAudio={currentAudio} setCurrentAudio={setCurrentAudio}></AudioPlayer>
                                                  </span>
                                             </div>
                                        </div>
                                        <div className="mt-2">
                                             <span className="text-muted"> {ayat.teksIndonesia}</span>
                                        </div>
                                        {/* menambahkan link ke tafsir surat */}
                                        <div className="mt-4">
                                             <Link to={`/tafsir/${id}`} className="btn btn-primary">
                                                  Lihat Tafsir Surat
                                             </Link>
                                        </div>
                                   </li>
                              ))}
                         </ul>
                    </div>
               </div>
          </>
     );
};

export default DetailSurat;
