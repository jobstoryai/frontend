import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Select, Spin, Tag } from 'antd';
import type { SelectProps } from 'antd/es/select';
import { observer } from 'mobx-react-lite';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  initialOptions?: { label: string, value: string | number }[]
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  color?: string;
}

const tagRenderFabric = ({ color }: { color?: string }) => (props: any) => {
  const { label, closable, onClose } = props;
  const _color = color || '#DDD'

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={_color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export const DebounceSelect = observer(<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
>({ initialOptions = [], color, fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>(initialOptions as any);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      tagRender={tagRenderFabric({ color })}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
})
