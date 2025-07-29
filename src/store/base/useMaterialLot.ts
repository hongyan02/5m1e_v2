import { create } from "zustand";

type MaterialLot = {
    materialLotCode: string;
    setMaterialLotCode: (materialLotCode: string) => void;
};

export const useMaterialLot = create<MaterialLot>((set) => ({
    materialLotCode: "",
    setMaterialLotCode: (materialLotCode: string) => set({ materialLotCode }),
}));