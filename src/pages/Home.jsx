import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable.jsx";

function HomePage() {
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://thomasariyanto.com:8080/rest-api/books").then((res) => res.json()).then(setBooks);
        fetch("http://thomasariyanto.com:8080/rest-api/members").then((res) => res.json()).then(setMembers);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetch(`http://thomasariyanto.com:8080/rest-api/borrow?search=${search}`)
                .then((res) => res.json())
                .then(setBorrowedBooks);
        }, 300);
        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        refreshBorrowedBooks();
    }, [search]);

    const refreshBorrowedBooks = () => {
        fetch(`http://thomasariyanto.com:8080/rest-api/borrow?search=${search}`)
            .then((res) => res.json())
            .then(setBorrowedBooks);
    };

    const bookMap = Object.fromEntries(books.map((b) => [String(b.id), b.title]));
    const memberMap = Object.fromEntries(members.map((m) => [String(m.id), m.name]));

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🏛️ SRIN Library</h1>

            {/* 🔍 Search Box */}
            <input
                type="text"
                placeholder="Search borrowed books by title, member, or borrow date"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 border p-2 w-full rounded"
            />

            <DataTable
                title="Borrowed Books"
                endpoint="borrow"
                data={borrowedBooks}
                onChange={refreshBorrowedBooks}
                fields={["book", "member", "borrowDate", "returnDate"]}
                transformBeforeSubmit={(form) => ({
                    ...form,
                    book: { id: parseInt(form.book?.id || form.book) },
                    member: { id: parseInt(form.member?.id || form.member) },
                })}
                customInputs={{
                    book: (value, onChange) => (
                        <select
                            className="border p-2 w-full rounded"
                            value={value?.id || value || ""}
                            onChange={(e) =>
                                onChange("book", books.find((b) => b.id === parseInt(e.target.value)))
                            }
                        >
                            <option value="">Select Book</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                    ),
                    member: (value, onChange) => (
                        <select
                            className="border p-2 w-full rounded"
                            value={value?.id || value || ""}
                            onChange={(e) =>
                                onChange("member", members.find((m) => m.id === parseInt(e.target.value)))
                            }
                        >
                            <option value="">Select Member</option>
                            {members.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name}
                                </option>
                            ))}
                        </select>
                    ),
                    borrowDate: (value, onChange) => (
                        <input
                            type="date"
                            className="border p-2 rounded"
                            value={value || ""}
                            onChange={(e) => onChange("borrowDate", e.target.value)}
                        />
                    ),
                    returnDate: (value, onChange) => (
                        <input
                            type="date"
                            className="border p-2 rounded"
                            value={value || ""}
                            onChange={(e) => onChange("returnDate", e.target.value)}
                        />
                    ),
                }}
                customRender={{
                    book: (value) => value?.title || "",
                    member: (value) => value?.name || "",
                }}
            />

        </div>
    );
}

export default HomePage;
