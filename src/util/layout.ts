import dagre from "dagre";
import { Node, Edge } from "@xyflow/react";

// 使用 Dagre 的多行交替对齐布局函数
export const getDagreLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    // 设置图形属性
    dagreGraph.setGraph({
        rankdir: "LR", // 从左到右
        nodesep: 200, // 节点间距
        ranksep: 100, // 行间距
        align: "UL", // 对齐方式
    });

    // 设置节点尺寸
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: 150, height: 50 });
    });

    // 添加边
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    // 计算布局
    dagre.layout(dagreGraph);

    // 获取布局后的节点位置
    const layoutedNodes = nodes.map((node, index) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        // 使用索引而不是解析ID来计算位置
        const nodesPerRow = 8;
        const rowIndex = Math.floor(index / nodesPerRow);
        const columnIndex = index % nodesPerRow;

        // 基础位置（Dagre计算的位置）
        const baseX = nodeWithPosition.x - 75; // 居中节点

        // 应用多行交替对齐规则
        let finalX = baseX;
        const finalY = 50 + rowIndex * 100; // 固定行高

        if (rowIndex % 2 === 0) {
            // 偶数行：左对齐
            finalX = 100 + columnIndex * 200;
        } else {
            // 奇数行：右对齐，从右向左
            const nodesInThisRowCount = nodes.filter((n, i) => {
                const nRowIndex = Math.floor(i / nodesPerRow);
                return nRowIndex === rowIndex;
            }).length;

            // 计算右对齐的起始位置
            const rightAlignedStartX = 100 + (nodesPerRow - 1) * 200;
            finalX = rightAlignedStartX - columnIndex * 200;
        }

        return {
            ...node,
            position: {
                x: finalX,
                y: finalY,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};

// 布局配置接口
export interface LayoutConfig {
    nodeWidth: number;
    nodeHeight: number;
    horizontalSpacing: number;
    verticalSpacing: number;
    nodesPerRow: number;
    startX: number;
    startY: number;
}

// 默认布局配置
export const defaultLayoutConfig: LayoutConfig = {
    nodeWidth: 150,
    nodeHeight: 50,
    horizontalSpacing: 200,
    verticalSpacing: 100,
    nodesPerRow: 5,
    startX: 100,
    startY: 50,
};

// 可配置的布局函数
export const getConfigurableLayoutedElements = (
    nodes: Node[],
    edges: Edge[],
    config: Partial<LayoutConfig> = {}
) => {
    const finalConfig = { ...defaultLayoutConfig, ...config };

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    // 设置图形属性
    dagreGraph.setGraph({
        rankdir: "LR",
        nodesep: finalConfig.horizontalSpacing,
        ranksep: finalConfig.verticalSpacing,
        align: "UL",
    });

    // 设置节点尺寸
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
            width: finalConfig.nodeWidth,
            height: finalConfig.nodeHeight,
        });
    });

    // 添加边
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    // 计算布局
    dagre.layout(dagreGraph);

    // 获取布局后的节点位置
    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        // 计算行号和列号
        const nodeId = parseInt(node.id);
        const rowIndex = Math.floor((nodeId - 1) / finalConfig.nodesPerRow);
        const columnIndex = (nodeId - 1) % finalConfig.nodesPerRow;

        // 基础位置（Dagre计算的位置）
        const baseX = nodeWithPosition.x - finalConfig.nodeWidth / 2;

        // 应用多行交替对齐规则
        let finalX = baseX;
        const finalY = finalConfig.startY + rowIndex * finalConfig.verticalSpacing;

        if (rowIndex % 2 === 0) {
            // 偶数行：左对齐
            finalX = finalConfig.startX + columnIndex * finalConfig.horizontalSpacing;
        } else {
            // 奇数行：右对齐，从右向左
            const nodesInThisRowCount = nodes.filter((n) => {
                const nRowIndex = Math.floor((parseInt(n.id) - 1) / finalConfig.nodesPerRow);
                return nRowIndex === rowIndex;
            }).length;

            // 计算右对齐的起始位置
            const rightAlignedStartX =
                finalConfig.startX + (finalConfig.nodesPerRow - 1) * finalConfig.horizontalSpacing;
            finalX = rightAlignedStartX - columnIndex * finalConfig.horizontalSpacing;
        }

        return {
            ...node,
            position: {
                x: finalX,
                y: finalY,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};

// 制片段自定义布局函数
export const getCustomManufacturingLayout = (nodes: Node[]) => {
    // 根据图片设计，制片段有两个并行路径
    // const positivePath = ["C021", "C022", "C023", "C030", "C040"]; // 正极路径
    // const negativePath = ["A020", "A030", "A040"]; // 负极路径

    return nodes.map((node) => {
        const nodeId = node.id;
        let position = { x: 0, y: 0 };

        if (nodeId === "C021") {
            // 正极搅拌
            position = { x: 100, y: 50 };
        } else if (nodeId === "C022") {
            // 陶瓷搅拌
            position = { x: 100, y: 150 };
        } else if (nodeId === "C023") {
            // 底涂搅拌
            position = { x: 100, y: 250 };
        } else if (nodeId === "C030") {
            // 正极涂布（汇聚点）
            position = { x: 300, y: 150 };
        } else if (nodeId === "C040") {
            // 正极辊分
            position = { x: 500, y: 150 };
        } else if (nodeId === "A020") {
            // 负极搅拌
            position = { x: 100, y: 400 };
        } else if (nodeId === "A030") {
            // 负极涂布
            position = { x: 300, y: 400 };
        } else if (nodeId === "A040") {
            // 负极辊分
            position = { x: 500, y: 400 };
        } else if (nodeId === "A050") {
            // 极片库（在底涂搅拌一行，负极辊分之后）
            position = { x: 700, y: 250 };
        }

        return {
            ...node,
            position,
        };
    });
};
