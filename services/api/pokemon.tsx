import pokemonsdk from "pokemontcgsdk";

pokemonsdk.configure({ apiKey: process.env.POKEMONTCG_APIKEY! });

export default pokemonsdk;
