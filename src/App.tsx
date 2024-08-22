import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import "./App.css";

// Define interface for item type
interface Item {
    task: string;
    checked: boolean;
}

function App() {
    const [item, setItem] = useState<Item>({ task: "", checked: false });
    const [items, setItems] = useState<Item[]>([]);

    // Handle checkbox events to mark item done
    function handleCheck(e: ChangeEvent<HTMLInputElement>) {
        const i = parseInt(e.currentTarget.id.split("-")[1]);
        const newItems = [...items];
        newItems[i].checked = e.currentTarget.checked;
        setItems(newItems);
    }

    // Handle delete item events
    function handleDelete(e: MouseEvent<HTMLButtonElement>) {
        const index = parseInt(e.currentTarget.id.split("-")[1]);
        const newItems = items.filter((item, i) => i !== index);

        // Fadeout
        e.currentTarget.parentElement?.classList.toggle("fade-out");

        // Set timer for setItems
        setTimeout(() => {
            setItems(newItems);
        }, 500);

        // Toggle back visibility for item id
    }

    // Handle form submission events to add new items to list
    function handleForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newItems = [...items, item];
        setItems(newItems);
        setItem({
            task: "",
            checked: false,
        });
    }

    // Handle input in the form while writing new task
    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setItem({
            task: e.currentTarget.value,
            checked: false,
        });
    }

    return (
        <article>
            <h1 className="app__header">My ToDo List</h1>

            {/* Form section to add new items */}
            <section className="app--add">
                <h2 className="app__h2">Add a new task</h2>
                <form className="app__form" onSubmit={handleForm}>
                    <input
                        type="text"
                        id="form--input"
                        name="form--input"
                        placeholder="Write new task here"
                        value={item.task}
                        onChange={handleInput}
                    />
                    <button type="submit">Save</button>
                </form>
            </section>

            {/* List section to show items */}
            <section className="app--list">
                <h2 className="app__h2">Your tasks</h2>
                <ul className="app__ul">
                    {items.map((item, i) => (
                        <li key={i} id={`item-${i}`}>
                            <input
                                type="checkbox"
                                id={`check-${i}`}
                                onChange={handleCheck}
                            />
                            <span
                                className={
                                    item.checked ? "lineThrough" : "noLine"
                                }
                            >
                                {item.task}
                            </span>
                            <button id={`delete-${i}`} onClick={handleDelete}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}

export default App;
