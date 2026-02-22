const fs = require('fs');

function process() {
    let content = fs.readFileSync('src/app/playground/page.tsx', 'utf8');

    // Split at Footer so we don't mess up the footer's explicit colors
    const footerIndex = content.indexOf('function Footer()');
    if (footerIndex === -1) {
        console.error('Footer not found');
        return;
    }

    let beforeFooter = content.substring(0, footerIndex);
    const footerAndAfter = content.substring(footerIndex);

    const replacements = [
        { search: /bg-white/g, replace: 'bg-[var(--surface)]' },
        { search: /text-black\/60/g, replace: 'text-[var(--muted)]' },
        { search: /text-black\/50/g, replace: 'text-[var(--muted)]' },
        { search: /text-black\/40/g, replace: 'text-[var(--muted)] opacity-80' },
        { search: /text-black\/80/g, replace: 'text-[var(--text)] opacity-80' },
        { search: /text-black/g, replace: 'text-[var(--text)]' },
        { search: /border-black\/5/g, replace: 'border-[var(--border)]' },
        { search: /border-black\/10/g, replace: 'border-[var(--border)]' },
        { search: /border-black\/20/g, replace: 'border-[var(--border-hover)]' },
        { search: /border-black\/30/g, replace: 'border-[var(--border-hover)]' },
        { search: /border-black/g, replace: 'border-[var(--text)]' },
        { search: /bg-black\/5/g, replace: 'bg-[var(--border)]' },
        { search: /bg-black\/10/g, replace: 'bg-[var(--border)]' },
        { search: /bg-black text-white/g, replace: 'bg-[var(--text)] text-[var(--surface)]' },
        { search: /bg-black/g, replace: 'bg-[var(--text)]' },
        { search: /shadow-\[0_4px_0_0_rgba\(0,0,0,1\)\]/g, replace: 'shadow-[0_4px_0_0_var(--text)]' },
    ];

    replacements.forEach(({ search, replace }) => {
        beforeFooter = beforeFooter.replace(search, replace);
    });

    fs.writeFileSync('src/app/playground/page.tsx', beforeFooter + footerAndAfter);
    console.log('Successfully replaced all utility classes before the Footer component.');
}

process();
