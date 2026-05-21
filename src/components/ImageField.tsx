import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from 'react';
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface Props {
  id: string;
  label: string;
  description?: string;
  onBlobChange: (blob: Blob | null) => void;
}

const ASPECT = 16 / 9;
const OUTPUT_WIDTH = 1200; // produces 1200×675 PNG
const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20 MB

export default function ImageField({ id, label, description, onBlobChange }: Props) {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [sizeError, setSizeError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > MAX_FILE_BYTES) {
      setSizeError(`Image too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 20 MB.`);
      e.target.value = '';
      return;
    }
    setSizeError(null);
    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result?.toString() ?? '');
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop({ unit: '%', width: 90 }, ASPECT, width, height),
        width,
        height,
      ),
    );
  };

  const reset = useCallback(() => {
    setImgSrc('');
    setCrop(undefined);
    setCompletedCrop(undefined);
    setSizeError(null);
    onBlobChange(null);
  }, [onBlobChange]);

  // Render cropped output to a canvas at 1200×675 and emit a PNG Blob.
  useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      onBlobChange(null);
      return;
    }
    const img = imgRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const canvas = document.createElement('canvas');
    canvas.width = OUTPUT_WIDTH;
    canvas.height = Math.round(OUTPUT_WIDTH / ASPECT);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      img,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    canvas.toBlob((blob) => onBlobChange(blob), 'image/png');
  }, [completedCrop, onBlobChange]);

  const inputId = `field-${id}`;
  const descId = description ? `${inputId}-desc` : undefined;

  return (
    <div className="form-field image-field">
      <span className="form-label">{label}</span>
      {description && <p id={descId} className="form-help">{description}</p>}

      {!imgSrc ? (
        <label htmlFor={inputId} className="image-drop">
          <input
            id={inputId}
            type="file"
            accept="image/*"
            onChange={onFileSelect}
            aria-describedby={descId}
          />
          <span className="image-drop-cta">Drop an image or click to browse</span>
          <span className="image-drop-hint">16:9 · cropped client-side · 1200×675 PNG · max 20 MB</span>
          {sizeError && <span className="form-error">{sizeError}</span>}
        </label>
      ) : (
        <div className="image-crop-wrapper">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={ASPECT}
            minWidth={200}
            keepSelection
          >
            <img ref={imgRef} src={imgSrc} alt="" onLoad={onImageLoad} />
          </ReactCrop>
          <button type="button" className="btn-secondary image-remove" onClick={reset}>
            Remove image
          </button>
        </div>
      )}
    </div>
  );
}
