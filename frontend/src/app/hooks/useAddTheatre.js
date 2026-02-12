// hooks/useAddTheatre.js
import { useState } from "react";
import { addTheatre } from "@/api/theatre/theatre";
import { useSnackbar } from "@/context/SnackbarContext";
import { useSelector } from "react-redux";

export const useAddTheatre = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const { showSnackbar } = useSnackbar();
    const auth = useSelector((state) => state.auth);

    const submit = async (data) => {
        setLoading(true);
        const adminId = auth?.userData?.id;

        const res = await addTheatre({
            ...data,
            userId: adminId,
        });

        if (res.status === 201) {
            showSnackbar("Theatre added successfully", "success");
            onSuccess?.();
        } else {
            showSnackbar(res?.response?.data?.message || "Failed to add theatre", "error");
        }
        setLoading(false);
    };

    return { submit, loading };
};
