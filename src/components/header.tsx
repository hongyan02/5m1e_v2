"use client";

import { Button, Input, Tag } from "antd";
import { useHeaderLogic } from "@/hooks/useHeaderLogic";
import React from "react";

export default function Header() {
    const {
        materialLotCode,
        prod_line_code,
        isLoading,
        error,
        setMaterialLotCode,
        handleQuery,
        handleKeyPress,
    } = useHeaderLogic();


    return (
        <header className="w-full h-10 bg-white flex justify-between items-center">
            <div className="flex items-center gap-2 pl-4">
                <span className="text-sm font-medium whitespace-nowrap">电芯条码：</span>
                <Input
                    placeholder="请输入查询内容"
                    value={materialLotCode}
                    onChange={(e) => setMaterialLotCode(e.target.value)}
                    onPressEnter={handleKeyPress}
                    className="w-40"
                />
                <Button type="primary" onClick={handleQuery} loading={isLoading}>
                    查询
                </Button>
                <div className="flex items-center gap-2 w-40 h-10">
                    {error && <span className="text-red-500 text-sm">查询失败</span>}
                    {prod_line_code && <Tag color="blue">{prod_line_code}</Tag>}
                </div>
                
            </div>
        </header>
    );
}
