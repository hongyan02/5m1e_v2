import { useState, useEffect } from "react";
import { useProdLine } from "@/store/base/useProdLine";
import { useMaterialLot } from "@/store/base/useMaterialLot";
import { useProdLine as useProdLineQuery } from "@/query/base";

export const useHeaderLogic = () => {
    const [materialLotCode, setMaterialLotCode] = useState("");
    const [queryEnabled, setQueryEnabled] = useState(false);
    const { prod_line_code, setProdLineCode } = useProdLine();
    const { setMaterialLotCode: saveMaterialLotCode } = useMaterialLot();

    const { data, isLoading, error, isSuccess, isError } = useProdLineQuery(
        materialLotCode,
        queryEnabled
    );

    // 处理查询成功
    useEffect(() => {
        if (isSuccess && data?.prod_line_code) {
            setProdLineCode(data.prod_line_code);
            saveMaterialLotCode(materialLotCode);
        }
    }, [isSuccess, data, setProdLineCode, saveMaterialLotCode, materialLotCode]);

    // 处理查询错误
    useEffect(() => {
        if (isError && error) {
            console.error("查询失败:", error);
        }
    }, [isError, error]);

    const handleQuery = () => {
        if (materialLotCode.trim()) {
            setQueryEnabled(true);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleQuery();
        }
    };

    return {
        // 状态
        materialLotCode,
        prod_line_code,
        isLoading,
        error,
        // 方法
        setMaterialLotCode,
        handleQuery,
        handleKeyPress,
    };
};
