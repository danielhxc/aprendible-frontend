
import Link from "next/link";
import styles from "../../../styles/Home.module.css";

export async function getStaticProps({params}){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`);
    const data = await res.json();
    return {
        props: {
            book : data
        }
    }
}

export async function getStaticPaths(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    const data = await res.json();
    return {
        paths : data.map( book => ({
                params: { bid: String(book.id) }
            })
        ),
        fallback : false
    }
}


const BookDetail = ({book}) => {

    return (
      <div className={styles.container}>
        <h1>{book.title}</h1>

        <Link href="/libros"
              data-cy="link-to-books"
        >
            Lista de Libros
        </Link>
      </div>
  )  ;
};



export default BookDetail