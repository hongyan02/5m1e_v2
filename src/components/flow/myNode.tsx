// MyNode.tsx
import React from "react";
import { Handle, Position } from "@xyflow/react";

// 定义节点数据接口
export interface NodeData {
    label: string;
    url?: string;
    process?: string;
}

export function Start({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
            <Handle type="source" position={Position.Right} />
        </div>
    );
}
// 右端点结束
export function REnd({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
            <Handle type="target" position={Position.Right} />
        </div>
    );
}
// 左端点结束
export function LEnd({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
            <Handle type="target" position={Position.Left} />
        </div>
    );
}

export function Left_with_Right({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
            {/* 输入：左边 */}
            <Handle type="target" position={Position.Left} />
            {/* 输出：右边 */}
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export function Right_with_Left({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
            <Handle type="target" position={Position.Right} />
            <Handle type="source" position={Position.Left} />
        </div>
    );
}

export function Left_with_Bottom({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
export function Top_with_Left({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Left} />
        </div>
    );
}

export function Right_with_Bottom({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
            <Handle type="target" position={Position.Right} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export function Top_with_Right({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export function Left_with_Right_with_Bottom({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
            <Handle type="target" position={Position.Bottom} />
        </div>
    );
}

export function None({ data }: { data: NodeData }) {
    return (
        <div className="w-[150px] h-[50px] border border-gray-400 rounded-md bg-white flex items-center justify-center relative">
            {data.label}
        </div>
    );
}
