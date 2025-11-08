'use client';

import { useUrlState } from '@/hook/use-url-state';
import useDebounceEffect from 'ahooks/lib/useDebounceEffect';
import useUpdateEffect from 'ahooks/lib/useUpdateEffect';
import { useState } from 'react';
import { Input } from './ui/input';

export default function TaskSearchInput(props: { searchKey: string; searchValue?: string }) {
  const [value, setValue] = useState(props.searchValue || '');

  useUpdateEffect(() => {
    setValue(props.searchValue || '');
  }, [props.searchValue]);

  const { setUrlState, deleteUrlState } = useUrlState();

  useDebounceEffect(
    () => {
      if (value === '') {
        deleteUrlState(props.searchKey);
      } else {
        setUrlState({ [props.searchKey]: value });
      }
    },
    [value],
    {
      wait: 500,
    }
  );

  return (
    <div>
      <Input
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
