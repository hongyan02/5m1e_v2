const base_url = "http://10.22.161.62:8083";

// 获取产线信息
export const getProdLine = async (material_lot_code: string) => {
    const response = await fetch(`${base_url}/api/5m1e/prod-line`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ material_lot_code }),
    });
    return response.json();
};
