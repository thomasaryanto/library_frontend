import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable.jsx";

function BooksPage() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/rest-api/authors")
            .then((res) => res.json())
            .then(setAuthors);
    }, []);

    const authorOptions = authors.map((author) => ({
        label: author.name,
        value: author.id,
    }));

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">📚 Books Management</h1>
            <DataTable
                title="Books"
                endpoint="books"
                fields={["title", "category", "publishingYear", "author"]}
                customInputs={{
                    author: (value, onChange) => (
                        <select
                            className="border p-2 rounded"
                            value={value?.id || ""}
                            onChange={(e) => {
                                const selectedAuthor = authors.find(
                                    (a) => String(a.id) === e.target.value
                                );
                                onChange("author", selectedAuthor || null);
                            }}
                        >
                            <option value="">Select Author</option>
                            {authorOptions.map((author) => (
                                <option key={author.value} value={author.value}>
                                    {author.label}
                                </option>
                            ))}
                        </select>
                    ),
                }}
                customRender={{
                    author: (value) => value?.name || "",
                }}
            />
        </div>
    );
}

export default BooksPage;
