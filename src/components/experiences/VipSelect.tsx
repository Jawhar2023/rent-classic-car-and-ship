import { useEffect, useId, useRef, useState } from "react";

type VipSelectOption = {
  id: string;
  label: string;
};

type VipSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  options: readonly VipSelectOption[];
  onChange: (value: string) => void;
  required?: boolean;
};

export default function VipSelect({
  name,
  label,
  placeholder,
  value,
  options,
  onChange,
  required = false,
}: VipSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const selectedLabel = options.find((option) => option.id === value)?.label;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`experiences-reservation__field vip-select ${open ? "vip-select--open" : ""}`}
    >
      <span>{label}</span>
      <input type="hidden" name={name} value={value} required={required} />

      <button
        id={triggerId}
        type="button"
        className={`vip-select__trigger ${value ? "" : "vip-select__trigger--placeholder"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="vip-select__value">{selectedLabel ?? placeholder}</span>
        <span className="vip-select__chevron" aria-hidden="true" />
      </button>

      <ul className="vip-select__menu" role="listbox" aria-labelledby={triggerId}>
        {options.map((option) => {
          const isSelected = option.id === value;

          return (
            <li key={option.id} className="vip-select__option" role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`vip-select__option-button ${isSelected ? "is-selected" : ""}`}
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {isSelected ? <span className="vip-select__check" aria-hidden="true" /> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
