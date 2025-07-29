"use client";

import "@xyflow/react/dist/style.css";
import "@xyflow/react/dist/base.css";
import React from "react";
import {
    ReactFlow,
    Background,
    BackgroundVariant,
    Controls,
    MarkerType,
} from "@xyflow/react";
import {
    Left_with_Right,
    Right_with_Left,
    Left_with_Bottom,
    Right_with_Bottom,
    Top_with_Right,
    Top_with_Left,
    Left_with_Right_with_Bottom,
    Start,
    REnd,
    LEnd,
    None,
} from "./myNode";
import { useFlowLogic } from "@/hooks/useFlowLogic";

// 定义节点类型
const nodeTypes = {
    Node_None: None,
    Node_Start: Start,
    Node_REnd: REnd,
    Node_LEnd: LEnd,
    Node_Left_with_Right: Left_with_Right,
    Node_Right_with_Left: Right_with_Left,
    Node_Left_with_Bottom: Left_with_Bottom,
    Node_Right_with_Bottom: Right_with_Bottom,
    Node_Top_with_Right: Top_with_Right,
    Node_Top_with_Left: Top_with_Left,
    Node_Left_with_Right_with_Bottom: Left_with_Right_with_Bottom,
};

export default function FlowChart() {
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        handleNodeClick,
    } = useFlowLogic();

    return (
        <div className="w-full h-full min-h-[600px] relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                defaultEdgeOptions={{
                    style: { stroke: "black", strokeWidth: 1.5 },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        color: "black",
                        width: 10,
                        height: 10,
                    },
                }}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={handleNodeClick}
                nodeTypes={nodeTypes}
                fitView={true}
                fitViewOptions={{ padding: 0.1, minZoom: 0.6, maxZoom: 0.6 }}
                panOnScroll={true}
                panOnDrag={true}
                zoomOnScroll={true}
                zoomOnPinch={true}
                zoomOnDoubleClick={false}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                minZoom={0.2}
                maxZoom={2}
                defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
                proOptions={{ hideAttribution: true }}
            >
                <Background color="#ccc" variant={BackgroundVariant.Dots} />
                <Controls showZoom={true} showFitView={true} />
            </ReactFlow>
        </div>
    );
}
