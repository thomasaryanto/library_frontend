import React from "react";
import DataTable from "../components/DataTable.jsx";

export default function MembersPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">👤 Members Management</h1>
            <DataTable title="Members" endpoint="members" fields={["name", "email", "phone"]} />
        </div>
    );
}
