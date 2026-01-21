export interface PokemonCard{
    set_name: "base";
    type: "pokemon" | "trainer" | "energy";
    id_no: string;
    set_no: string;
    name: string;
    rarity: string;
    image: string;

    energy?: string;
    hp?: string;
    attacks?: Attack[];
    description?: string;
}

export interface Attack {
    name: string;
    damage?: string;
    cost: string[];
    text: string;
}
