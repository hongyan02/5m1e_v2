import { useMaterialLot } from "@/store/base/useMaterialLot";

export const useProcessPageLogic = () => {
    const { materialLotCode } = useMaterialLot();

    const tabItems = [
        {
            key: "person",
            label: "人",
            children: "详情内容",
        },
        {
            key: "machine",
            label: "机",
            children: "操作内容",
        },
        {
            key: "material",
            label: "料",
            children: "操作内容",
        },
        {
            key: "method",
            label: "法",
            children: "操作内容",
        },
        {
            key: "environment",
            label: "环",
            children: "操作内容",
        },
        {
            key: "test",
            label: "测",
            children: "操作内容",
        },
    ];

    return {
        // 状态
        materialLotCode,
        tabItems,
        // 配置
        defaultActiveKey: "machine",
    };
};