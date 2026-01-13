
import React from 'react';
import { Search, X } from 'lucide-react';
import Input from '../atoms/Input';
import { cn } from '../../lib/utils';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  className,
  placeholder = 'Buscar...',
  ...props
}) => {
  return (
    <div className={cn('relative w-full', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10 bg-card/50 border-border"
        {...props}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"
          type="button"
          aria-label="Limpar busca"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
