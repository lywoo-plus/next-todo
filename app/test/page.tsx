'use client';

import { Button } from '@/components/ui/button';
import { TwitterIcon, YoutubeIcon } from 'lucide-react';
import { AnimatePresence, motion, stagger, Variants } from 'motion/react';
import { useMemo, useRef, useState } from 'react';

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

function FlexBox1() {
  const container = useRef<HTMLDivElement>(null);

  const cardWidth = container.current?.firstElementChild?.clientWidth ?? 0;

  function scrollNext() {
    container.current?.scrollBy({ left: cardWidth * 0.8, behavior: 'smooth' });
  }

  function scrollPrev() {
    container.current?.scrollBy({ left: -cardWidth * 0.8, behavior: 'smooth' });
  }

  return (
    <div>
      <div
        ref={container}
        className="flex flex-nowrap h-36 overflow-auto snap-x  w-xl border border-red-500 gap-4"
      >
        <div className="aspect-video snap-start shrink-0 bg-blue-400"></div>
        <div className="aspect-video snap-start shrink-0 bg-blue-400"></div>
        <div className="aspect-video snap-start shrink-0 bg-blue-400"></div>
        <div className="aspect-video snap-start shrink-0 bg-blue-400"></div>
        <div className="aspect-video snap-start shrink-0 bg-blue-400"></div>
      </div>
      <div className="flex justify-between">
        <button onClick={scrollPrev}>Prev</button>
        <button onClick={scrollNext}>Next</button>
      </div>
    </div>
  );
}

function FlexBox2() {
  return (
    <div className="flex gap-4 flex-wrap border p-4 justify-center">
      <div className="bg-green-500 h-32 aspect-[3/2]"></div>
      <div className="bg-green-500 h-32 aspect-[3/2]"></div>
      <div className="bg-green-500 h-32 aspect-[3/2]"></div>
      <div className="bg-green-500 h-32 aspect-[3/2]"></div>
      <div className="bg-green-500 h-32 aspect-[3/2]"></div>
    </div>
  );
}

function GridBox() {
  return (
    <div className="grid w-full gap-4 place-items-center grid-cols-[repeat(auto-fill,minmax(200px,1fr))] border p-4">
      <div className="bg-green-500 flex w-32 aspect-video"></div>
      <div className="bg-green-500 flex w-32 aspect-video"></div>
      <div className="bg-green-500 flex w-32 aspect-video"></div>
      <div className="bg-green-500 flex w-32 aspect-video"></div>
      <div className="bg-green-500 flex w-32 aspect-video"></div>
    </div>
  );
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: stagger(0.5, { from: 'center' }) } },
};

const item: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

function MotionAnimation() {
  const dragContainer = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeIn' }}
      >
        <h1 className="text-2xl font-medium">Hello</h1>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.9, y: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        <Button variant={'default'}>Click me</Button>
      </motion.div>

      {/* Varaints and children staggering */}
      <motion.ul variants={container} initial="hidden" animate="visible">
        <motion.li variants={item}>Item 1</motion.li>
        <motion.li variants={item}>Item 2</motion.li>
        <motion.li variants={item}>Item 3</motion.li>
      </motion.ul>

      {/* Dragable component  */}
      <div ref={dragContainer} className="border p-16">
        <motion.div drag dragConstraints={dragContainer} dragElastic={0.2}>
          <Button>Drag me</Button>
        </motion.div>
      </div>

      {/* AnimatePresence */}
      <div>
        <Button onClick={() => setOpen((o) => !o)}>Toggle</Button>
        <Button onClick={() => setStep((s) => (s === 2 ? 1 : s + 1))}>Next</Button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              This is an animated alert.
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-pink-50 rounded-md p-2"
          >
            Step {step}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Example() {
  const [items, setItems] = useState([1, 2, 3, 4]);

  function remove(id: number) {
    setItems(items.filter((i) => i !== id));
  }

  return (
    <div className="space-y-2">
      <Button onClick={() => setItems([1, 2, 3, 4])}>Reset</Button>
      <AnimatePresence mode="popLayout">
        {items.map((id) => (
          <motion.div
            key={id}
            layout
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex justify-between bg-gray-100 p-3 rounded"
          >
            Item {id}
            <button onClick={() => remove(id)}>Remove</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function LiveBadge() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        boxShadow: [
          '0 0 0px 0px rgba(0, 0, 0, 0.7)',
          '0 0 10px 10px rgba(0, 0, 0, 0.7)',
          '0 0 0px 0px rgba(0, 0, 0, 0.7)',
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 1,
      }}
      className="px-4 rounded-md "
    >
      Live
    </motion.div>
  );
}

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col items-center gap-8 divide-red-50 p-8">
      <Example />
      <LiveBadge />
      <MotionAnimation />
    </div>
  );
}
