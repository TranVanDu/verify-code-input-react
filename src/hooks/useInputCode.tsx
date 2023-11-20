import { useRef, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { REGEX_TEXT } from '../utils/regexs';
import { KEY_CODE } from '../utils/constans';

const useInputCode = (fields: number, type: string) => {
  const listRef = useRef<(HTMLInputElement | null)[]>([]);
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    setValues(fields > 0 ? Array.from(Array(fields).keys()).map(() => '') : []);
  }, [fields]);

  const code = values.join('');

  const [isComposition, setIsComposition] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (type === 'number') {
      e.target.value = e.target.value.replace(REGEX_TEXT, '');
    }

    if (e.target.value === '') {
      return;
    }

    const value = e.target.value;
    let next;

    if (value.length > 1) {
      const valueSplit = value.split('');
      const newState = [...values];

      let nextIndex = value.length + index - 1;
      if (nextIndex >= fields) {
        nextIndex = fields - 1;
      }

      valueSplit.forEach((item: string, i: number) => {
        const cursor = index + i;
        if (cursor < fields) {
          newState[cursor] = item;
        }
      });

      setValues(newState);
      next = listRef.current[nextIndex];
    } else {
      if (!isComposition) {
        const newState = [...values];
        newState[index] = e.target.value;
        setValues(newState);
        next = listRef.current[index + 1];
      }
    }

    if (next) {
      next.focus();
      next.select();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>, index: number) => {
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prev = listRef.current[prevIndex];
    const next = listRef.current[nextIndex];

    switch (e.key) {
      case KEY_CODE.backspace:
        if (values[index]) {
          const newState = [...values];
          newState[index] = '';
          setValues(newState);
        } else {
          prev?.focus();
        }
        break;
      case KEY_CODE.left:
        prev?.focus();
        break;
      case KEY_CODE.right:
        next?.focus();
        break;
    }
  };

  const handleComposition = (event: any) => {
    if (event.type === 'compositionupdate') {
      setIsComposition(false);
    } else {
      setIsComposition(true);
    }
  };

  return {
    values,
    setValues,
    listRef,
    onChange,
    onKeyDown,
    code,
    handleComposition,
  };
};

export default useInputCode;
