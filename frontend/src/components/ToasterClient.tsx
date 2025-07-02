'use client'
import { Toaster } from "react-hot-toast";

export default function ToasterClient() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                    zIndex: 99999999, // pastikan di atas
                },
            }}
        />
    );
}
