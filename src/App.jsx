import "./App.css";
import useFetchQuery from "./hook/useFetchQuery";
import {
  getBarang,
  getBeaCukai,
  getNegara,
  getPelabuhan,
} from "./services/APIService";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

function App() {
  const [negara, setNegara] = useState("");
  const [queryNegara, setQueryNegara] = useState("");

  const [pelabuhan, setPelabuhan] = useState("");
  const [queryPelabuhan, setQueryPelabuhan] = useState("");

  const [cukai, setCukai] = useState("");
  const [queryCukai, setQueryCukai] = useState("");

  const [barang, setBarang] = useState("");
  const [queryBarang, setQueryBarang] = useState("");

  const [harga, setHarga] = useState("");
  const [result, setResult] = useState("");

  const { data: dataNegara, setData: setDataNegara } = useFetchQuery(
    getNegara,
    queryNegara
  );
  const { data: dataPelabuhan, setData: setDataPelabuhan } = useFetchQuery(
    getPelabuhan,
    queryPelabuhan
  );
  const { data: dataBeaCukai } = useFetchQuery(getBeaCukai, queryCukai);
  const { data: dataBarang } = useFetchQuery(getBarang, queryBarang);

  const handlerSuggestNegara = (text) => {
    setNegara(text);
    setDataNegara("");
  };

  const handlerInputNegara = (e) => {
    setQueryNegara(e.target.value);
    setNegara(e.target.value);
  };

  const handlerSuggestPelabuhan = (text) => {
    setPelabuhan(text);
    setDataPelabuhan("");
  };

  const handlerInputPelabuhan = (e) => {
    setQueryPelabuhan(e.target.value);
    setPelabuhan(e.target.value);
  };

  const handlerSuggestBarang = (text) => {
    setBarang(text);
  };

  const handlerInputBarang = (e) => {
    setQueryBarang(e.target.value);
    setBarang(e.target.value);
  };

  const handlerSuggestBeaCukai = (text) => {
    setCukai(text);
    const tambah = (Number(harga) * Number(text)) / 100;
    setResult(tambah);
  };

  const handlerInputBeaCukai = (e) => {
    setQueryCukai(e.target.value);
    setCukai(e.target.value);
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="container">
      <div className="section">
        <div>
          <label htmlFor="">Negara: </label>
          <input
            className="inputForm"
            type="text"
            value={negara}
            onChange={(e) => handlerInputNegara(e)}
          />
        </div>
        <div>
          {dataNegara?.data?.map((item, index) => (
            <div
              onClick={() => handlerSuggestNegara(item.ur_negara)}
              key={index}
            >
              {negara ? item.ur_negara : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <div>
          <label htmlFor="">Pelabuhan: </label>
          <input
            className="inputForm"
            type="text"
            value={pelabuhan}
            onChange={(e) => handlerInputPelabuhan(e)}
          />
        </div>
        <div>
          {dataPelabuhan?.data?.map((item, index) => (
            <div
              onClick={() => handlerSuggestPelabuhan(item.ur_pelabuhan)}
              key={index}
            >
              {pelabuhan ? item.ur_pelabuhan : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <div>
          <label htmlFor="">Barang: </label>
          <input type="text" className="inputForm" />
        </div>
        <div className="section">
          <input
            className="inputForm"
            type="text"
            value={barang}
            onChange={(e) => handlerInputBarang(e)}
          />
        </div>
        <div>
          {dataBarang?.data?.map((item, index) => (
            <div
              onClick={() => handlerSuggestBarang(item.uraian_id)}
              key={index}
            >
              {barang ? item.uraian_id : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <div>
          <label htmlFor="">Harga: </label>
          <input
            className="inputForm"
            type="text"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
        </div>
      </div>
      <div className="section">
        <div>
          <label htmlFor="">Tarif Bea Masuk: </label>
          <input
            className="inputForm"
            type="text"
            value={cukai}
            onChange={(e) => handlerInputBeaCukai(e)}
          />
        </div>
        <div>
          {dataBeaCukai?.data?.map((item, index) => (
            <div onClick={() => handlerSuggestBeaCukai(item.bm)} key={index}>
              {cukai ? item.bm : ""}
            </div>
          ))}
        </div>
        <div className="section">
          <input
            className="inputForm"
            type="text"
            value={rupiah(result)}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default App;
