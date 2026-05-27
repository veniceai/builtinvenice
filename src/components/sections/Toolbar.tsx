import { useEffect, useId, useRef, useState } from 'react';
import { CheckmarkIcon, FilterIcon, SearchIcon } from '../icons';

export interface FilterOption<V extends string = string> {
  label: string;
  value: V;
}

export interface FilterControl<V extends string = string> {
  options: FilterOption<V>[];
  value: V;
  onChange: (v: V) => void;
  /** Value treated as the "no active filter" default — shown as the
      first item in the popover and used to drive the indicator dot. */
  clearValue?: V;
  /** Label for the "show all" item. Defaults to "All". */
  clearLabel?: string;
  ariaLabel?: string;
}

export interface SearchControl {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

interface Props<V extends string = string> {
  search?: SearchControl;
  filter?: FilterControl<V>;
  action?: { label: string; onClick: () => void };
}

export default function Toolbar<V extends string = string>({ search, filter, action }: Props<V>) {
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
      {filter && <FilterPopover filter={filter} />}
      {action && (
        <button type="button" className="toolbar-action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}

function FilterPopover<V extends string>({ filter }: { filter: FilterControl<V> }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverId = useId();

  const clearValue = filter.clearValue;
  const isFiltered = clearValue !== undefined && filter.value !== clearValue;
  const clearLabel = filter.clearLabel ?? 'All';

  // Items rendered in the popover, with a synthetic "All" row at the
  // top when a clearValue is configured.
  const items: { label: string; value: V }[] = [
    ...(clearValue !== undefined ? [{ label: clearLabel, value: clearValue }] : []),
    ...filter.options,
  ];

  // Close on outside click or Escape; refocus the button on Escape so
  // keyboard users keep their place.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="filter-popover-wrapper" ref={wrapperRef}>
      <button
        ref={buttonRef}
        type="button"
        className={`filter-button${isFiltered ? ' is-filtered' : ''}${open ? ' is-open' : ''}`}
        aria-label={filter.ariaLabel ?? 'Filter'}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        onClick={() => setOpen(o => !o)}
      >
        <FilterIcon />
      </button>
      {open && (
        <div
          id={popoverId}
          className="filter-popover"
          role="menu"
          aria-label={filter.ariaLabel ?? 'Filter'}
        >
          {items.map(opt => {
            const active = filter.value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                className={`filter-popover-item${active ? ' active' : ''}`}
                onClick={() => {
                  filter.onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {active && <CheckmarkIcon />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
