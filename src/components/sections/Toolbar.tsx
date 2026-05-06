import { SearchIcon } from '../icons';

export interface FilterOption<V extends string = string> {
  label: string;
  value: V;
}

export interface FilterControl<V extends string = string> {
  options: FilterOption<V>[];
  value: V;
  onChange: (v: V) => void;
  // Value used when toggling an active segment off. If omitted, segments
  // can't be deselected (one is always active).
  clearValue?: V;
  ariaLabel?: string;
}

export interface SearchControl {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

interface Props {
  search?: SearchControl;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: FilterControl<any>;
  action?: { label: string; onClick: () => void };
}

export default function Toolbar({ search, filter, action }: Props) {
  return (
    <div className="explore-toolbar">
      {search && (
        <label className="toolbar-search">
          <SearchIcon />
          <input
            type="search"
            value={search.value}
            onChange={e => search.onChange(e.target.value)}
            placeholder={search.placeholder ?? 'Search…'}
            aria-label={search.placeholder ?? 'Search'}
          />
          {search.value && (
            <button
              type="button"
              className="toolbar-search-clear"
              onClick={() => search.onChange('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>
      )}
      {filter && (
        <div
          className="toolbar-segment"
          role="group"
          aria-label={filter.ariaLabel ?? 'Filter'}
        >
          {filter.options.map(opt => {
            const active = filter.value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                className={`segment ${active ? 'active' : ''}`}
                onClick={() => {
                  if (active && filter.clearValue !== undefined) {
                    filter.onChange(filter.clearValue);
                  } else {
                    filter.onChange(opt.value);
                  }
                }}
                aria-pressed={active}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
      {action && (
        <button type="button" className="toolbar-action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
