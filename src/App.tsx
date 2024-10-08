import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import "./App.css";

// Define interface for item type
interface Item {
    task: string;
    checked: boolean;
    isFading: boolean;
}

function App() {
    const [item, setItem] = useState<Item>({
        task: "",
        checked: false,
        isFading: false,
    });
    const [items, setItems] = useState<Item[]>([]);

    // Handle checkbox events to mark item done
    function handleCheck(e: ChangeEvent<HTMLInputElement>) {
        const i = parseInt(e.currentTarget.id.split("-")[1]);
        const newItems = [...items];
        newItems[i].checked
            ? (newItems[i].checked = false)
            : (newItems[i].checked = true);
        setItems(newItems);
    }

    // Handle delete item events
    function handleDelete(e: MouseEvent<HTMLButtonElement>) {
        const index = parseInt(e.currentTarget.id.split("-")[1]);

        // Change isFading to true for item to delete
        const fadingItems = [...items];
        fadingItems[index].isFading = true;
        setItems(fadingItems);

        // Wait, then setItems list with item removed and fading false
        setTimeout(() => {
            const newItems = items.filter((item, i) => i !== index);
            setItems(newItems);
        }, 500);
    }

    // Handle form submission events to add new items to list
    function handleForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newItems = [...items, item];
        setItems(newItems);
        setItem({
            task: "",
            checked: false,
            isFading: false,
        });
    }

    // Handle input in the form while writing new task
    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setItem({
            task: e.currentTarget.value,
            checked: false,
            isFading: false,
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
                        <li
                            key={i}
                            className={
                                item.isFading ? "fade-out app__li" : "app__li"
                            }
                            id={`item-${i}`}
                        >
                            <input
                                type="checkbox"
                                id={`check-${i}`}
                                onChange={handleCheck}
                                checked={item.checked}
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
