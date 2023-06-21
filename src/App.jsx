import { isEmpty } from "lodash";
import "./App.css";
import useFetchQuery from "./hook/useFetchQuery";
import {
  getBarang,
  getBeaCukai,
  getNegara,
  getPelabuhan,
} from "./services/APIService";
import { useState } from "react";

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

  const handlerHarga = (e) => {
    const tambah = (Number(e.target.value) * Number()) / 100;
    setResult(tambah);
  };

  const handlerInputBarang = (e) => {
    setQueryBarang(e.target.value);
    setQueryCukai(e.target.value);
  };

  const DetailBarang = () => {
    return dataBarang?.data?.map((item) => (
      <input
        className="inputForm"
        type="text"
        value={item.sub_header + " " + item.uraian_id}
        disabled
      />
    ));
  };

  const DetailBeaCukai = () => {
    return dataBeaCukai?.data?.map((item) => (
      <input
        className="inputForm"
        type="text"
        value={item.bm + " %"}
        disabled
      />
    ));
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
          <input
            type="text"
            className="inputForm"
            onChange={(e) => handlerInputBarang(e)}
          />
        </div>
        <div className="section">
          <DetailBarang />
        </div>
      </div>
      <div className="section">
        <div>
          <label htmlFor="">Harga: </label>
          <input
            className="inputForm"
            type="text"
            value={harga}
            onChange={(e) => handlerHarga(e)}
          />
        </div>
      </div>
      <div className="section">
        <div>
          <label htmlFor="">Tarif Bea Masuk: </label>
          <DetailBeaCukai />
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
