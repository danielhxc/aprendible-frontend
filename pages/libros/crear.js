import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";

const BookCreate = () => {
    const router = useRouter();
    const [bookTitle, setBookTitle] = useState('');
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
            method: 'POST',
            headers: {
                accept : 'aplication/json',
                'content-type' : 'aplication/json'
            },
            body: JSON.stringify({
               title: bookTitle
            })
        })
        if (res.ok){
            setErrors([])
            setBookTitle('')
            return router.push('/libros')
        }
        const data = await res.json();
        setErrors(data.errors)
        setSubmitting(false)
    }

    return (
        <div>
            <h1>Crear Libro</h1>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    data-cy="input-book-title"
                    onChange={(e) => setBookTitle(e.target.value)}
                    value={bookTitle}
                    disabled={submitting}
                    type="text"
                />
                <button
                    data-cy="button-submit-book"
                    disabled={submitting}
                >
                    {submitting ? 'Enviando...' : 'Enviar'}
                </button>
                {errors.title && (
                    <span style={{color: 'red', display: 'block'}}>
                        {errors.title}
                    </span>
                )}
            </form>
            <br/>
            <Link href="/libros">Lista de Libro</Link>
        </div>

    )
};

export default BookCreate