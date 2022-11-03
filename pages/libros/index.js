import styles from '/styles/Home.module.css';
import Link from "next/link";

export async function getStaticProps(){

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
    const data = await res.json();
    return {
        props: {
            books : data
        }
    }
}

const BookList = ({ books }) => {

    async function handleDelete(e, BookId){
        e.preventDefault()
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${BookId}`, {
            method: 'POST',
            headers: {
                accept : 'aplication/json',
                'content-type' : 'aplication/json'
            },
            body: JSON.stringify({
                _method: 'DELETE'
            }),
        })
        if (res.ok){
            window.location.href = "/libros"
        }

    }

    return (
        <div className={styles.container}>
            <h1>Libros</h1>
            <ul data-cy="book-list">
                {books.map( book => (
                    <li key={`{book-${book.id}`}>
                    <Link
                        href={`/libros/${book.id}`}
                        data-cy={`link-to-visit-book-${book.id}`}
                    >
                        {book.title}
                    </Link>
                        {' - '}
                        <Link href={`/libros/${book.id}/editar`}
                              data-cy={`link-to-edit-book-${book.id}`}
                        >
                            Editar
                        </Link>
                        { ' - '}
                        <form
                            onSubmit={(e) => handleDelete(e, book.id)}
                            style={{display: 'inline'}}>
                            <button
                                data-cy={`link-to-delete-book-${book.id}`}
                            >
                                Eliminar
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
            <Link href="/libros/crear"
            >
                Crear de Libros
            </Link>
        </div>

    )
}

export default BookList