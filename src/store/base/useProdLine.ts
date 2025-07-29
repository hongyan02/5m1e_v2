import { create } from "zustand";

type ProdLine = {
    prod_line_code: string;
    setProdLineCode: (prod_line_code: string) => void;
};

export const useProdLine = create<ProdLine>((set) => ({
    prod_line_code: "",
    setProdLineCode: (prod_line_code: string) => set({ prod_line_code }),
}));
