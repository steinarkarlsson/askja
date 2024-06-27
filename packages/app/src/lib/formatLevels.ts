export const formatLevels = (data: any) => {
    return data?.map((d: any) => {
        const parent = data?.find((p: any) => p.id === d.parentId);
        let name = d.name;
        if (parent) {
            name = `${parent.name} - ${d.name}`;
        }
        return {
            id: d.id,
            name: name,
        };
    }).sort((a: any, b: any) => a.name.localeCompare(b.name));
};
