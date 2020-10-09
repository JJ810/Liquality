import axios from "axios";

const baseUrl = "https://liquality.io/swap/agent/api/swap/marketinfo";

export const getData = async () => await axios.get(baseUrl);
