"use client";

import React from "react";
import Link from "next/link";
import { Tabs, Tag } from "antd";
import { useProcessPageLogic } from "@/hooks/useProcessPageLogic";

export default function ProcessPage() {
    const {
        materialLotCode,
        tabItems,
        defaultActiveKey,
    } = useProcessPageLogic();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* 返回按钮 - 放在屏幕左侧 */}
            <div className="pl-8 mb-6 flex flex-row items-center justify-items-start gap-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    返回流程图
                </Link>

                <div>
                    <span>条码号：<Tag color="blue">{materialLotCode}</Tag></span>
                </div>
            </div>
            <div>
                <Tabs
                    items={tabItems}
                    defaultActiveKey={defaultActiveKey}
                    type="card"
                    size="large"
                />
            </div>
        </div>
    );
}
