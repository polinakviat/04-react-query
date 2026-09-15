import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleAction = (formData: FormData) => {
    const query = formData.get('query')?.toString().trim() || '';

    if (!query) {
      toast.error('Please enter a search term!');
      return;
    }

    onSubmit(query);
  };

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
      <form className={css.form}  action={handleAction}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          autoFocus
        />
        <button type="submit">Search</button>
        </form>
        </div>
    </header>
  );
}