import React, { useEffect, useState } from "react";

function DataTable({
                         title,
                         endpoint,
                         fields,
                         data = null,
                         customInputs = {},
                         customRender = {},
                         transformBeforeSubmit = (f) => f,
                         onChange = () => {},
                     }) {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({});
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        if (data) {
            setItems(data);
        } else {
            fetchData();
        }
    }, [data, endpoint]);

    const fetchData = () => {
        fetch(`http://thomasariyanto.com:8080/rest-api/${endpoint}`)
            .then((res) => res.json())
            .then(setItems);
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        const method = editId ? "PUT" : "POST";
        const url = editId
            ? `http://thomasariyanto.com:8080/rest-api/${endpoint}/${editId}`
            : `http://thomasariyanto.com:8080/rest-api/${endpoint}`;

        const bodyData = transformBeforeSubmit(form);

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData),
        }).then(() => {
            setForm({});
            setEditId(null);
            if (!data) {
                fetchData();
            } else {
                onChange();
            }
        });
    };

    const handleEdit = (item) => {
        setForm(item);
        setEditId(item.id);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure want to delete? All item related with this data will be deleted too!");
        if (!confirmed) return;

        fetch(`http://thomasariyanto.com:8080/rest-api/${endpoint}/${id}`, {
            method: "DELETE",
        }).then(() => {
            if (!data) {
                fetchData();
            } else {
                onChange();
            }
        });
    };


    return (
        <div className="mb-6 border p-4 rounded">
            <h2 className="text-xl font-bold mb-2">New {title}</h2>

            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                {fields.map((field) =>
                    customInputs[field] ? (
                        <div key={field}>
                            {customInputs[field](form[field], handleChange)}
                        </div>
                    ) : (
                        <input
                            key={field}
                            className="border p-2 rounded w-full"
                            placeholder={field}
                            value={form[field] || ""}
                            onChange={(e) => handleChange(field, e.target.value)}
                        />
                    )
                )}
            </div>

            <button
                className="mt-2 px-4 py-2 bg-blue-600 text-black rounded "
                onClick={handleSubmit}
            >
                {editId ? "Edit" : "Add"}
            </button>
            <p className="mt-2 py-2"><hr /></p>
            <h2 className="text-xl font-bold mb-2">List Of {title}</h2>

            <div className="mt-4 overflow-auto">
                <table className="w-full border">
                    <thead>
                    <tr className="bg-gray-100">
                        {fields.map((field) => (
                            <th key={field} className="border p-2">
                                {field}
                            </th>
                        ))}
                        <th className="border p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            {fields.map((field) => (
                                <td key={field} className="border p-2">
                                    {customRender[field]
                                        ? customRender[field](item[field], item)
                                        : item[field]}
                                </td>
                            ))}
                            <td className="border p-2">
                                <button
                                    className="text-blue-600 mr-2"
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-600"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;
