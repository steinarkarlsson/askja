export const mapMetaData = (data: any) => {
    return {
        createdBy: data.createdBy || data.createdby,
        updatedBy: data.updatedBy || data.updatedby,
        createdAt: data.createdAt || data.createDate || data.createdate,
        updatedAt: data.updatedAt || data.lastUpdateDate || data.lastupdatedate,
    };
};
