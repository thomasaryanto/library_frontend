import React from "react";
import DataTable from "../components/DataTable.jsx";

export default function AuthorsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">✍️ Authors Management</h1>
            <DataTable title="Authors" endpoint="authors" fields={["name"]} />
        </div>
    );
}
