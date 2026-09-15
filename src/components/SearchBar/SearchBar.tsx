import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface FormValues {
  query: string;
}

const validationSchema = Yup.object({
  query: Yup.string().trim().required('Введіть текст для пошуку'),
});

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const initialValues: FormValues = { query: '' };

  return (
      <header className={css.header}>
          <div className={css.container}>
              <a
                    className={css.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values.query.trim());
        }}
      >
        {/* Всі елементи обов'язково загорнуті в один компонент <Form> */}
        <Form className={css.form} >
          <Field
            type="text"
            name="query"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">Search</button>
          <ErrorMessage name="query" component="div" className="error" />
        </Form>
          </Formik>
          </div>
    </header>
  );
}