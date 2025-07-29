import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    useNodesState,
    useEdgesState,
    Node,
} from "@xyflow/react";
import { getDagreLayoutedElements, getCustomManufacturingLayout } from "@/util/layout";
import { initialNodes, initialEdges } from "@/config/flowData";
import { NodeData } from "@/components/flow/myNode";

export const useFlowLogic = () => {
    const router = useRouter();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    // 应用自动布局
    useEffect(() => {
        // 分别处理每个组的节点
        const group0Nodes = initialNodes.filter((node) => node.parentId === "0");
        const group1Nodes = initialNodes.filter((node) => node.parentId === "1");
        const group2Nodes = initialNodes.filter((node) => node.parentId === "2");
        const group3Nodes = initialNodes.filter((node) => node.parentId === "3");
        const group4Nodes = initialNodes.filter((node) => node.parentId === "4");

        // 为每个组筛选对应的连接
        const group1Edges = initialEdges.filter((edge) => {
            const sourceNode = initialNodes.find((n) => n.id === edge.source);
            const targetNode = initialNodes.find((n) => n.id === edge.target);
            return sourceNode?.parentId === "1" && targetNode?.parentId === "1";
        });

        const group2Edges = initialEdges.filter((edge) => {
            const sourceNode = initialNodes.find((n) => n.id === edge.source);
            const targetNode = initialNodes.find((n) => n.id === edge.target);
            return sourceNode?.parentId === "2" && targetNode?.parentId === "2";
        });

        const group3Edges = initialEdges.filter((edge) => {
            const sourceNode = initialNodes.find((n) => n.id === edge.source);
            const targetNode = initialNodes.find((n) => n.id === edge.target);
            return sourceNode?.parentId === "3" && targetNode?.parentId === "3";
        });

        const group4Edges = initialEdges.filter((edge) => {
            const sourceNode = initialNodes.find((n) => n.id === edge.source);
            const targetNode = initialNodes.find((n) => n.id === edge.target);
            return sourceNode?.parentId === "4" && targetNode?.parentId === "4";
        });

        // 为组装段、化成段、包装段使用Dagre布局
        const { nodes: layoutedGroup1Nodes } = getDagreLayoutedElements(group1Nodes, group1Edges);
        const { nodes: layoutedGroup2Nodes } = getDagreLayoutedElements(group2Nodes, group2Edges);
        const { nodes: layoutedGroup3Nodes } = getDagreLayoutedElements(group3Nodes, group3Edges);
        const { nodes: layoutedGroup4Nodes } = getDagreLayoutedElements(group4Nodes, group4Edges);

        // 为制片段使用自定义布局（根据图片设计）
        const layoutedGroup0Nodes = getCustomManufacturingLayout(group0Nodes);

        // 更新节点位置，保持父组关系
        const updatedNodes = initialNodes.map((node) => {
            if (node.type === "group") return node; // 保持组节点不变

            let layoutedNode;
            if (node.parentId === "0") {
                layoutedNode = layoutedGroup0Nodes.find((n: Node) => n.id === node.id);
            } else if (node.parentId === "1") {
                layoutedNode = layoutedGroup1Nodes.find((n: Node) => n.id === node.id);
            } else if (node.parentId === "2") {
                layoutedNode = layoutedGroup2Nodes.find((n: Node) => n.id === node.id);
            } else if (node.parentId === "3") {
                layoutedNode = layoutedGroup3Nodes.find((n: Node) => n.id === node.id);
            } else if (node.parentId === "4") {
                layoutedNode = layoutedGroup4Nodes.find((n: Node) => n.id === node.id);
            }

            return layoutedNode ? { ...node, position: layoutedNode.position } : node;
        });

        setNodes(updatedNodes);
    }, [setNodes]);

    const handleNodeClick = (_: React.MouseEvent, node: Node) => {
        // 跳过组节点
        if (node.type === "group") {
            return;
        }

        const url = (node.data as unknown as NodeData)?.url;
        if (url && url.startsWith("/")) {
            router.push(url);
        }
    };

    return {
        // 状态
        nodes,
        edges,
        // 事件处理
        onNodesChange,
        onEdgesChange,
        handleNodeClick,
    };
};