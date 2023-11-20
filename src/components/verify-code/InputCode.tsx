import { useEffect, PropsWithChildren, forwardRef, useImperativeHandle } from 'react';
import useInputCode from '../../hooks/useInputCode';
import './input-code.css';

export type InputCodeProps = PropsWithChildren<{
  /**
   * Allow type on input
   */
  type?: 'number' | 'text' | 'password';
  /**
   * Controls field disabled
   */
  disabled?: boolean;
  /**
   * Placeholder on input
   */
  placeholder?: string;
  /**
   * Allowed amount of characters to enter.
   */
  fields?: number;
  /**
   * Styles for input
   */
  styles?: React.CSSProperties;
  /**
   *  Container class name
   */
  containerClassName?: string;
  /**
   * Input class name
   */
  className?: string;
  /**
   * Error element
   */
  error?: React.ReactNode;
  /**
   * onKeyDownInput events
   */
  onKeyDownInput?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Optional change code handler
   */
  onTriggerChange?: (value: string) => void;
}>;

const InputCode = forwardRef(
  (
    {
      error,
      styles,
      children,
      onKeyDownInput,
      disabled = false,
      fields = 6,
      type = 'number',
      onTriggerChange,
      containerClassName = '',
      className = '',
      placeholder = '',
    }: InputCodeProps,
    ref
  ) => {
    const { values, listRef, onChange, onKeyDown, code, handleComposition } = useInputCode(fields, type);

    useEffect(() => {
      onTriggerChange?.(code);
    }, [code, onTriggerChange]);

    useImperativeHandle(
      ref,
      () => {
        return { value: code };
      },
      [code]
    );

    const nType = type !== 'number' ? type : 'text';

    return (
      <div className={`wrap-input-code ${containerClassName}`}>
        {values.map((item, index: number) => (
          <input
            type={nType}
            key={index}
            placeholder={placeholder}
            ref={(el) => (listRef.current[index] = el)}
            className={`input-code ${className}`}
            value={item}
            onChange={(e) => onChange(e, index)}
            onKeyDown={(e) => {
              onKeyDown(e, index);
              onKeyDownInput?.(e);
            }}
            onCompositionStart={(e) => handleComposition(e)}
            onCompositionUpdate={(e) => handleComposition(e)}
            onCompositionEnd={(e) => handleComposition(e)}
            style={styles}
            disabled={disabled}
          />
        ))}
        {error}
        {children}
      </div>
    );
  }
);

export default InputCode;
