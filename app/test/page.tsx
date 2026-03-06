'use client';

import { Button } from '@/components/ui/button';
import { TwitterIcon, YoutubeIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

// SocialMedia
function SocialMedia() {
  return (
    <div className="flex m-4 gap-4">
      <a
        className="social-media"
        data-name="Twitter"
        style={{ '--color': 'var(--color-blue-600)' } as React.CSSProperties}
      >
        <TwitterIcon className="rounded-full bg-blue-600 p-4 size-14 text-white" />
      </a>

      <a
        className="social-media"
        data-name="Youtube"
        style={{ '--color': 'var(--color-red-600)' } as React.CSSProperties}
      >
        <YoutubeIcon className="rounded-full bg-red-600 p-4 size-14 text-white" />
      </a>
    </div>
  );
}

// SetList
type Option = {
  id: number;
  name: string;
};

const OPTIONS: Option[] = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 2, name: 'C' },
  { id: 3, name: 'D' },
  { id: 3, name: 'E' },
  { id: 5, name: 'F' },
];

function SetList() {
  const [selectedOptionIds, setSelectedOptionIds] = useState(new Set<number>());
  const [selectedOptionIds2, setSelectedOptionIds2] = useState<Map<number, Option>>(new Map());
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  function toggleOption(option: Option, index: number) {
    // Duplicated List
    setSelectedIndexes((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }

      return [...prev, index]; // pushed to end = click order
    });

    // Ordered list
    setSelectedOptionIds2((prev) => {
      const next = new Map(prev);

      next.has(option.id) ? next.delete(option.id) : next.set(option.id, option);

      return next;
    });

    // Unique list
    setSelectedOptionIds((prev) => {
      const idSet = new Set(prev);

      idSet.has(option.id) ? idSet.delete(option.id) : idSet.add(option.id);

      return idSet;
    });
  }

  const selectedOptions = selectedIndexes.map((index) => OPTIONS[index]);

  const uniqueSelectedOptions2 = useMemo(
    () => selectedOptionIds2.values().toArray(),
    [selectedOptionIds]
  );

  const uniqueSelectedOptions = useMemo(() => {
    const seen = new Set<number>();
    const result = [];

    for (const option of OPTIONS) {
      if (selectedOptionIds.has(option.id) && !seen.has(option.id)) {
        seen.add(option.id);
        result.push(option);
      }
    }

    return result;
  }, [selectedOptionIds]);

  function reset() {
    setSelectedOptionIds((prev) => {
      prev.clear();
      return new Set();
    });
    setSelectedOptionIds2((prev) => {
      prev.clear();
      return new Map();
    });
    setSelectedIndexes([]);
  }

  return (
    <div className="space-y-4">
      <Button className="w-full" variant={'secondary'} onClick={reset}>
        Reset
      </Button>
      <div className="flex gap-4">
        <ul>
          <li className="underline underline-offset-8 font-medium mb-2 text-blue-600">
            Source
          </li>
          {OPTIONS.map((o, i) => (
            <li
              key={'source' + i + o.id}
              className="p-2 cursor-pointer bg-blue-50 hover:bg-blue-200"
              onClick={() => toggleOption(o, i)}
            >
              {JSON.stringify(o)}
            </li>
          ))}
        </ul>

        <ul>
          <li className="underline underline-offset-8 font-medium mb-2 text-red-600">
            Unique Selection 1
          </li>
          {uniqueSelectedOptions.map((o, i) => (
            <li key={'selected' + o.id} className="p-2 bg-blue-50">
              {JSON.stringify(o)}
            </li>
          ))}
        </ul>

        <ul>
          <li className="underline underline-offset-8 font-medium mb-2 text-red-600">
            Uinque Selection 2
          </li>
          {uniqueSelectedOptions2.map((o, i) => (
            <li key={'selected' + i + o.id} className="p-2 bg-blue-50">
              {JSON.stringify(o)}
            </li>
          ))}
        </ul>

        <ul>
          <li className="underline underline-offset-8 font-medium mb-2 text-red-600">
            Selection with click order
          </li>
          {selectedOptions.map((o, i) => (
            <li key={'selected' + i + o.id} className="p-2 bg-blue-50">
              {JSON.stringify(o)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col items-center gap-8 divide-red-50">
      <SocialMedia />
      <SetList />
    </div>
  );
}
