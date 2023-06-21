import api from "../config/Api";

export const getNegara = (negara) =>
  api.get("https://insw-dev.ilcs.co.id/n/negara?ur_negara=" + negara);

export const getPelabuhan = (pelabuhan) =>
  api.get(
    "https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=SG&ur_pelabuhan=" +
      pelabuhan
  );

export const getBeaCukai = (cukaiCode) =>
  api.get("https://insw-dev.ilcs.co.id/n/tarif?hs_code=" + cukaiCode);

export const getBarang = (barangCode) =>
  api.get("https://insw-dev.ilcs.co.id/n/barang?hs_code=" + barangCode);
