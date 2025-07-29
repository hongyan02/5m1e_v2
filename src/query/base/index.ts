import { getProdLine } from "./api";
import { useQuery } from "@tanstack/react-query";

export type ProdLineResponse = {
    prod_line_code: string;
};

export const useProdLine = (material_lot_code: string, enabled: boolean = false) => {
    return useQuery({
        queryKey: ["prodLine", material_lot_code],
        queryFn: () => getProdLine(material_lot_code),
        enabled: enabled && !!material_lot_code.trim(),
    });
};
