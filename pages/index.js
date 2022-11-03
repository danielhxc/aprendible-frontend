import styles from '/styles/Home.module.css';
import Link from "next/link";

const BookList = () => {
    return (
        <div className={styles.container}>
            <h1>Libros APP</h1>
            <Link href="/libros"
                  data-cy="link-to-books"
            >
                Lista de Libros
            </Link>
        </div>

    )
}

export default BookList