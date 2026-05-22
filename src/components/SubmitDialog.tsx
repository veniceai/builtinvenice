import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { submissionTypes, buildIssueUrl, type SubmissionType, type FieldConfig } from '../submitSchemas';
import { REPO_URL } from '../constants';
import ImageField from './ImageField';

const UPLOAD_TIMEOUT_MS = 30_000;

async function uploadThumbnail(blob: Blob): Promise<string> {
  const apiKey = import.meta.env.VITE_IMGBB_KEY;
  if (!apiKey) {
    throw new Error('Thumbnail upload not configured (VITE_IMGBB_KEY missing)');
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), UPLOAD_TIMEOUT_MS);
  const formData = new FormData();
  formData.append('image', blob);
  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`Upload failed (HTTP ${res.status})`);
    const data = await res.json();
    if (!data?.success || !data.data?.url) throw new Error('Unexpected upload response');
    return data.data.url as string;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('Upload timed out after 30 s');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

interface Props {
  onClose: () => void;
  initialKey?: SubmissionType['key'];
}

const ESC_KEY = 'Escape';

// Component is unmounted when the dialog closes (App.tsx renders it
// conditionally), so initial state can be lazy-init'd from props rather
// than reset via an effect.
export default function SubmitDialog({ onClose, initialKey }: Props) {
  const [selectedKey, setSelectedKey] = useState<SubmissionType['key'] | null>(
    initialKey ?? null,
  );
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Capture the trigger element and lock scroll once on mount; restore on unmount.
  // Kept separate from the step-focus effect so navigating between steps doesn't
  // briefly return focus to the page trigger.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      previouslyFocused.current?.focus?.();
    };
  }, []);

  // Move focus to the first interactive element whenever the active step changes.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const target = firstFocusableRef.current ?? dialogRef.current;
      target?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [selectedKey]);

  // Esc to close + focus trap.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ESC_KEY) {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const selected = useMemo(
    () => submissionTypes.find(t => t.key === selectedKey) ?? null,
    [selectedKey],
  );

  const visibleFields = selected
    ? selected.fields.filter(f => !f.showWhen || f.showWhen(values))
    : [];

  const setValue = (id: string, v: string) => {
    setValues(prev => ({ ...prev, [id]: v }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const validate = (): boolean => {
    if (!selected) return false;
    const next: Record<string, string> = {};
    for (const f of visibleFields) {
      if (f.required && !values[f.id]?.trim()) {
        next[f.id] = 'Required';
      }
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Scroll the first error into view.
      const firstId = Object.keys(next)[0];
      requestAnimationFrame(() => {
        document.getElementById(`field-${firstId}`)?.focus();
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    if (!validate()) return;

    let finalValues = values;
    if (imageBlob) {
      setUploading(true);
      setUploadError(null);
      try {
        const thumbnailUrl = await uploadThumbnail(imageBlob);
        finalValues = { ...values, screenshot: `![thumbnail](${encodeURI(thumbnailUrl)})` };
      } catch (err) {
        setUploadError(
          err instanceof Error
            ? `${err.message}. Submit without thumbnail, or retry.`
            : 'Upload failed. Submit without thumbnail, or retry.',
        );
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const url = buildIssueUrl(REPO_URL, selected, finalValues);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const submitWithoutImage = () => {
    if (!selected) return;
    if (!validate()) return;
    setImageBlob(null);
    setUploadError(null);
    const url = buildIssueUrl(REPO_URL, selected, values);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const titleId = 'submit-dialog-title';

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="dialog"
        tabIndex={-1}
      >
        <header className="dialog-header">
          {selected && (
            <button
              type="button"
              className="dialog-back"
              onClick={() => {
                setSelectedKey(null);
                setErrors({});
                setImageBlob(null);
              }}
              aria-label="Back to submission types"
            >
              ← Back
            </button>
          )}
          <h2 id={titleId} className="dialog-title">
            {selected ? `Submit a ${selected.label}` : 'What are you submitting?'}
          </h2>
          <button
            type="button"
            className="dialog-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        {!selected ? (
          <div className="dialog-body">
            <p className="dialog-lede">
              Pick a type. We'll prefill a GitHub issue you can review and submit.
            </p>
            <div className="type-grid">
              {submissionTypes.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  className="type-card"
                  ref={el => {
                    if (i === 0) firstFocusableRef.current = el;
                  }}
                  onClick={() => setSelectedKey(t.key)}
                >
                  <span className="type-card-label">{t.label}</span>
                  <span className="type-card-blurb">{t.blurb}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form className="dialog-body submit-form" onSubmit={handleSubmit} noValidate>
            <p className="dialog-lede">{selected.blurb}</p>
            <div className="submit-fields">
              {visibleFields.map((field, i) => {
                if (field.type === 'image') {
                  return (
                    <ImageField
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      description={field.description}
                      onBlobChange={setImageBlob}
                    />
                  );
                }
                return (
                  <Field
                    key={field.id}
                    field={field}
                    value={values[field.id] ?? ''}
                    error={errors[field.id]}
                    onChange={v => setValue(field.id, v)}
                    inputRef={el => {
                      if (i === 0) firstFocusableRef.current = el;
                    }}
                  />
                );
              })}
            </div>

            <div className="submit-actions">
              <p className="submit-actions-note">
                You'll review and submit on GitHub. Maintainers add it to the site.
              </p>
              {uploadError && (
                <div className="upload-error">
                  <p>{uploadError}</p>
                  <button type="button" className="btn-secondary" onClick={submitWithoutImage}>
                    Submit without thumbnail
                  </button>
                </div>
              )}
              <div className="submit-actions-buttons">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={uploading}>
                  {uploading ? 'Uploading thumbnail…' : 'Open prefilled issue →'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface FieldProps {
  field: FieldConfig;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  inputRef?: (el: HTMLElement | null) => void;
}

function Field({ field, value, error, onChange, inputRef }: FieldProps) {
  const id = `field-${field.id}`;
  const descId = field.description ? `${id}-desc` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [descId, errId].filter(Boolean).join(' ') || undefined;
  const invalid = Boolean(error);

  return (
    <div className={`form-field ${invalid ? 'has-error' : ''}`}>
      <label htmlFor={id} className="form-label">
        {field.label}
        {field.required && <span className="form-required" aria-hidden="true"> *</span>}
      </label>
      {field.description && (
        <p id={descId} className="form-help">{field.description}</p>
      )}
      {field.type === 'textarea' ? (
        <textarea
          id={id}
          ref={el => inputRef?.(el)}
          className="form-input form-textarea"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          rows={3}
        />
      ) : field.type === 'select' ? (
        <select
          id={id}
          ref={el => inputRef?.(el)}
          className="form-input form-select"
          value={value}
          onChange={e => onChange(e.target.value)}
          required={field.required}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        >
          <option value="">Select…</option>
          {field.options?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          ref={el => inputRef?.(el)}
          className="form-input"
          type={field.type === 'date' ? 'date' : 'text'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />
      )}
      {error && (
        <p id={errId} className="form-error">{error}</p>
      )}
    </div>
  );
}
