'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { buttonVariants } from '@/components/ui/button';

const cache = new Map<string, string>();

const translations = {
  en: {
    copyMarkdown: 'Copy Markdown',
  },
  zh: {
    copyMarkdown: '复制 Markdown',
  },
  ja: {
    copyMarkdown: 'Markdownをコピー',
  },
};

export function LLMCopyButton({
  markdownUrl,
  lang,
}: {
  markdownUrl: string;
  lang: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const t = translations[lang as keyof typeof translations] || translations.en;

  const [checked, onClick] = useCopyButton(async () => {
    const cached = cache.get(markdownUrl);
    if (cached) return navigator.clipboard.writeText(cached);

    setLoading(true);

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': fetch(markdownUrl).then(async (res) => {
            const content = await res.text();
            cache.set(markdownUrl, content);
            return content;
          }),
        }),
      ]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      className={cn(
        buttonVariants({
          color: 'secondary',
          size: 'sm',
        }),
        '[&_svg]:text-fd-muted-foreground gap-2 [&_svg]:size-3.5'
      )}
      onClick={onClick}
    >
      {checked ? <Check /> : <Copy />}
      {t.copyMarkdown}
    </button>
  );
}
