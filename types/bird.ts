export type Bird = {
  id: number;
  name: string;
  is_subspecies: boolean;
  base_species_id: number | null;
  taxonomy: {
    order: string;
    family: string;
    genus: string;
  };
  observation: {
    status: string | null;
    photo_rank: string | null;
    last_observed_at: string | null;
  };
};

export type BirdList = {
  birds: Bird[];
};