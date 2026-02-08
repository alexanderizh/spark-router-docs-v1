interface FooterProps {
  lang: string;
}

const newApiGithubUrl = 'https://github.com/QuantumNous/new-api';

const translations: Record<string, string> = {
  zh: '详情请参见原项目',
  en: 'For details, please refer to the original project ',
  ja: '詳細は元プロジェクトの GitHub 上の ',
};

const linkSuffix: Record<string, string> = {
  zh: ' ',
  en: ' ',
  ja: ' ',
};

export function Footer({ lang }: FooterProps) {
  const t = translations[lang] || translations.en;
  const suffix = linkSuffix[lang] || linkSuffix.en;

  return (
    <footer className="border-fd-border bg-fd-card/30 mt-auto border-t backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-6 py-6">
        <p className="text-fd-muted-foreground text-center text-sm">
          {t}
          <a
            href={newApiGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fd-foreground hover:underline"
          >
            New-Api
          </a>
          {suffix}
        </p>
      </div>
    </footer>
  );
}
