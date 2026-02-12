export const paginate = async (model, query = {}, options = {}) => {
    const page = parseInt(options?.page) || 1;
    const limit = parseInt(options?.limit) || 10;
    const sort = options.sort || { createdAt: -1 };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        model.find(query).skip(skip).limit(limit).sort(sort),
        model.countDocuments(query),
    ]);

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data,
    };
};
