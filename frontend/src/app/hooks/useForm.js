import { useState } from "react";

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;

        setValues((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return {
        values,
        handleChange,
        resetForm,
        setValues,
    };
};
